import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/interfaces/cart.interface'

interface NewCartState {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  getCartItemTotal: (cartItemId: string) => number
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  hasDispensaryItems: () => boolean
  removeDispensaryItems: () => void
}

export const useNewCartStore = create<NewCartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item: CartItem) => {
        const cart = get().cart
        const existingItemIndex = cart.findIndex((i) => i.cartItemId === item.cartItemId)

        if (existingItemIndex !== -1) {
          // Increment quantity if it already exists
          const updatedCart = [...cart]
          updatedCart[existingItemIndex].quantity += item.quantity
          set({ cart: updatedCart })
          return
        }

        // Add as a new line
        set({ cart: [...cart, item] })
      },

      removeFromCart: (cartItemId: string) => {
        set({ cart: get().cart.filter((item) => item.cartItemId !== cartItemId) })
      },

      updateQuantity: (cartItemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId)
          return
        }

        const updatedCart = get().cart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
        set({ cart: updatedCart })
      },

      getCartItemTotal: (cartItemId: string) => {
        const cartItem = get().cart.find((item) => item.cartItemId === cartItemId)
        if (!cartItem) return 0

        return cartItem.price * cartItem.quantity
      },

      clearCart: () => {
        set({ cart: [] })
      },

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      hasDispensaryItems: () => {
        return get().cart.some((item) => item.variantType !== null)
      },

      removeDispensaryItems: () => {
        set({ cart: get().cart.filter((item) => item.variantType === null) })
      }
    }),
    {
      name: 'cart-storage-v2' // Changed key to avoid collisions with old DispensaryProduct objects
    }
  )
)
