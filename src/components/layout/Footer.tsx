import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/50">
      {/* Main Footer */}
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-black font-display font-bold text-sm">HT</span>
              </div>
              <span className="font-display text-xl font-bold text-white">Himtatwa</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
              Premium Himalayan Shilajit sourced from 16,000+ feet. Pure, lab-tested, and FSSAI certified.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/himtatwa?igsh=MWZtcXJtZ3o0cWNydg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-500/30 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-500/30 transition-all"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-500/30 transition-all"
                aria-label="Youtube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-neutral-400 hover:text-gold-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:himtatwa@gmail.com" className="hover:text-gold-400 transition-colors">
                  himtatwa@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <a href="tel:+918218209756" className="hover:text-gold-400 transition-colors">
                  +91 82182 09756
                </a>
              </li>
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Uttar Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800/50 px-4 sm:px-6 lg:px-8 py-6">
        <div className="container-tight flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-xs">
            © {new Date().getFullYear()} Himtatwa. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-neutral-600 text-xs">FSSAI Certified</span>
            <span className="text-neutral-700">•</span>
            <span className="text-neutral-600 text-xs">Lab Tested</span>
            <span className="text-neutral-700">•</span>
            <span className="text-neutral-600 text-xs">Made in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
