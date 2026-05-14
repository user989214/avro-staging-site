"use client"

import { useCart } from "@/lib/cart-context"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCart()

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[9999] shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-olive" />
              <h2 className="font-display text-xl font-bold text-olive-dark">
                Your Cart ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 text-olive-dark" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-olive-dark font-medium mb-2">Your cart is empty</p>
                <p className="text-gray-500 text-sm mb-6">
                  Add some formulas to get started
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="btn-primary"
                >
                  Browse Formulas
                </Link>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li
                    key={`${item.formula.id}-${item.variant}`}
                    className="flex gap-4 pb-6 border-b border-gray-100 last:border-0"
                  >
                    <div
                      className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: item.formula.color }}
                    >
                      <Image
                        src="/brand/avro-logo.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="opacity-20"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-olive-dark truncate">
                        {item.formula.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.variant === "bundle" ? "3-Pack Bundle" : "Single Pack"}
                      </p>
                      <p className="text-olive font-bold mt-1">
                        ${item.variant === "bundle" ? item.formula.bundlePrice : item.formula.price}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQuantity(item.formula.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.formula.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.formula.id)}
                          className="ml-auto text-sm text-gray-400 hover:text-red-500 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-olive-dark font-medium">Subtotal</span>
                <span className="text-xl font-display font-bold text-olive-dark">
                  ${total.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Shipping and taxes calculated at checkout
              </p>
              <button className="btn-primary w-full">
                Checkout
              </button>
              <button
                onClick={closeCart}
                className="w-full mt-3 text-center text-sm text-olive hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
