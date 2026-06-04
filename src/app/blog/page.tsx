import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Learn about Shilajit benefits, Ayurveda, and wellness tips from Himtatwa.',
};

const BLOG_POSTS = [
  {
    slug: 'what-is-shilajit',
    title: 'What is Shilajit? The Complete Guide',
    excerpt: 'Discover the ancient Ayurvedic superfood that\'s been used for thousands of years. Learn about its origins, benefits, and how to choose the right one.',
    date: '2025-12-15',
    readTime: '8 min read',
    category: 'Education',
  },
  {
    slug: 'shilajit-benefits-men',
    title: '7 Science-Backed Benefits of Shilajit for Men',
    excerpt: 'From testosterone support to enhanced energy, explore the clinically-studied benefits that make Shilajit a must-have for men\'s health.',
    date: '2025-12-10',
    readTime: '6 min read',
    category: 'Health',
  },
  {
    slug: 'liquid-vs-resin-shilajit',
    title: 'Liquid vs Resin Shilajit: Which is Better?',
    excerpt: 'A detailed comparison of liquid dropper and resin forms of Shilajit. Learn which form offers better bioavailability and convenience.',
    date: '2025-12-05',
    readTime: '5 min read',
    category: 'Guide',
  },
  {
    slug: 'how-to-identify-pure-shilajit',
    title: 'How to Identify Pure Shilajit: 5 Tests You Can Do at Home',
    excerpt: 'Don\'t get fooled by fake products. Learn simple at-home tests to verify the authenticity and purity of your Shilajit.',
    date: '2025-11-28',
    readTime: '7 min read',
    category: 'Guide',
  },
];

export default function BlogPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold-400 text-sm font-semibold uppercase tracking-widest">Blog</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mt-4 mb-6">
              Wellness <span className="text-gradient">Insights</span>
            </h1>
            <p className="text-neutral-400 text-lg">
              Expert articles on Shilajit, Ayurveda, and natural health.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {BLOG_POSTS.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="card p-6 group block h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-gold-500/10 text-gold-400 text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-neutral-500 text-xs flex items-center gap-1">
                    <Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-white font-semibold text-lg mb-2 group-hover:text-gold-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-gold-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
