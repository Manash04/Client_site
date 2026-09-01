import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal, items } = await request.json();
    const supabase = createServerSupabase();

    // Get logged in user
    const { data: { user } } = await supabase.auth.getUser();

    // Get coupon
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
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return NextResponse.json({ valid: false, message: 'This coupon has expired' });
    }

    // Check global usage limit
    if (coupon.used_count >= coupon.usage_limit) {
      return NextResponse.json({ valid: false, message: 'Coupon usage limit reached' });
    }

    // ── WELCOME2 special rules ──
    if (coupon.code === 'WELCOME2') {
      // Must be logged in
      if (!user) {
        return NextResponse.json({ 
          valid: false, 
          message: 'Please sign in to use this coupon' 
        });
      }

      // Check if user has used this coupon before
      const { data: previousUse } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user.id)
        .eq('coupon_code', 'WELCOME2')
        .limit(1);

      if (previousUse && previousUse.length > 0) {
        return NextResponse.json({ 
          valid: false, 
          message: 'This coupon can only be used once per account' 
        });
      }

      // Check if user has placed any previous order (new users only)
      const { data: previousOrders } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user.id)
        .eq('payment_status', 'paid')
        .limit(1);

      if (previousOrders && previousOrders.length > 0) {
        return NextResponse.json({ 
          valid: false, 
          message: 'This coupon is only for first-time customers' 
        });
      }

      // Must have 30ml bottle in cart (and only 30ml, quantity 1)
      const has30ml = items?.some((item: any) => 
        item.slug === 'himtatwa-liquid-shilajit-30ml' || 
        item.name?.includes('30ml')
      );
      
      if (!has30ml) {
        return NextResponse.json({ 
          valid: false, 
          message: 'This coupon is only valid for the 30ml bottle' 
        });
      }

      // Check quantity is exactly 1 for 30ml
      const item30ml = items?.find((item: any) => 
        item.slug === 'himtatwa-liquid-shilajit-30ml' || 
        item.name?.includes('30ml')
      );

      if (item30ml && item30ml.quantity > 1) {
        return NextResponse.json({ 
          valid: false, 
          message: 'This coupon is valid for 1 quantity of the 30ml bottle only' 
        });
      }

      // Check min order value (1299)
      if (subtotal < coupon.min_order_value) {
        return NextResponse.json({ 
          valid: false, 
          message: `This coupon requires a minimum order of ₹${coupon.min_order_value}` 
        });
      }
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discount_type === 'percentage') {
      discount = Math.round((subtotal * coupon.discount_value) / 100);
      if (coupon.max_discount) {
        discount = Math.min(discount, coupon.max_discount);
      }
    } else {
      // fixed discount
      discount = Math.min(coupon.discount_value, subtotal);
    }

    return NextResponse.json({ 
      valid: true, 
      discount,
      message: coupon.discount_type === 'percentage' 
        ? `${coupon.discount_value}% discount applied!`
        : `₹${discount} discount applied!`
    });

  } catch (error: any) {
    console.error('Coupon validate error:', error);
    return NextResponse.json({ valid: false, message: 'Server error' }, { status: 500 });
  }
}