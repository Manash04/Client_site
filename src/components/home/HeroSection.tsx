'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Droplets } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold-600/3 blur-[100px]" />
      </div>

      <div className="container-tight w-full px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <AnimatedSection delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20">
                <Star size={14} className="text-gold-400 fill-gold-400" />
                <span className="text-gold-400 text-sm font-medium">Trusted by 10,000+ customers</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] tracking-tight">
                The Purest
                <br />
                <span className="text-gradient">Himalayan</span>
                <br />
                Shilajit
              </h1>
              <p className="text-gold-400/80 text-base sm:text-lg font-medium mt-3 tracking-wide">
                Super easy to use
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-lg sm:text-xl text-neutral-400 max-w-lg leading-relaxed">
                Sourced from 16,000+ feet. Lab-tested. Zero additives.
                Experience ancient Ayurvedic wellness in a modern liquid dropper.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/products" className="btn-primary text-base px-8 py-4">
                  Shop Now <ArrowRight size={18} />
                </Link>
                <Link href="#benefits" className="btn-secondary text-base px-8 py-4">
                  Learn More
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="flex items-center gap-6 pt-4">
                {[
                  { icon: Shield, label: 'FSSAI Certified' },
                  { icon: Droplets, label: 'Lab Tested' },
                  { icon: Star, label: '100% Pure' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <item.icon size={16} className="text-gold-500" />
                    <span className="text-neutral-400 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Product Visual */}
          <AnimatedSection delay={0.3} direction="left">
            <div className="relative flex items-center justify-center">
              {/* Glow ring */}
              <div className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-gold-500/10" />
              <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full border border-gold-500/5" />
              
              {/* Product image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-[260px] h-[340px] sm:w-[320px] sm:h-[420px]"
              >
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-gold-500/10 border border-neutral-700/30">
                  <Image
                    src="/images/product_img2.jpg"
                    alt="Himtatwa Liquid Shilajit"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 whitespace-nowrap">
                  <span className="text-gold-400 text-xs font-semibold">MOST POPULAR • 30ml</span>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -left-4 top-1/4 glass px-4 py-2 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white text-xs font-medium">100% Natural</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-4 bottom-1/3 glass px-4 py-2 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <Star size={12} className="text-gold-400 fill-gold-400" />
                  <span className="text-white text-xs font-medium">4.7/5 Rating</span>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-neutral-600 flex items-start justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
        </div>
      </motion.div>
    </section>
  );
}
