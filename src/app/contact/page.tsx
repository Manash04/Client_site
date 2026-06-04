'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const INFO = [
  { icon: Mail, title: 'Email', value: 'himtatwa@gmail.com', href: 'mailto:himtatwa@gmail.com' },
  { icon: Phone, title: 'Phone', value: '+91 82182 09756', href: 'tel:+918218209756' },
  { icon: MapPin, title: 'Location', value: 'Hathras, Uttar Pradesh, India', href: '#' },
  { icon: Clock, title: 'Hours', value: 'Mon–Sat, 10AM – 7PM IST', href: '#' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-tight px-4 sm:px-6 lg:px-8 max-w-4xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-gold-400 text-sm font-semibold uppercase tracking-widest">Get in Touch</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mt-4 mb-6">
              We&apos;d Love to <span className="text-gradient">Hear From You</span>
            </h1>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="space-y-4">
              {INFO.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="card p-5 flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                    <item.icon size={20} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-neutral-400 text-xs font-medium uppercase tracking-wider">{item.title}</p>
                    <p className="text-white text-sm">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            {success ? (
              <div className="card p-8 flex flex-col items-center justify-center text-center gap-4 h-full min-h-[320px]">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-white text-xl font-display font-bold">Message Sent!</h3>
                <p className="text-neutral-400 text-sm">
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-gold-400 text-sm hover:text-gold-300 transition-colors mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                <div>
                  <label className="text-sm text-neutral-300 font-medium mb-1.5 block">Name</label>
                  <input
                    className="input-field"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-300 font-medium mb-1.5 block">Email</label>
                  <input
                    className="input-field"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-300 font-medium mb-1.5 block">Message</label>
                  <textarea
                    className="input-field min-h-[120px] resize-none"
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}
                <button type="submit" className="btn-primary w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
