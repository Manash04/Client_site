'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@supabase/ssr';
import { toast } from 'sonner';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartStore((s) => s.openCart);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    setMounted(true);
    // Get current session
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setMobileOpen(false);
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-tight flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <span className="text-black font-display font-bold text-sm">HT</span>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-colors">
              Himtatwa
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {mounted && user ? (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-300 hover:text-red-400 rounded-lg hover:bg-white/5 transition-all"
              >
                <LogOut size={17} />
                <span className="hidden md:inline">Logout</span>
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              >
                <User size={18} />
                <span className="hidden md:inline">Account</span>
              </Link>
            )}

            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full hover:bg-white/5 transition-all group"
            >
              <ShoppingBag size={20} className="text-neutral-300 group-hover:text-white transition-colors" />
              {mounted && itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold-500 text-black text-[11px] font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-all"
            >
              <Menu size={22} className="text-neutral-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[300px] bg-neutral-950 border-l border-neutral-800 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-lg font-bold text-white">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-white/5">
                  <X size={20} className="text-neutral-400" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-neutral-300 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-neutral-800 my-4" />
                {mounted && user ? (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 text-base font-medium text-red-400 hover:text-red-300 rounded-xl hover:bg-white/5 transition-all flex items-center gap-3 w-full text-left"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-neutral-300 hover:text-white rounded-xl hover:bg-white/5 transition-all flex items-center gap-3"
                  >
                    <User size={18} /> Account
                  </Link>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

