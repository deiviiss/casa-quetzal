'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaShopLock } from 'react-icons/fa6'
import { GiBurningForest } from 'react-icons/gi'
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import { ShoppingBag } from 'lucide-react'
import { getUserSessionServer } from '@/actions/auth/getUserSessionServer'
import { useNewCartStore } from '@/store/new-cart-store'
import { useUiStore } from '@/store'

interface TopMenuProps {
  user: Awaited<ReturnType<typeof getUserSessionServer>> | null
}

export const TopMenu = ({ user }: TopMenuProps) => {
  const logo = '/logo.webp'
  const pathName = usePathname()

  const [bgColor, setBgColor] = useState('bg-none')
  const fixedScrollThreshold = 0.5 // 1% scroll threshold

  const isProductDetail = /^\/products\/\d+$/.test(pathName) // check if the current path is a product detail page

  const handleScroll = () => {
    // calculate the vertical scroll percentage
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    setBgColor(scrolled > fixedScrollThreshold ? 'bg-slate-800/95' : 'bg-none') // change the background color if the percentage is greater than the fixed value
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll) // add the event listener for the scroll

    return () => {
      window.removeEventListener('scroll', handleScroll) // delete the event listener when the component is unmounted
    }
  }, [])

  const { getTotalItems } = useNewCartStore()
  const { openSideCart } = useUiStore()
  const totalItems = getTotalItems()

  return (
    <div className={`w-full fixed top-0 z-40 text-white ${isProductDetail ? 'bg-slate-800' : bgColor} transition-colors duration-300 py-1`}>
      <header className="container mx-auto lg:px-20 px-4 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href={'/'} aria-label="Ir a la página principal - Casa Quetzal">
            <Image src={logo} alt="Logo Casa Quetzal" width={56} height={70} sizes="56px" className='w-14 h-auto' priority />
          </Link>
        </div>
        <nav>
          <ul className="space-x-4 flex items-center">
            <li>
              <Link href="/products" aria-label="Catálogo" className="hover:text-slate-200 transition-transform flex items-center space-x-2">
                <SiHomeassistantcommunitystore size={20} title="Catálogo" aria-label="Catálogo" />
                <span className='hidden sm:inline'>
                  Catálogo
                </span>
              </Link>
            </li>
            <li>
              <Link href="/memberships" aria-label="Membresías" className="hover:text-slate-200 transition-transform flex items-center space-x-2">
                <GiBurningForest size={20} title="Membresías" aria-label="Membresías" />
                <span className='hidden sm:inline'>
                  Membresías
                </span>
              </Link>
            </li>
            <li>
              <Link href={user ? "/platform/dispensary" : "/lobby"} aria-label="Dispensario" className="hover:text-slate-200 transition-transform flex items-center space-x-2">
                <FaShopLock size={20} title="Dispensario" aria-label="Dispensario" />
                <span className='hidden sm:inline'>
                  Dispensario
                </span>
              </Link>
            </li>
            <li>
              <button
                onClick={openSideCart}
                aria-label="Abrir carrito"
                className="relative hover:text-slate-200 transition-colors flex items-center"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-xs font-bold text-white flex items-center justify-center leading-none">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
