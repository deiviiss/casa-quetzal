import { create } from 'zustand'

interface UIState {
  isSideCartOpen: boolean
  openSideCart: () => void
  closeSideCart: () => void
  toggleSideCart: () => void
}

export const useUiStore = create<UIState>((set) => ({
  isSideCartOpen: false,

  openSideCart: () => {
    set({ isSideCartOpen: true })
  },

  closeSideCart: () => {
    set({ isSideCartOpen: false })
  },

  toggleSideCart: () => {
    set((state) => ({
      isSideCartOpen: !state.isSideCartOpen
    }))
  }
}))
