import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-display font-bold text-gradient mb-4">404</h1>
        <p className="text-neutral-400 text-lg mb-8">This page doesn&apos;t exist.</p>
        <Link href="/" className="btn-primary">Go Home</Link>
      </div>
    </div>
  );
}
