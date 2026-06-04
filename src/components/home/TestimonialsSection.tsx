'use client';

import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold-400 text-sm font-semibold uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6">
              Loved by{' '}
              <span className="text-gradient">Thousands</span>
            </h2>
            <p className="text-neutral-400 text-lg">
              Real stories from real customers who transformed their health with Himtatwa.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.1}>
              <div className="card p-6 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <Quote size={20} className="text-neutral-700 mb-3" />
                <p className="text-neutral-300 text-sm leading-relaxed flex-1 mb-4">
                  {t.text}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
                    <span className="text-black text-xs font-bold">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-neutral-500 text-xs">{t.location} {t.verified && '• Verified Buyer'}</p>
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
