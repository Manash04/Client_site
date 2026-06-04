'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      setSent(true);
      toast.success('Password reset email sent!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
            <Mail size={28} className="text-gold-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white mb-3">Check Your Email</h1>
          <p className="text-neutral-400 mb-8">
            We&apos;ve sent a password reset link to <span className="text-white">{email}</span>.
          </p>
          <Link href="/auth/login" className="btn-secondary">Back to Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-neutral-400 hover:text-gold-400 text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Sign In
        </Link>

        <h1 className="text-2xl font-display font-bold text-white mb-2">Forgot Password</h1>
        <p className="text-neutral-400 text-sm mb-8">Enter your email and we&apos;ll send you a reset link.</p>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="text-sm text-neutral-300 font-medium mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-11"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <>Send Reset Link <ArrowRight size={16} /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
