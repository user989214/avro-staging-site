"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Formula } from "./data"

export interface CartItem {
  formula: Formula
  quantity: number
  variant: "single" | "bundle"
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (formula: Formula, variant?: "single" | "bundle") => void
  removeItem: (formulaId: string) => void
  updateQuantity: (formulaId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((formula: Formula, variant: "single" | "bundle" = "single") => {
    setItems((prev) => {
      const existing = prev.find((item) => item.formula.id === formula.id && item.variant === variant)
      if (existing) {
        return prev.map((item) =>
          item.formula.id === formula.id && item.variant === variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { formula, quantity: 1, variant }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((formulaId: string) => {
    setItems((prev) => prev.filter((item) => item.formula.id !== formulaId))
  }, [])

  const updateQuantity = useCallback((formulaId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.formula.id !== formulaId))
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.formula.id === formulaId ? { ...item, quantity } : item
        )
      )
    }
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const total = items.reduce((sum, item) => {
    const price = item.variant === "bundle" ? item.formula.bundlePrice : item.formula.price
    return sum + price * item.quantity
  }, 0)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
