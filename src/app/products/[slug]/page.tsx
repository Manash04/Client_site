'use client';

import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/constants';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { toast } from 'sonner';
import { ShoppingBag, Star, Shield, Check, Minus, Plus, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  if (!product) return notFound();

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    toast.success(`${quantity}x ${product.name} added to cart!`, {
      action: { label: 'View Cart', onClick: openCart },
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link href="/products" className="inline-flex items-center gap-2 text-neutral-400 hover:text-gold-400 text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <AnimatedSection direction="left">
            <div className="aspect-square rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 relative">
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 text-xs font-semibold">
                  {product.tag}
                </span>
              </div>
              <Image
                src="/images/product.jpg"
                alt={product.name}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </AnimatedSection>

          {/* Product Info */}
          <AnimatedSection direction="right">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
                  {product.name}
                </h1>
                <p className="text-neutral-400 leading-relaxed">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'text-gold-400 fill-gold-400' : 'text-gold-400/30'}
                    />
                  ))}
                </div>
                <span className="text-neutral-400 text-sm">{product.rating} ({product.review_count} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
                <span className="text-neutral-500 line-through text-lg">{formatPrice(product.mrp)}</span>
                <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-sm font-medium">
                  {calculateDiscount(product.price, product.mrp)}% off
                </span>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Key Benefits</h3>
                {product.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <Check size={16} className="text-gold-400 flex-shrink-0" />
                    <span className="text-neutral-300 text-sm">{b}</span>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((c) => (
                  <span key={c} className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium flex items-center gap-1.5">
                    <Shield size={12} className="text-gold-500" /> {c}
                  </span>
                ))}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:bg-white/5 rounded">
                    <Minus size={16} className="text-neutral-300" />
                  </button>
                  <span className="text-white font-medium w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:bg-white/5 rounded">
                    <Plus size={16} className="text-neutral-300" />
                  </button>
                </div>
                <button onClick={handleAdd} className="btn-primary flex-1 py-4">
                  <ShoppingBag size={18} /> Add to Cart — {formatPrice(product.price * quantity)}
                </button>
              </div>

              {/* Usage */}
              <div className="p-5 rounded-2xl bg-gold-500/5 border border-gold-500/10">
                <h4 className="text-gold-400 font-semibold text-sm mb-2">How to Use</h4>
                <p className="text-neutral-400 text-sm">{product.usage}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
