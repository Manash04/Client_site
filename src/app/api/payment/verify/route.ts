import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServerSupabase } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = body;

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
    }

    const supabase = createServerSupabase();

    // Update order
    const { data: order, error } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        status: 'confirmed',
        payment_id: razorpay_payment_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order_id)
      .select()
      .single();

    if (error) throw error;

    // Send confirmation emails (fire and forget)
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/order-confirmation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id }),
    }).catch(console.error);

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Verify payment error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
