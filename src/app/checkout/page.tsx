'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldCheck, Tag, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import AnimatedSection from '@/components/ui/AnimatedSection';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState('');

  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const subtotal = total();
  const shipping = subtotal >= 999 ? 0 : 99;
  const grandTotal = subtotal - discount + shipping;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setForm((f) => ({
          ...f,
          full_name: data.user?.user_metadata?.full_name || '',
        }));
      }
    });
  }, []);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const res = await fetch('/api/coupon/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, subtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        setDiscount(data.discount);
        setCouponApplied(couponCode);
        toast.success(`Coupon applied! You save ${formatPrice(data.discount)}`);
      } else {
        toast.error(data.message || 'Invalid coupon');
      }
    } catch {
      toast.error('Failed to validate coupon');
    }
  };

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please sign in to place an order');
      router.push('/auth/login');
      return;
    }

    if (!form.full_name || !form.phone || !form.address_line1 || !form.city || !form.state || !form.pincode) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Create Razorpay order
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: grandTotal,
          items: items.map((i) => ({
            product_id: i.product.id,
            product_name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            image_url: i.product.image_url,
          })),
          shipping_address: form,
          coupon_code: couponApplied,
          discount,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderData.order_id) throw new Error('Failed to create order');

      // Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: grandTotal * 100,
        currency: 'INR',
        name: 'Himtatwa',
        description: 'Himalayan Shilajit Purchase',
        order_id: orderData.razorpay_order_id,
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id: orderData.order_id,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              clearCart();
              toast.success('Order placed successfully!');
              router.push(`/orders/${orderData.order_id}`);
            } else {
              toast.error('Payment verification failed');
            }
          } catch {
            toast.error('Payment verification error');
          }
        },
        prefill: {
          name: form.full_name,
          email: user.email,
          contact: form.phone,
        },
        theme: { color: '#d4a017' },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.error('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      toast.error(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-white mb-4">Your cart is empty</h1>
          <button onClick={() => router.push('/products')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-white mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatedSection>
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-gold-400" /> Shipping Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-sm text-neutral-300 mb-1.5 block">Full Name *</label>
                    <input className="input-field" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-neutral-300 mb-1.5 block">Phone *</label>
                    <input className="input-field" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-neutral-300 mb-1.5 block">Address Line 1 *</label>
                    <input className="input-field" value={form.address_line1} onChange={(e) => setForm({ ...form, address_line1: e.target.value })} required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-neutral-300 mb-1.5 block">Address Line 2</label>
                    <input className="input-field" value={form.address_line2} onChange={(e) => setForm({ ...form, address_line2: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-neutral-300 mb-1.5 block">City *</label>
                    <input className="input-field" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
                  </div>
                  <div>
                    <label className="text-sm text-neutral-300 mb-1.5 block">State *</label>
                    <input className="input-field" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required />
                  </div>
                  <div>
                    <label className="text-sm text-neutral-300 mb-1.5 block">Pincode *</label>
                    <input className="input-field" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} required />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Order Summary */}
          <AnimatedSection direction="right">
            <div className="card p-6 sticky top-28 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <ShieldCheck size={20} className="text-gold-400" /> Order Summary
              </h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-neutral-300">{item.product.name} × {item.quantity}</span>
                    <span className="text-white">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <hr className="border-neutral-800" />

              {/* Coupon */}
              <div className="flex gap-2">
                <input
                  className="input-field text-sm flex-1"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                />
                <button onClick={applyCoupon} className="btn-ghost text-sm border border-neutral-700 px-4">
                  <Tag size={14} /> Apply
                </button>
              </div>

              <hr className="border-neutral-800" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-neutral-400">Subtotal</span><span className="text-white">{formatPrice(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between"><span className="text-green-400">Discount</span><span className="text-green-400">-{formatPrice(discount)}</span></div>}
                <div className="flex justify-between"><span className="text-neutral-400">Shipping</span><span className="text-white">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
              </div>

              <hr className="border-neutral-800" />

              <div className="flex justify-between text-lg font-bold">
                <span className="text-white">Total</span>
                <span className="text-gradient">{formatPrice(grandTotal)}</span>
              </div>

              <button onClick={handlePayment} disabled={loading} className="btn-primary w-full py-4 text-base">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Pay {formatPrice(grandTotal)}</>}
              </button>

              <p className="text-neutral-500 text-xs text-center">
                Secured by Razorpay • 256-bit SSL encryption
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
