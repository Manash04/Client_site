import { Metadata } from 'next';
import { Mountain, Award, Users, Leaf } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Himtatwa — our mission to bring the purest Himalayan Shilajit to the world.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-400 text-sm font-semibold uppercase tracking-widest">Our Story</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mt-4 mb-6">
              Born in the <span className="text-gradient">Himalayas</span>
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Himtatwa was founded with a singular vision: to bring the purest, most potent Himalayan Shilajit directly from the mountains to your doorstep. Our name, derived from Sanskrit, means &quot;Himalayan Essence&quot; — and that&apos;s exactly what we deliver.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Mountain, value: '16,000+', label: 'Feet Altitude Sourcing' },
            { icon: Award, value: '100%', label: 'Lab Tested Purity' },
            { icon: Users, value: '10,000+', label: 'Happy Customers' },
            { icon: Leaf, value: 'Zero', label: 'Additives or Fillers' },
          ].map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="card p-6 text-center">
                <stat.icon size={24} className="text-gold-400 mx-auto mb-3" />
                <p className="text-white text-2xl font-bold">{stat.value}</p>
                <p className="text-neutral-400 text-sm mt-1">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-6 text-neutral-400 leading-relaxed">
            <h2 className="text-2xl font-display font-bold text-white">Our Process</h2>
            <p>
              Every batch of Himtatwa Shilajit undergoes a rigorous multi-stage purification process. We source raw Shilajit from carefully selected rock formations in the high-altitude regions of the Indian Himalayas, where centuries of plant decomposition and geological pressure create the most mineral-rich deposits.
            </p>
            <p>
              Our liquid extraction process preserves the full spectrum of 85+ minerals and fulvic acid while ensuring the removal of any impurities. Each batch is third-party lab tested for heavy metals, microbial contamination, and fulvic acid content before it reaches you.
            </p>
            <h2 className="text-2xl font-display font-bold text-white pt-4">Our Promise</h2>
            <p>
              We believe in complete transparency. Every product we sell is FSSAI certified, GMP manufactured, and comes with a lab test certificate. No fillers, no binders, no artificial anything — just pure Himalayan Shilajit in its most bioavailable liquid form.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
