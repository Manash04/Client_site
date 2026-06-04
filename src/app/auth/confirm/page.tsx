import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
          <Mail size={28} className="text-gold-400" />
        </div>
        <h1 className="text-2xl font-display font-bold text-white mb-3">Check Your Email</h1>
        <p className="text-neutral-400 mb-8">
          We&apos;ve sent a confirmation link to your email address. Click the link to verify your account and get started.
        </p>
        <Link href="/auth/login" className="btn-secondary">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
