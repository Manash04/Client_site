import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json();

    const supabase = createServerSupabase();
    const { data: coupon, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !coupon) {
      return NextResponse.json({ valid: false, message: 'Invalid coupon code' });
    }

    // Check expiry
    if (new Date(coupon.expires_at) < new Date()) {
      return NextResponse.json({ valid: false, message: 'This coupon has expired' });
    }

    // Check usage limit
    if (coupon.used_count >= coupon.usage_limit) {
      return NextResponse.json({ valid: false, message: 'Coupon usage limit reached' });
    }

    // Check minimum order
    if (subtotal < coupon.min_order_value) {
      return NextResponse.json({
        valid: false,
        message: `Minimum order of ₹${coupon.min_order_value} required`,
      });
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discount_type === 'percentage') {
      discount = Math.round((subtotal * coupon.discount_value) / 100);
      if (coupon.max_discount) {
        discount = Math.min(discount, coupon.max_discount);
      }
    } else {
      discount = coupon.discount_value;
    }

    return NextResponse.json({ valid: true, discount });
  } catch (error: any) {
    return NextResponse.json({ valid: false, message: 'Server error' }, { status: 500 });
  }
}
