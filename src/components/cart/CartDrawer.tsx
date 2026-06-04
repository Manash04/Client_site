'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, total, itemCount } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-neutral-950 border-l border-neutral-800 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-gold-400" />
                <h2 className="text-lg font-semibold text-white">
                  Your Cart ({itemCount()})
                </h2>
              </div>
              <button onClick={closeCart} className="p-2 rounded-lg hover:bg-white/5 transition-all">
                <X size={20} className="text-neutral-400" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-neutral-600" />
                  </div>
                  <p className="text-neutral-400 font-medium mb-2">Your cart is empty</p>
                  <p className="text-neutral-500 text-sm mb-6">Add some products to get started</p>
                  <button onClick={closeCart} className="btn-primary text-sm">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800"
                    >
                      <div className="w-20 h-20 rounded-lg bg-neutral-800 flex-shrink-0 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-gold-900/30 to-gold-700/10 flex items-center justify-center">
                          <span className="text-gold-400 text-xs font-medium">{item.product.size}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-sm font-medium truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-gold-400 font-semibold text-sm mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-md bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors"
                            >
                              <Minus size={14} className="text-neutral-300" />
                            </button>
                            <span className="text-white text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-md bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors"
                            >
                              <Plus size={14} className="text-neutral-300" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1.5 rounded-md hover:bg-red-500/10 transition-colors group"
                          >
                            <Trash2 size={14} className="text-neutral-500 group-hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="text-white font-semibold text-lg">{formatPrice(total())}</span>
                </div>
                <p className="text-neutral-500 text-xs">Shipping calculated at checkout</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full text-center"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
