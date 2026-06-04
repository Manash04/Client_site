import { Product, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Himtatwa Liquid Shilajit — 30ml',
    slug: 'himtatwa-liquid-shilajit-30ml',
    description:
      'Experience the purest form of Himalayan Shilajit, carefully sourced from altitudes above 16,000 feet. Our 30ml liquid dropper bottle provides a 2–3 month supply of this ancient Ayurvedic superfood, packed with 85+ minerals and fulvic acid for maximum absorption and bioavailability.',
    short_description: 'Premium liquid Shilajit — 2-3 month supply for daily vitality',
    price: 1299,
    mrp: 1699,
    size: '30ml',
    supply_duration: '2–3 months',
    tag: 'Most Popular',
    image_url: '/images/product.jpg',
    images: ['/images/product.jpg', '/images/product2.jpg', '/images/product3.jpg'],
    benefits: [
      'Boost Energy & Stamina',
      'Enhance Brain Function',
      'Increase Testosterone Naturally',
      'Slow Aging & Rejuvenate',
      'Easy Liquid Dropper — 3-5 drops daily',
    ],
    ingredients: 'Pure Himalayan Shilajit Extract — zero additives, zero fillers',
    usage: 'Add 3–5 drops to warm water or milk. Consume daily on an empty stomach for best results.',
    certifications: ['Lab Tested', 'FSSAI Certified', 'No Additives', 'GMP Certified'],
    in_stock: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Himtatwa Liquid Shilajit — 15ml',
    slug: 'himtatwa-liquid-shilajit-15ml',
    description:
      'The perfect introduction to Himalayan Shilajit. Our 15ml starter pack delivers 1–1.5 months of this powerful adaptogen in a convenient liquid dropper format. Same premium quality, ideal for first-time users.',
    short_description: 'Starter pack — 1-1.5 month supply to begin your wellness journey',
    price: 799,
    mrp: 999,
    size: '15ml',
    supply_duration: '1–1.5 months',
    tag: 'Starter Pack',
    image_url: '/images/product.jpg',
    images: ['/images/product.jpg', '/images/product2.jpg', '/images/product3.jpg'],
    benefits: [
      'Boost Energy & Stamina',
      'Enhance Brain Function',
      'Increase Testosterone Naturally',
      'Slow Aging & Rejuvenate',
      'Easy Liquid Dropper — 3-5 drops daily',
    ],
    ingredients: 'Pure Himalayan Shilajit Extract — zero additives, zero fillers',
    usage: 'Add 3–5 drops to warm water or milk. Consume daily on an empty stomach for best results.',
    certifications: ['Lab Tested', 'FSSAI Certified', 'No Additives', 'GMP Certified'],
    in_stock: true,
    created_at: new Date().toISOString(),
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'I\'ve been using Himtatwa Shilajit for 2 months now. The energy boost is incredible — I feel 10 years younger. Best Shilajit I\'ve tried, and I\'ve tried many.',
    verified: true,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Was skeptical at first, but the results speak for themselves. Better focus at work, improved sleep, and my skin has a natural glow. Highly recommend!',
    verified: true,
  },
  {
    id: '3',
    name: 'Amit Patel',
    location: 'Bangalore',
    rating: 5,
    text: 'The liquid form is so convenient compared to resin. Just a few drops in my morning water and I\'m set for the day. Quality is top-notch.',
    verified: true,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    location: 'Hyderabad',
    rating: 4,
    text: 'Bought the starter pack first, now on my second 30ml bottle. Noticeable improvement in stamina and mental clarity. Pure and authentic product.',
    verified: true,
  },
  {
    id: '5',
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    text: 'As a fitness enthusiast, I was looking for a natural testosterone booster. Himtatwa delivered beyond expectations. Lab-tested and FSSAI certified gives me confidence.',
    verified: true,
  },
  {
    id: '6',
    name: 'Kavitha Nair',
    location: 'Kerala',
    rating: 5,
    text: 'My father has been taking this daily and his joint pain has reduced significantly. The purity of this Shilajit is unmatched. Thank you, Himtatwa!',
    verified: true,
  },
];

export const BENEFITS_DATA = [
  {
    icon: 'Zap',
    title: 'Boost Energy',
    description: 'Natural ATP production for sustained energy throughout the day without crashes.',
  },
  {
    icon: 'Brain',
    title: 'Brain Function',
    description: 'Enhanced cognitive performance, focus, and mental clarity with fulvic acid.',
  },
  {
    icon: 'TrendingUp',
    title: 'Testosterone',
    description: 'Clinically shown to support healthy testosterone levels in men naturally.',
  },
  {
    icon: 'Clock',
    title: 'Anti-Aging',
    description: '85+ minerals and antioxidants that combat cellular aging and promote longevity.',
  },
  {
    icon: 'Shield',
    title: 'Immunity',
    description: 'Strengthen your body\'s natural defence system with adaptogenic properties.',
  },
  {
    icon: 'Heart',
    title: 'Heart Health',
    description: 'Support cardiovascular function and maintain healthy blood pressure levels.',
  },
];

export const FAQ_DATA = [
  {
    question: 'What is Shilajit?',
    answer: 'Shilajit is a natural substance found primarily in the rocks of the Himalayas, formed over centuries by the gradual decomposition of plants. It\'s rich in fulvic acid and contains 85+ minerals in ionic form, making it one of the most potent natural supplements available.',
  },
  {
    question: 'How do I use Himtatwa Liquid Shilajit?',
    answer: 'Simply add 3–5 drops to a glass of warm water or milk. Consume once daily, preferably on an empty stomach in the morning. For best results, maintain consistent daily usage for at least 2–3 months.',
  },
  {
    question: 'Is it safe to consume daily?',
    answer: 'Yes, Himtatwa Liquid Shilajit is 100% natural, lab-tested, and FSSAI certified. It contains zero additives or fillers. However, we recommend consulting your physician if you have any pre-existing medical conditions or are on medication.',
  },
  {
    question: 'How long before I see results?',
    answer: 'Most users report increased energy within the first 1–2 weeks. For full benefits including improved cognitive function and hormonal balance, we recommend consistent use for 2–3 months.',
  },
  {
    question: 'What makes Himtatwa different from other brands?',
    answer: 'Himtatwa sources Shilajit from altitudes above 16,000 feet in the Himalayas, ensuring maximum potency. Our liquid form offers superior bioavailability compared to resin or capsules. Every batch is lab-tested for purity and heavy metals.',
  },
  {
    question: 'Do you offer returns or refunds?',
    answer: 'Yes, we offer a 30-day satisfaction guarantee. If you\'re not happy with the product, contact us for a full refund. The product must be at least 50% unused.',
  },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
