'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2, Star } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { PRODUCTS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

const BLOG_CONTENT: Record<string, {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}> = {
  'what-is-shilajit': {
    title: 'What is Shilajit? The Complete Guide',
    excerpt: 'Discover the ancient Ayurvedic superfood that\'s been used for thousands of years.',
    date: '2025-12-15',
    readTime: '8 min read',
    category: 'Education',
    content: `
## What is Shilajit?

Shilajit (pronounced *shee-lah-jeet*) is a sticky, tar-like substance found primarily in the rocks of the Himalayas, Altai, Caucasus, and other mountain ranges. It develops over centuries from the slow decomposition of plants and organic matter under intense geological pressure.

The word "Shilajit" is derived from Sanskrit, meaning **"conqueror of mountains and destroyer of weakness"** — a fitting name for one of Ayurveda's most revered substances.

## How is Shilajit Formed?

Over millions of years, microorganisms break down plant matter trapped between rock layers. The resulting resinous exudate — rich in minerals, fulvic acid, and bioactive compounds — seeps out of rock crevices, particularly during the warm summer months.

High-altitude regions like the Indian Himalayas (above 16,000 feet) produce the most potent Shilajit, as the extreme conditions concentrate its beneficial compounds.

## The Science Behind Shilajit

Modern science has identified over **85 minerals** in ionic form within Shilajit, along with:

- **Fulvic Acid** — The primary active compound, responsible for transporting minerals deep into cells
- **Humic Acid** — Supports detoxification and gut health
- **Dibenzo-alpha-pyrones (DBPs)** — Powerful antioxidants that support mitochondrial function
- **Iron** — Supports oxygen transport and energy production

## What Does Shilajit Do?

Centuries of Ayurvedic use, backed by modern research, demonstrate Shilajit's ability to:

1. **Boost cellular energy** — Fulvic acid enhances mitochondrial function, the powerhouse of your cells
2. **Enhance cognitive function** — Studies show it may slow cognitive decline and improve memory
3. **Support hormonal health** — Clinical trials show it can significantly raise testosterone levels in men
4. **Fight fatigue** — Traditional use for combating physical and mental exhaustion
5. **Slow aging** — Rich in antioxidants that neutralise free radicals

## Different Forms of Shilajit

Shilajit is available in three main forms:

| Form | Bioavailability | Convenience | Purity |
|------|----------------|-------------|--------|
| Liquid (drops) | Highest | Easiest | Easiest to verify |
| Resin | High | Moderate | Moderate |
| Capsules/Powder | Lower | Easiest | Hardest to verify |

**Liquid Shilajit**, like Himtatwa's dropper formula, offers the highest bioavailability because it's already dissolved in an optimal solvent, ready for immediate absorption.

## How to Choose Authentic Shilajit

With a flooded market, here's what to look for:

- ✅ **Third-party lab tested** — Look for certificates of analysis (COA)
- ✅ **FSSAI certified** (in India) — Ensures food safety compliance
- ✅ **No fillers or additives** — Pure Shilajit needs nothing added
- ✅ **Altitude sourcing disclosed** — Higher altitude = more potent
- ✅ **Fulvic acid content** — Should be 60–80%+

Himtatwa ticks every box. Every batch is sourced from above 16,000 feet in the Indian Himalayas, lab-tested for purity and heavy metals, and FSSAI certified.

## Bottom Line

Shilajit is not a trend — it's a time-tested substance with thousands of years of traditional use and a growing body of scientific evidence. Whether you're looking to boost energy, enhance cognitive function, or support hormonal health, Shilajit deserves serious consideration.

*Start with Himtatwa's 15ml Starter Pack if you're new to Shilajit, or go straight to the 30ml bottle for a 2–3 month supply.*
    `,
  },
  'shilajit-benefits-men': {
    title: '7 Science-Backed Benefits of Shilajit for Men',
    excerpt: 'From testosterone support to enhanced energy, explore the clinically-studied benefits of Shilajit for men\'s health.',
    date: '2025-12-10',
    readTime: '6 min read',
    category: 'Health',
    content: `
## Why Shilajit is a Game-Changer for Men

Men around the world are rediscovering what Ayurvedic practitioners have known for centuries: Shilajit is one of the most powerful natural substances for men's health. But what does modern science say?

Here are **7 clinically studied benefits** of Shilajit for men.

## 1. Naturally Boosts Testosterone

Perhaps the most sought-after benefit. A landmark **2015 clinical study** published in *Andrologia* found that men taking purified Shilajit for 90 days experienced a **significant increase in total testosterone**, free testosterone, and DHEA-S levels.

This makes Shilajit a safe, natural alternative to hormone therapy for men experiencing age-related testosterone decline.

## 2. Increases Sperm Count and Quality

The same 2015 study also found improvements in **total sperm count (61.4% increase)** and sperm motility. For men concerned about fertility, Shilajit may offer meaningful support.

## 3. Fights Chronic Fatigue

Shilajit's fulvic acid directly supports **mitochondrial function** — the cellular machinery that produces energy (ATP). A 2012 study found it significantly reduced symptoms of Chronic Fatigue Syndrome (CFS), helping restore natural energy without stimulants.

## 4. Enhances Athletic Performance

Research shows Shilajit helps the body:
- Deliver more oxygen to muscles
- Speed up recovery after intense exercise
- Reduce exercise-induced muscle damage
- Preserve muscle mass during intense training

## 5. Sharpens Brain Function

Fulvic acid in Shilajit may **prevent the aggregation of tau protein** — abnormal deposits linked to Alzheimer's disease. A 2012 study found Shilajit acts as a potent antioxidant that protects against cellular damage in the brain.

Regular users commonly report improved focus, better memory recall, and mental clarity.

## 6. Supports Heart Health

Studies indicate Shilajit may:
- Lower LDL (bad) cholesterol
- Raise HDL (good) cholesterol  
- Reduce lipid peroxidation (a marker of heart disease risk)
- Support healthy blood pressure

## 7. Anti-Aging Properties

With **85+ minerals and antioxidants**, Shilajit fights the cellular processes that cause aging:
- Neutralises free radicals
- Supports telomere length (a marker of cellular aging)
- Promotes skin health and elasticity
- Boosts collagen production indirectly through mineral support

## How Much Shilajit Should Men Take?

For optimal results:
- **Dose:** 3–5 drops of liquid Shilajit (Himtatwa) daily
- **Timing:** Morning, on an empty stomach
- **Duration:** Minimum 8–12 weeks for full hormonal benefits
- **Consistency:** Daily use is key — Shilajit works cumulatively

## Getting Started

Himtatwa's pure liquid Shilajit is the easiest way to experience these benefits. No measuring, no mess — just drop it into warm water or milk and drink.

*Choose the 30ml bottle for a full 2–3 month cycle, or start with the 15ml Starter Pack to experience the difference first.*
    `,
  },
  'liquid-vs-resin-shilajit': {
    title: 'Liquid vs Resin Shilajit: Which is Better?',
    excerpt: 'A detailed comparison of liquid dropper and resin forms of Shilajit. Learn which form offers better bioavailability and convenience.',
    date: '2025-12-05',
    readTime: '5 min read',
    category: 'Guide',
    content: `
## The Great Shilajit Debate: Liquid vs Resin

If you've been researching Shilajit, you've probably encountered two main forms: **liquid/drops** and **resin**. Both contain the same active compounds, but there are important differences in bioavailability, convenience, and value.

Let's break it down.

## What is Shilajit Resin?

Resin is the most "traditional" form of Shilajit — a thick, sticky, tar-like substance that comes in a small jar or container. You scoop out a pea-sized amount (approximately 300–500mg), dissolve it in warm water or milk, and drink it.

**Pros of Resin:**
- Traditional form, closest to raw Shilajit
- High potency (if genuine)
- Fewer processing steps

**Cons of Resin:**
- Difficult to measure precisely
- Messy and inconvenient
- Slower dissolution
- Adulteration is very common and hard to detect
- Requires careful storage (temperature sensitive)

## What is Liquid Shilajit?

Liquid Shilajit is purified Shilajit extract that has been dissolved into an optimal liquid medium (typically water or a food-grade solvent). It comes in a dropper bottle, making dosing precise and effortless.

**Pros of Liquid:**
- ✅ **Highest bioavailability** — Already in dissolved, ionic form for immediate absorption
- ✅ **Precise dosing** — Exact drops every time
- ✅ **Convenient** — No mess, no prep, takes 10 seconds
- ✅ **Easier to verify purity** — Clear liquid shows quality
- ✅ **Better shelf life** — Properly formulated liquid is stable
- ✅ **Faster onset** — Dissolves instantly in the body

**Cons of Liquid:**
- Slightly more processing than raw resin
- May feel less "traditional"

## Bioavailability: The Critical Factor

**Bioavailability** measures how much of a substance your body actually absorbs and uses. This is where liquid Shilajit wins decisively.

When Shilajit is already dissolved and in ionic form, your body can absorb it **immediately** without the energy cost of dissolution. Resin, while effective, requires your digestive system to break it down first — losing some potency in the process.

Studies on fulvic acid (Shilajit's primary active compound) show that **ionic, liquid forms** offer significantly better cellular uptake than solid forms.

## Purity & Adulteration

This is crucial. The resin market is flooded with fake products — many contain fulvic acid powder mixed with brown gum or wax, not genuine Shilajit. With resin, it's nearly impossible to visually verify authenticity without a lab.

With liquid Shilajit like Himtatwa, you can verify:
- Lab test certificates (COA) — we provide these with every batch
- Taste: Authentic Shilajit has a distinctly bitter, mineral taste
- FSSAI certification confirms manufacturing standards

## Value for Money

| Factor | Liquid Drops | Resin |
|--------|-------------|-------|
| Precise dosing | ✅ Yes | ❌ No |
| Bioavailability | ✅ Highest | ✅ High |
| Convenience | ✅ Excellent | ❌ Poor |
| Adulteration risk | ✅ Low | ❌ High |
| Verified purity | ✅ Easy | ❌ Difficult |

## Our Verdict

For most people, **liquid Shilajit drops are the better choice** — superior bioavailability, precise dosing, verifiable purity, and maximum convenience without sacrificing potency.

Himtatwa's liquid Shilajit is formulated specifically for maximum absorption, lab-tested for purity, and FSSAI certified. It's the smart, modern way to experience Shilajit's full benefits.
    `,
  },
  'how-to-identify-pure-shilajit': {
    title: 'How to Identify Pure Shilajit: 5 Tests You Can Do at Home',
    excerpt: 'Don\'t get fooled by fake products. Learn simple at-home tests to verify the authenticity and purity of your Shilajit.',
    date: '2025-11-28',
    readTime: '7 min read',
    category: 'Guide',
    content: `
## The Shilajit Authenticity Problem

With Shilajit's rising popularity, the market has been flooded with counterfeit products. Industry estimates suggest that **60–70% of Shilajit sold online is adulterated** — containing everything from brown gum and molasses to fulvic acid powder mixed with glycerin.

Buying fake Shilajit means wasting money and potentially consuming harmful additives. Here are 5 tests to help you verify authenticity.

## Test 1: The Solubility Test ⭐ Most Important

**How to do it:**
1. Take a small amount of Shilajit (resin or liquid)
2. Drop it into a glass of cold water
3. Stir gently and observe

**What genuine Shilajit does:**
- Dissolves completely and evenly
- Colours the water golden-brown to deep amber
- No residue or clumps settle at the bottom
- The liquid remains clear (no cloudiness or white particles)

**What fake Shilajit does:**
- Doesn't fully dissolve — leaves clumps or residue
- Colours water inconsistently
- May create a film on the surface

For **liquid Shilajit** like Himtatwa, this test is simpler — it should dissolve instantly and evenly when dropped in water.

## Test 2: The Alcohol Test

**How to do it:**
1. Place a small amount of Shilajit in pure alcohol (ethanol)
2. Observe for 5–10 minutes

**What genuine Shilajit does:**
- Does NOT dissolve in alcohol (fulvic acid is water-soluble, not alcohol-soluble)
- Forms into a solid mass when squeezed

**What fake Shilajit does:**
- Dissolves readily in alcohol (indicates it may contain gum arabic or other additives)

## Test 3: The Flame Test

**How to do it:**
1. Take a tiny amount of Shilajit resin
2. Heat gently with a lighter or flame

**What genuine Shilajit does:**
- Does NOT catch fire or burn
- Bubbles and puffs up (like charcoal)
- Produces minimal smoke with a distinctive mineral smell
- Leaves a fine ash residue

**What fake Shilajit does:**
- Burns with a flame (indicates wax, resin, or oil content)
- Melts like plastic
- Produces thick, acrid smoke

*Note: This test is for resin only. Liquid Shilajit can't be tested this way.*

## Test 4: The Temperature Test (Resin Only)

**How to do it:**
1. Refrigerate your Shilajit resin for 30 minutes
2. Then leave it at room temperature for 15 minutes

**What genuine Shilajit does:**
- Becomes rock hard when cold
- Softens and becomes pliable at room temperature
- Shifts between solid and semi-liquid states with temperature

**What fake Shilajit does:**
- Maintains the same texture regardless of temperature
- May remain permanently soft or permanently hard

## Test 5: The Taste & Smell Test

**How to do it:**
- Taste a tiny amount (rice grain sized)
- Smell the product

**Genuine Shilajit:**
- **Tastes:** Intensely bitter, mineral-like, slightly smoky — NOT sweet
- **Smells:** Distinct earthy, slightly petroleum-like smell — unmistakable once experienced

**Fake Shilajit:**
- Often tastes sweet or bland (to hide poor quality ingredients)
- May smell artificially "natural" or like molasses

## The Easiest Assurance: Lab Testing

For liquid Shilajit like Himtatwa, you don't need to run these tests yourself. Every batch is:

- 🔬 **Third-party lab tested** — Certificate of Analysis (COA) available
- 🏅 **FSSAI certified** — India's food safety authority
- ✅ **Heavy metal screened** — Arsenic, lead, mercury, cadmium all tested
- 📊 **Fulvic acid content verified** — Ensures potency

When you buy from a brand that publishes lab certificates and holds FSSAI certification, you can skip the home tests entirely.

## Quick Buying Checklist

Before purchasing any Shilajit, ask:

- [ ] Does the company publish lab test certificates?
- [ ] Are they FSSAI certified (for Indian brands)?
- [ ] Do they disclose their sourcing altitude?
- [ ] Is the ingredient list "Shilajit extract" only — with zero additives?
- [ ] Do they offer a money-back guarantee?

Himtatwa answers "yes" to all five. That's our promise of purity.
    `,
  },
};

function renderContent(markdown: string) {
  const lines = markdown.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-2xl font-display font-bold text-white mt-10 mb-4">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={key++} className="text-white font-semibold my-2">
          {line.replace(/\*\*/g, '')}
        </p>
      );
    } else if (line.startsWith('- ✅') || line.startsWith('- ❌') || line.startsWith('- [ ]') || line.startsWith('- 🔬') || line.startsWith('- 🏅') || line.startsWith('- ✅') || line.startsWith('- 📊')) {
      elements.push(
        <li key={key++} className="text-neutral-300 text-base leading-relaxed ml-4 list-none flex items-start gap-2 my-1">
          <span>{line.replace(/^- /, '')}</span>
        </li>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-neutral-300 text-base leading-relaxed ml-4 list-disc my-1">
          {line.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '$1')}
        </li>
      );
    } else if (/^\d+\. /.test(line)) {
      elements.push(
        <li key={key++} className="text-neutral-300 text-base leading-relaxed ml-4 list-decimal my-1">
          {line.replace(/^\d+\. /, '').replace(/\*\*(.*?)\*\*/g, '$1')}
        </li>
      );
    } else if (line.startsWith('| ') && line.includes(' | ')) {
      // Skip table rows (render as styled lines)
      if (!line.includes('---')) {
        const cols = line.split('|').filter((c) => c.trim());
        elements.push(
          <div key={key++} className="flex gap-2 border-b border-neutral-800 py-2 text-sm">
            {cols.map((col, ci) => (
              <span key={ci} className={`flex-1 ${ci === 0 ? 'text-neutral-300' : 'text-neutral-400 text-center'}`}>
                {col.trim().replace(/\*\*/g, '')}
              </span>
            ))}
          </div>
        );
      }
    } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      elements.push(
        <p key={key++} className="text-neutral-400 italic text-sm mt-6 border-l-2 border-gold-500/30 pl-4">
          {line.replace(/^\*/, '').replace(/\*$/, '')}
        </p>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      // Normal paragraph - handle inline bold
      const parts = line.split(/\*\*(.*?)\*\*/g);
      if (parts.length > 1) {
        elements.push(
          <p key={key++} className="text-neutral-300 text-base leading-relaxed my-2">
            {parts.map((part, pi) =>
              pi % 2 === 1 ? <strong key={pi} className="text-white font-semibold">{part}</strong> : part
            )}
          </p>
        );
      } else {
        elements.push(
          <p key={key++} className="text-neutral-300 text-base leading-relaxed my-2">
            {line}
          </p>
        );
      }
    }
  }

  return elements;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_CONTENT[params.slug];
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  if (!post) return notFound();

  const featuredProduct = PRODUCTS[0];

  const handleAdd = () => {
    addItem(featuredProduct);
    toast.success('Added to cart!', { action: { label: 'View Cart', onClick: openCart } });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-tight px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-gold-400 text-sm mb-10 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-0.5 rounded-md bg-gold-500/10 text-gold-400 text-xs font-medium">
              {post.category}
            </span>
            <span className="text-neutral-500 text-xs flex items-center gap-1">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-neutral-500 text-xs flex items-center gap-1">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-neutral-400 text-lg leading-relaxed border-l-4 border-gold-500/30 pl-4">
            {post.excerpt}
          </p>
        </div>

        <hr className="border-neutral-800 mb-10" />

        {/* Content */}
        <div className="prose-custom">
          {renderContent(post.content)}
        </div>

        <hr className="border-neutral-800 mt-12 mb-10" />

        {/* CTA Card */}
        <div className="rounded-2xl bg-gradient-to-br from-gold-900/20 to-neutral-900 border border-gold-500/20 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">Ready to experience it?</p>
            <h3 className="text-white text-xl font-display font-bold mb-2">
              Try Himtatwa Liquid Shilajit
            </h3>
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="text-gold-400 fill-gold-400" />
              ))}
              <span className="text-neutral-400 text-xs ml-2">4.7/5 • 1,600+ reviews</span>
            </div>
            <p className="text-neutral-400 text-sm">Lab-tested • FSSAI Certified • Zero additives</p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <span className="text-white font-bold text-xl">{formatPrice(featuredProduct.price)}</span>
            <button onClick={handleAdd} className="btn-primary text-sm whitespace-nowrap">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 flex items-center gap-3 text-neutral-500 text-sm">
          <Share2 size={16} />
          <span>Share this article</span>
          {[
            { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(post.title + ' - https://himtatwa.com/blog/' + params.slug)}` },
            { label: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent('https://himtatwa.com/blog/' + params.slug)}` },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-gold-400 transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
