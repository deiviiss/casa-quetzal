"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CarouselImage {
  url: string
  alt?: string
  title?: string
  description?: string
  link?: string
  [key: string]: unknown
}

export interface CarouselProps {
  items: CarouselImage[]
  options?: EmblaOptionsType
  autoplayDelay?: number // in ms, default 3000
  showProgress?: boolean // default true
  showControls?: boolean // default true
  aspectRatio?: string // tailwind class, default "aspect-video"
  className?: string
  onItemClick?: (item: CarouselImage, index: number) => void
}

// Hook to control autoplay programmatically
export const useAutoplay = (emblaApi: EmblaCarouselType | undefined) => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false)

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins().autoplay
    if (!autoplay) return

    if (autoplay.isPlaying()) {
      autoplay.stop()
    } else {
      autoplay.play()
    }
  }, [emblaApi])

  const onAutoplayButtonClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins().autoplay
      if (!autoplay) return

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop

      resetOrStop()
      callback()
    },
    [emblaApi]
  )

  const updateAutoplayState = useCallback((api: EmblaCarouselType) => {
    const autoplay = api.plugins().autoplay
    if (!autoplay) return
    setAutoplayIsPlaying(autoplay.isPlaying())
  }, [])

  useEffect(() => {
    const autoplay = emblaApi?.plugins().autoplay
    if (!autoplay) return

    updateAutoplayState(emblaApi)

    emblaApi
      .on("autoplay:play", () => setAutoplayIsPlaying(true))
      .on("autoplay:stop", () => setAutoplayIsPlaying(false))
      .on("reInit", () => updateAutoplayState(emblaApi))
  }, [emblaApi, updateAutoplayState])

  return {
    autoplayIsPlaying,
    toggleAutoplay,
    onAutoplayButtonClick,
  }
}

// Hook to control autoplay progress bar with inline CSS transition
export const useAutoplayProgress = <ProgressElement extends HTMLElement | null>(
  emblaApi: EmblaCarouselType | undefined,
  progressNode: React.RefObject<ProgressElement | null>
) => {
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false)
  const timeoutId = useRef<number | null>(null)
  const rafId = useRef<number | null>(null)

  const startProgress = useCallback(
    (timeUntilNext: number | null) => {
      const node = progressNode.current

      if (!node) return
      if (timeUntilNext === null) return

      // Reset transition and scale to 0% instantly
      node.style.transition = "none"
      node.style.transform = "scaleX(0)"
      node.style.transformOrigin = "left"

      // Trigger transition on next browser animation frame
      rafId.current = window.requestAnimationFrame(() => {
        if (timeoutId.current) window.clearTimeout(timeoutId.current)
        timeoutId.current = window.setTimeout(() => {
          node.style.transition = `transform ${timeUntilNext}ms linear`
          node.style.transform = "scaleX(1)"
        }, 0)
      })

      setShowAutoplayProgress(true)
    },
    [progressNode]
  )

  useEffect(() => {
    const autoplay = emblaApi?.plugins().autoplay
    if (!autoplay) return

    const handleTimeSet = () => startProgress(autoplay.timeUntilNext())
    const handleTimerStopped = () => {
      setShowAutoplayProgress(false)
      const node = progressNode.current
      if (node) {
        node.style.transition = "none"
        node.style.transform = "scaleX(0)"
      }
    }

    emblaApi
      .on("autoplay:timerset", handleTimeSet)
      .on("autoplay:timerstopped", handleTimerStopped)

    // Sync initial state if already playing
    if (autoplay.isPlaying()) {
      handleTimeSet()
    }

    return () => {
      emblaApi
        .off("autoplay:timerset", handleTimeSet)
        .off("autoplay:timerstopped", handleTimerStopped)
    }
  }, [emblaApi, startProgress, progressNode])

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      if (timeoutId.current) clearTimeout(timeoutId.current)
    }
  }, [])

  return {
    showAutoplayProgress,
  }
}

// Hook to control Prev and Next navigation buttons
export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    if (typeof emblaApi.scrollPrev === "function") {
      emblaApi.scrollPrev()
    }
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    if (typeof emblaApi.scrollNext === "function") {
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setPrevBtnDisabled(!api.canScrollPrev())
    setNextBtnDisabled(!api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on("reInit", onSelect).on("select", onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

export const Carousel = ({
  items,
  options,
  autoplayDelay = 3000,
  showProgress = true,
  showControls = true,
  aspectRatio = "aspect-video",
  className,
  onItemClick,
}: CarouselProps) => {
  const progressNode = useRef<HTMLDivElement>(null)

  // Configure Embla with the autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      ...options,
    },
    [
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi)

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode)

  if (!items || items.length === 0) return null

  return (
    <div className={cn("w-full flex flex-col group/carousel", className)}>
      {/* Viewport wrapper */}
      <div className="overflow-hidden rounded-2xl shadow-xl w-full" ref={emblaRef}>
        {/* Slides container */}
        <div className="flex">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative select-none cursor-pointer"
              onClick={() => onItemClick?.(item, index)}
            >
              {/* Media layout */}
              <div className={cn("relative w-full", aspectRatio)}>
                <Image
                  src={item.url}
                  alt={item.alt || `Slide ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover/carousel:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority={index === 0}
                />
                {/* Title & Description Overlay */}
                {(item.title || item.description) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
                    {item.title && (
                      <h3 className="text-xl md:text-3xl font-bold mb-2 tracking-tight">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-sm md:text-base text-slate-200 max-w-2xl leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control bar */}
      {showControls && (
        <div className="flex items-center justify-between gap-4 mt-4 select-none">
          {/* Play/Pause Button */}
          <button
            onClick={toggleAutoplay}
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors duration-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full shadow-sm"
          >
            {autoplayIsPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Reproducir</span>
              </>
            )}
          </button>

          {/* Progress Bar */}
          {showProgress && (
            <div
              className={cn(
                "flex-grow h-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden transition-all duration-300",
                showAutoplayProgress ? "opacity-100" : "opacity-0"
              )}
            >
              <div
                ref={progressNode}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 origin-left scale-x-0"
              />
            </div>
          )}

          {/* Prev/Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
              disabled={prevBtnDisabled}
              type="button"
              className="flex items-center justify-center w-9 h-9 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onAutoplayButtonClick(onNextButtonClick)}
              disabled={nextBtnDisabled}
              type="button"
              className="flex items-center justify-center w-9 h-9 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full shadow-sm"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
