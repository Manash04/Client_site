import { Metadata } from 'next';
import ProductsSection from '@/components/home/ProductsSection';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Shop premium Himalayan Shilajit liquid drops. Lab-tested, FSSAI certified, zero additives.',
};

export default function ProductsPage() {
  return (
    <div className="pt-24">
      <ProductsSection />
    </div>
  );
}
