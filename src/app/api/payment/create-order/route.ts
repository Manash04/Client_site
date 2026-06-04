import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createServerSupabase } from '@/lib/supabase/server';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { amount, items, shipping_address, coupon_code, discount } = body;

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });

    // Generate order number
    const orderNumber = `HT${Date.now().toString(36).toUpperCase()}`;

    // Save order to Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        items,
        subtotal: amount + discount,
        discount,
        shipping: amount >= 999 ? 0 : 99,
        total: amount,
        status: 'pending',
        payment_status: 'pending',
        razorpay_order_id: razorpayOrder.id,
        shipping_address,
        coupon_code: coupon_code || null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      order_id: order.id,
      razorpay_order_id: razorpayOrder.id,
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
