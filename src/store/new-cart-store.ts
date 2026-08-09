import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/interfaces/cart.interface'
import { isMembershipCartItem, isDispensaryCartItem } from '@/lib/cart-adapters'
import { noticeFailure } from '@/components/toast-notifications/ToastNotifications'

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
  hasMembershipItem: () => boolean
  hasMixedCart: () => boolean
  removeDispensaryItems: () => void
  keepMembershipOnly: () => void
  keepDispensaryOnly: () => void
}

export const useNewCartStore = create<NewCartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item: CartItem) => {
        const cart = get().cart

        // Mutual exclusion rule: Membership and Dispensary items cannot coexist
        if (isMembershipCartItem(item) && cart.some(isDispensaryCartItem)) {
          noticeFailure("La membresía y productos del dispensario no pueden estar en el mismo carrito.")
          return
        }

        if (isDispensaryCartItem(item) && cart.some(isMembershipCartItem)) {
          noticeFailure("No puedes agregar productos del dispensario si tienes una membresía en el carrito.")
          return
        }

        const existingItemIndex = cart.findIndex((i) => i.cartItemId === item.cartItemId)

        if (existingItemIndex !== -1) {
          // If it's a membership, do not increment quantity
          if (cart[existingItemIndex].type === 'membership') {
            return
          }
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
        const existingItem = get().cart.find((item) => item.cartItemId === cartItemId)
        if (existingItem?.type === 'membership') {
          return
        }
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
        return get().cart.some(isDispensaryCartItem)
      },

      hasMembershipItem: () => {
        return get().cart.some(isMembershipCartItem)
      },

      hasMixedCart: () => {
        const cart = get().cart
        return cart.some(isMembershipCartItem) && cart.some(isDispensaryCartItem)
      },

      removeDispensaryItems: () => {
        set({ cart: get().cart.filter((item) => !isDispensaryCartItem(item)) })
      },

      keepMembershipOnly: () => {
        set({ cart: get().cart.filter((item) => !isDispensaryCartItem(item)) })
      },

      keepDispensaryOnly: () => {
        set({ cart: get().cart.filter((item) => !isMembershipCartItem(item)) })
      }
    }),
    {
      name: 'cart-storage-v2' // Changed key to avoid collisions with old DispensaryProduct objects
    }
  )
)

