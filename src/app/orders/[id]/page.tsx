'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils';
import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function OrderPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from('orders')
      .select('*')
      .eq('id', params.id)
      .single()
      .then(({ data }) => {
        setOrder(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 skeleton rounded-full mx-auto" />
          <div className="w-48 h-4 skeleton mx-auto" />
          <div className="w-32 h-4 skeleton mx-auto" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-white mb-4">Order not found</h1>
          <Link href="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: Package },
  ];

  const activeIndex = statusSteps.findIndex((s) => s.key === order.status);

  return (
    <div className="pt-24 pb-16">
      <div className="container-tight px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Order Confirmed!</h1>
          <p className="text-neutral-400">Order #{order.order_number}</p>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between mb-12 px-4">
          {statusSteps.map((step, i) => (
            <div key={step.key} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i <= activeIndex ? 'bg-gold-500 text-black' : 'bg-neutral-800 text-neutral-500'}`}>
                <step.icon size={18} />
              </div>
              <span className={`text-xs font-medium ${i <= activeIndex ? 'text-gold-400' : 'text-neutral-500'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Order Details */}
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Order Items</h2>
          {order.items?.map((item: any) => (
            <div key={item.product_id} className="flex justify-between py-3 border-b border-neutral-800 last:border-0">
              <div>
                <p className="text-white text-sm font-medium">{item.product_name}</p>
                <p className="text-neutral-500 text-xs">Qty: {item.quantity}</p>
              </div>
              <span className="text-white text-sm">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}

          <hr className="border-neutral-800" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-400">Subtotal</span><span className="text-white">{formatPrice(order.subtotal)}</span></div>
            {order.discount > 0 && <div className="flex justify-between"><span className="text-green-400">Discount</span><span className="text-green-400">-{formatPrice(order.discount)}</span></div>}
            <div className="flex justify-between"><span className="text-neutral-400">Shipping</span><span className="text-white">{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span></div>
            <hr className="border-neutral-800" />
            <div className="flex justify-between text-lg font-bold"><span className="text-white">Total</span><span className="text-gradient">{formatPrice(order.total)}</span></div>
          </div>
        </div>

        {/* Shipping Address */}
        {order.shipping_address && (
          <div className="card p-6 mt-6">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-gold-400" /> Shipping Address
            </h2>
            <div className="text-neutral-400 text-sm space-y-1">
              <p className="text-white">{order.shipping_address.full_name}</p>
              <p>{order.shipping_address.address_line1}</p>
              {order.shipping_address.address_line2 && <p>{order.shipping_address.address_line2}</p>}
              <p>{order.shipping_address.city}, {order.shipping_address.state} — {order.shipping_address.pincode}</p>
              <p>Phone: {order.shipping_address.phone}</p>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
