import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceSupabase } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { order_id } = await request.json();
    const supabase = createServiceSupabase();

    // Get order details
    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Get user
    const {
      data: { user },
    } = await supabase.auth.admin.getUserById(order.user_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const itemsHtml = order.items
      .map(
        (item: any) =>
          `<tr>
          <td style="padding: 12px; border-bottom: 1px solid #2a2a2a; color: #e5e5e5;">${item.product_name}</td>
          <td style="padding: 12px; border-bottom: 1px solid #2a2a2a; color: #e5e5e5; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #2a2a2a; color: #e5e5e5; text-align: right;">₹${item.price * item.quantity}</td>
        </tr>`,
      )
      .join("");

const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="UTF-8">
</head>
<body style="margin:0; padding:0; background:#111111; font-family:'Segoe UI',Tahoma,sans-serif;">
  <div style="max-width:480px; margin:0 auto; padding:16px;">

    <!-- Header -->
    <div style="background:#1a1a1a; border-radius:12px; padding:20px; text-align:center; margin-bottom:12px;">
      <div style="width:44px; height:44px; background:linear-gradient(135deg,#facc15,#b8860b); border-radius:50%; margin:0 auto 12px; line-height:44px; color:#000; font-weight:bold; font-size:16px;">HT</div>
      <div style="color:#d4a017; font-size:20px; font-weight:bold; margin-bottom:4px;">Order Confirmed! 🎉</div>
      <div style="color:#888; font-size:13px;">Order #${order.order_number}</div>
    </div>

    <!-- Order Items -->
    <div style="background:#1a1a1a; border-radius:12px; padding:16px; margin-bottom:12px;">
      <div style="color:#d4a017; font-size:12px; font-weight:bold; letter-spacing:1px; margin-bottom:12px;">ORDER ITEMS</div>
      ${order.items.map((item: any) => `
        <div style="padding:10px 0; border-bottom:1px solid #2a2a2a;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="color:#fff; font-size:13px; padding-right:8px;">${item.product_name}</td>
              <td style="color:#d4a017; font-size:14px; font-weight:bold; text-align:right; white-space:nowrap;">₹${item.price * item.quantity}</td>
            </tr>
            <tr>
              <td style="color:#888; font-size:12px; padding-top:2px;">Qty: ${item.quantity}</td>
              <td></td>
            </tr>
          </table>
        </div>
      `).join('')}
    </div>

    <!-- Payment Summary -->
    <div style="background:#1a1a1a; border-radius:12px; padding:16px; margin-bottom:12px;">
      <div style="color:#d4a017; font-size:12px; font-weight:bold; letter-spacing:1px; margin-bottom:12px;">PAYMENT SUMMARY</div>
      
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="color:#888; font-size:13px; padding:6px 0;">Subtotal</td>
          <td style="color:#fff; font-size:13px; padding:6px 0; text-align:right;">₹${order.subtotal}</td>
        </tr>
        ${order.discount > 0 ? `
        <tr>
          <td style="color:#4ade80; font-size:13px; padding:6px 0;">Discount</td>
          <td style="color:#4ade80; font-size:13px; padding:6px 0; text-align:right;">-₹${order.discount}</td>
        </tr>` : ''}
        <tr>
          <td style="color:#888; font-size:13px; padding:6px 0;">Shipping</td>
          <td style="color:#fff; font-size:13px; padding:6px 0; text-align:right;">${order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</td>
        </tr>
        <tr>
          <td colspan="2" style="padding:4px 0;"><hr style="border:none; border-top:1px solid #333; margin:6px 0;"></td>
        </tr>
        <tr>
          <td style="color:#fff; font-size:16px; font-weight:bold; padding:6px 0;">Total</td>
          <td style="color:#d4a017; font-size:16px; font-weight:bold; padding:6px 0; text-align:right;">₹${order.total}</td>
        </tr>
      </table>
    </div>

    <!-- Delivery Info -->
    <div style="background:#1a1a1a; border-radius:12px; padding:16px; margin-bottom:12px;">
      <div style="color:#d4a017; font-size:12px; font-weight:bold; letter-spacing:1px; margin-bottom:8px;">DELIVERY ADDRESS</div>
      <div style="color:#fff; font-size:13px; line-height:1.8;">
        ${order.shipping_address?.full_name || ''}<br>
        ${order.shipping_address?.address_line1 || ''}
        ${order.shipping_address?.address_line2 ? '<br>' + order.shipping_address.address_line2 : ''}
        <br>${order.shipping_address?.city || ''}, ${order.shipping_address?.state || ''}
        <br>Pincode: ${order.shipping_address?.pincode || ''}
      </div>
    </div>

    <!-- Shipping Notice -->
    <div style="background:#1a1a1a; border-radius:12px; padding:16px; margin-bottom:12px; text-align:center;">
      <div style="color:#fff; font-size:14px; margin-bottom:4px;">🚚 Estimated Dispatch</div>
      <div style="color:#d4a017; font-size:15px; font-weight:bold;">Within 1–2 Business Days</div>
      <div style="color:#888; font-size:12px; margin-top:6px;">You will receive a shipping update once dispatched</div>
    </div>

    <!-- WhatsApp Support -->
    <div style="text-align:center; margin-bottom:12px;">
      <div style="color:#888; font-size:12px; margin-bottom:10px;">Need help with your order?</div>
      <a href="https://wa.me/919045577509?text=Hi%2C%20I%20have%20a%20query%20about%20my%20order%20%23${order.order_number}" 
         style="display:inline-block; background:#25d366; color:#fff; padding:12px 28px; border-radius:10px; text-decoration:none; font-size:14px; font-weight:bold;">
        💬 Chat with us on WhatsApp
      </a>
      <div style="color:#888; font-size:11px; margin-top:8px;">+91 90455 77509</div>
    </div>

    <!-- Footer -->
    <div style="text-align:center; padding:8px;">
      <div style="color:#555; font-size:11px;">Thank you for choosing Himtatwa!</div>
      <div style="color:#555; font-size:11px; margin-top:2px;">orders@himtatwa.com</div>
    </div>

  </div>
</body>
</html>
`;

    // Send to customer
    await resend.emails.send({
      from: "Himtatwa <orders@himtatwa.com>",
      to: user.email!,
      subject: `Order Confirmed — #${order.order_number}`,
      html: emailHtml,
    });

// Send to admin
await resend.emails.send({
  from: 'Himtatwa <orders@himtatwa.com>',
  to: process.env.ADMIN_EMAIL!,
  subject: `New Order — #${order.order_number} — ₹${order.total}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta charset="UTF-8">
    </head>
    <body style="margin:0; padding:0; background:#111111; font-family:'Segoe UI',Tahoma,sans-serif;">
      <div style="max-width:480px; margin:0 auto; padding:16px;">

        <!-- Header -->
        <div style="background:#1a1a1a; border-radius:12px; padding:20px; text-align:center; margin-bottom:12px;">
          <div style="width:44px; height:44px; background:linear-gradient(135deg,#facc15,#b8860b); border-radius:50%; margin:0 auto 12px; line-height:44px; color:#000; font-weight:bold; font-size:16px;">HT</div>
          <div style="color:#d4a017; font-size:18px; font-weight:bold; margin-bottom:4px;">New Order Received 📦</div>
          <div style="color:#888; font-size:13px;">Order #${order.order_number}</div>
          <div style="color:#888; font-size:12px; margin-top:4px;">${new Date(order.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</div>
        </div>

        <!-- Customer Details -->
        <div style="background:#1a1a1a; border-radius:12px; padding:16px; margin-bottom:12px;">
          <div style="color:#d4a017; font-size:12px; font-weight:bold; letter-spacing:1px; margin-bottom:12px;">CUSTOMER DETAILS</div>
          <div style="margin-bottom:8px;">
            <div style="color:#888; font-size:11px; margin-bottom:2px;">NAME</div>
            <div style="color:#fff; font-size:14px;">${order.shipping_address?.full_name || '—'}</div>
          </div>
          <div style="margin-bottom:8px;">
            <div style="color:#888; font-size:11px; margin-bottom:2px;">PHONE</div>
            <div style="color:#fff; font-size:14px;">
              <a href="tel:${order.shipping_address?.phone}" style="color:#d4a017; text-decoration:none;">${order.shipping_address?.phone || '—'}</a>
            </div>
          </div>
          <div>
            <div style="color:#888; font-size:11px; margin-bottom:2px;">EMAIL</div>
            <div style="color:#fff; font-size:14px; word-break:break-all;">${user.email}</div>
          </div>
        </div>

        <!-- Delivery Address -->
        <div style="background:#1a1a1a; border-radius:12px; padding:16px; margin-bottom:12px;">
          <div style="color:#d4a017; font-size:12px; font-weight:bold; letter-spacing:1px; margin-bottom:12px;">DELIVERY ADDRESS</div>
          <div style="color:#fff; font-size:14px; line-height:1.7;">
            ${order.shipping_address?.address_line1 || ''}
            ${order.shipping_address?.address_line2 ? '<br>' + order.shipping_address.address_line2 : ''}
            <br>${order.shipping_address?.city || ''}, ${order.shipping_address?.state || ''}
            <br>Pincode: <strong>${order.shipping_address?.pincode || ''}</strong>
          </div>
          <!-- WhatsApp quick action -->
          <a href="https://wa.me/91${order.shipping_address?.phone?.replace(/\D/g,'')}" 
             style="display:inline-block; margin-top:12px; background:#25d366; color:#fff; padding:8px 16px; border-radius:8px; text-decoration:none; font-size:13px; font-weight:bold;">
            💬 WhatsApp Customer
          </a>
        </div>

        <!-- Order Items -->
        <div style="background:#1a1a1a; border-radius:12px; padding:16px; margin-bottom:12px;">
          <div style="color:#d4a017; font-size:12px; font-weight:bold; letter-spacing:1px; margin-bottom:12px;">ORDER ITEMS</div>
          ${order.items.map((item: any) => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #2a2a2a;">
              <div style="flex:1; padding-right:8px;">
                <div style="color:#fff; font-size:13px;">${item.product_name}</div>
                <div style="color:#888; font-size:12px;">Qty: ${item.quantity}</div>
              </div>
              <div style="color:#d4a017; font-size:14px; font-weight:bold; white-space:nowrap;">₹${item.price * item.quantity}</div>
            </div>
          `).join('')}
        </div>

<!-- Payment Summary -->
<div style="background:#1a1a1a; border-radius:12px; padding:16px; margin-bottom:12px;">
  <div style="color:#d4a017; font-size:12px; font-weight:bold; letter-spacing:1px; margin-bottom:12px;">PAYMENT SUMMARY</div>
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="color:#888; font-size:13px; padding:6px 0;">Subtotal</td>
      <td style="color:#fff; font-size:13px; padding:6px 0; text-align:right;">₹${order.subtotal}</td>
    </tr>
    ${order.discount > 0 ? `
    <tr>
      <td style="color:#4ade80; font-size:13px; padding:6px 0;">Discount${order.coupon_code ? ` (${order.coupon_code})` : ''}</td>
      <td style="color:#4ade80; font-size:13px; padding:6px 0; text-align:right;">-₹${order.discount}</td>
    </tr>` : ''}
    <tr>
      <td style="color:#888; font-size:13px; padding:6px 0;">Shipping</td>
      <td style="color:#fff; font-size:13px; padding:6px 0; text-align:right;">${order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</td>
    </tr>
    <tr>
      <td colspan="2" style="padding:4px 0;"><hr style="border:none; border-top:1px solid #333; margin:6px 0;"></td>
    </tr>
    <tr>
      <td style="color:#fff; font-size:16px; font-weight:bold; padding:6px 0;">Total</td>
      <td style="color:#d4a017; font-size:16px; font-weight:bold; padding:6px 0; text-align:right;">₹${order.total}</td>
    </tr>
  </table>

  <div style="margin-top:12px; padding:10px; background:#111; border-radius:8px;">
    <div style="color:#888; font-size:11px; margin-bottom:4px;">PAYMENT ID</div>
    <div style="color:#fff; font-size:12px; word-break:break-all; font-family:monospace;">${order.payment_id || '—'}</div>
  </div>
</div>

        <!-- Footer -->
        <div style="text-align:center; padding:8px;">
          <div style="color:#555; font-size:11px;">Himtatwa Admin Alert • orders@himtatwa.com</div>
        </div>

      </div>
    </body>
    </html>
  `,
});

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
