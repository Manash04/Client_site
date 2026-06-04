'use client';

import { ArrowRight, Truck, RotateCcw, HeadphonesIcon } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold-900/10 via-transparent to-gold-800/5" />
      <div className="container-tight relative z-10">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On all orders above ₹999' },
            { icon: RotateCcw, title: '30-Day Returns', desc: 'Satisfaction guaranteed' },
            { icon: HeadphonesIcon, title: '24/7 Support', desc: 'WhatsApp & Email' },
          ].map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-11 h-11 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-neutral-500 text-xs">{item.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              Start Your{' '}
              <span className="text-gradient">Wellness Journey</span>
              {' '}Today
            </h2>
            <p className="text-neutral-400 text-lg mb-8">
              Join thousands who have transformed their health with the purest Himalayan Shilajit.
            </p>
            <Link href="/products" className="btn-primary text-base px-10 py-4">
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
