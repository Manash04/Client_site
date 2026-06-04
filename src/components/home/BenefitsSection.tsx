'use client';

import { Zap, Brain, TrendingUp, Clock, Shield, Heart } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { BENEFITS_DATA } from '@/lib/constants';

const iconMap: Record<string, any> = { Zap, Brain, TrendingUp, Clock, Shield, Heart };

export default function BenefitsSection() {
  return (
    <section id="benefits" className="section-padding relative">
      <div className="container-tight">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold-400 text-sm font-semibold uppercase tracking-widest">Why Shilajit?</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6">
              Ancient Wisdom,{' '}
              <span className="text-gradient">Modern Science</span>
            </h2>
            <p className="text-neutral-400 text-lg">
              Backed by centuries of Ayurvedic tradition and modern clinical research,
              Shilajit is nature&apos;s most powerful adaptogen.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS_DATA.map((benefit, i) => {
            const Icon = iconMap[benefit.icon];
            return (
              <AnimatedSection key={benefit.title} delay={i * 0.1}>
                <div className="card p-8 h-full group cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-5 group-hover:bg-gold-500/20 transition-colors">
                    <Icon size={22} className="text-gold-400" />
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
