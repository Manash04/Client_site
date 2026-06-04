import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createServiceSupabase } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { order_id } = await request.json();
    const supabase = createServiceSupabase();

    // Get order details
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', order_id)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Get user
    const { data: { user } } = await supabase.auth.admin.getUserById(order.user_id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const itemsHtml = order.items
      .map((item: any) =>
        `<tr>
          <td style="padding: 12px; border-bottom: 1px solid #2a2a2a; color: #e5e5e5;">${item.product_name}</td>
          <td style="padding: 12px; border-bottom: 1px solid #2a2a2a; color: #e5e5e5; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #2a2a2a; color: #e5e5e5; text-align: right;">₹${item.price * item.quantity}</td>
        </tr>`
      )
      .join('');

    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; padding: 40px; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #facc15, #b8860b); border-radius: 50%; line-height: 48px; color: black; font-weight: bold; font-size: 18px;">HT</div>
          <h1 style="color: #f5f5f5; margin: 16px 0 4px; font-size: 24px;">Order Confirmed! 🎉</h1>
          <p style="color: #a3a3a3; margin: 0; font-size: 14px;">Order #${order.order_number}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
          <thead>
            <tr style="border-bottom: 2px solid #333;">
              <th style="padding: 12px; text-align: left; color: #d4a017; font-size: 13px; text-transform: uppercase;">Product</th>
              <th style="padding: 12px; text-align: center; color: #d4a017; font-size: 13px; text-transform: uppercase;">Qty</th>
              <th style="padding: 12px; text-align: right; color: #d4a017; font-size: 13px; text-transform: uppercase;">Price</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>

        <div style="background: #1a1a1a; padding: 20px; border-radius: 12px; margin: 24px 0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #a3a3a3;">Subtotal</span>
            <span style="color: #e5e5e5;">₹${order.subtotal}</span>
          </div>
          ${order.discount > 0 ? `<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #4ade80;">Discount</span><span style="color: #4ade80;">-₹${order.discount}</span></div>` : ''}
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #a3a3a3;">Shipping</span>
            <span style="color: #e5e5e5;">${order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
          </div>
          <hr style="border: 1px solid #333; margin: 12px 0;" />
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #f5f5f5; font-weight: bold; font-size: 18px;">Total</span>
            <span style="color: #d4a017; font-weight: bold; font-size: 18px;">₹${order.total}</span>
          </div>
        </div>

        <p style="color: #a3a3a3; font-size: 13px; text-align: center;">
          Thank you for choosing Himtatwa! Your order will be shipped within 1-2 business days.
        </p>
      </div>
    `;

    // Send to customer
    await resend.emails.send({
      from: 'Himtatwa <orders@himtatwa.com>',
      to: user.email!,
      subject: `Order Confirmed — #${order.order_number}`,
      html: emailHtml,
    });

    // Send to admin
    await resend.emails.send({
      from: 'Himtatwa <system@himtatwa.com>',
      to: process.env.ADMIN_EMAIL!,
      subject: `New Order — #${order.order_number} — ₹${order.total}`,
      html: emailHtml.replace('Order Confirmed! 🎉', 'New Order Received 📦'),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
