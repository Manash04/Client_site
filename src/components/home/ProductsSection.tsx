'use client';

import { ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/constants';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ProductsSection() {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAdd = (product: (typeof PRODUCTS)[0]) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      action: { label: 'View Cart', onClick: openCart },
    });
  };

  return (
    <section id="products" className="section-padding bg-neutral-950/50">
      <div className="container-tight">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold-400 text-sm font-semibold uppercase tracking-widest">Our Products</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6">
              Choose Your{' '}
              <span className="text-gradient">Wellness Path</span>
            </h2>
            <p className="text-neutral-400 text-lg">
              Premium liquid Shilajit in convenient dropper bottles. Zero additives, maximum purity.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRODUCTS.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 0.15}>
              <div className="card overflow-hidden group relative">
                {/* Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 text-xs font-semibold">
                    {product.tag}
                  </span>
                </div>

                {/* Product Image Area */}
                <div className="relative h-72 bg-neutral-900 overflow-hidden">
                  <Image
                    src="/images/product.jpg"
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-transparent to-transparent" />
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                      {product.size}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-gold-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-neutral-400 text-sm">{product.short_description}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-white text-2xl font-bold">{formatPrice(product.price)}</span>
                    <span className="text-neutral-500 line-through text-sm">{formatPrice(product.mrp)}</span>
                    <span className="text-green-400 text-sm font-medium">
                      {calculateDiscount(product.price, product.mrp)}% off
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className={j < Math.floor(product.rating) ? 'text-gold-400 fill-gold-400' : 'text-gold-400/30'}
                      />
                    ))}
                    <span className="text-neutral-400 text-sm ml-2">{product.rating} ({product.review_count} reviews)</span>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => handleAdd(product)} className="btn-primary flex-1 text-sm py-3">
                      <ShoppingBag size={16} /> Add to Cart
                    </button>
                    <Link
                      href={`/products/${product.slug}`}
                      className="btn-secondary text-sm py-3 px-4"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
