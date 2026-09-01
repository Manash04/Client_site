import { createServiceSupabase } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function ReceiptPage({ params }: { params: { id: string } }) {
  const supabase = createServiceSupabase();
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!order) notFound();

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
        body { font-family: 'Segoe UI', sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
      `}</style>

      {/* Print button */}
      <div className="no-print" style={{ textAlign: 'center', padding: '20px', background: '#1a1a1a' }}>
        <button
          onClick={() => window.print()}
          style={{ background: '#d4a017', color: '#000', border: 'none', padding: '12px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Download / Print Receipt
        </button>
      </div>

      {/* Receipt */}
      <div style={{ maxWidth: '600px', margin: '20px auto', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>

        {/* Header */}
        <div style={{ background: '#0a0a0a', padding: '32px', textAlign: 'center' }}>
          <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #facc15, #b8860b)', borderRadius: '50%', margin: '0 auto 12px', lineHeight: '52px', color: '#000', fontWeight: 'bold', fontSize: '18px' }}>HT</div>
          <div style={{ color: '#d4a017', fontSize: '22px', fontWeight: 'bold', letterSpacing: '2px' }}>HIMTATWA</div>
          <div style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>PRIVATE LIMITED</div>
          <div style={{ color: '#d4a017', fontSize: '13px', marginTop: '16px', fontWeight: 'bold' }}>PAYMENT RECEIPT</div>
        </div>

        <div style={{ padding: '28px' }}>

          {/* Order info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
            <div>
              <div style={{ color: '#888', fontSize: '11px', marginBottom: '4px' }}>ORDER NUMBER</div>
              <div style={{ color: '#000', fontSize: '15px', fontWeight: 'bold' }}>{order.order_number}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#888', fontSize: '11px', marginBottom: '4px' }}>DATE</div>
              <div style={{ color: '#000', fontSize: '13px' }}>
                {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
            <div style={{ color: '#888', fontSize: '11px', marginBottom: '8px', letterSpacing: '1px' }}>BILL TO</div>
            <div style={{ color: '#000', fontSize: '13px', lineHeight: '1.8' }}>
              <strong>{order.shipping_address?.full_name}</strong><br />
              {order.shipping_address?.address_line1}<br />
              {order.shipping_address?.address_line2 && <>{order.shipping_address.address_line2}<br /></>}
              {order.shipping_address?.city}, {order.shipping_address?.state} — {order.shipping_address?.pincode}<br />
              Phone: {order.shipping_address?.phone}
            </div>
          </div>

          {/* Items table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ background: '#f8f8f8' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', color: '#888', letterSpacing: '1px' }}>PRODUCT</th>
                <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', color: '#888', letterSpacing: '1px' }}>QTY</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', fontSize: '11px', color: '#888', letterSpacing: '1px' }}>PRICE</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', fontSize: '11px', color: '#888', letterSpacing: '1px' }}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item: any, i: number) => (
                <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#000' }}>{item.product_name}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#000', textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#000', textAlign: 'right' }}>₹{item.price}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#000', textAlign: 'right' }}>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary */}
          <div style={{ background: '#f8f8f8', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tr>
                <td style={{ padding: '5px 0', fontSize: '13px', color: '#666' }}>Subtotal</td>
                <td style={{ padding: '5px 0', fontSize: '13px', color: '#000', textAlign: 'right' }}>₹{order.subtotal}</td>
              </tr>
              {order.discount > 0 && (
                <tr>
                  <td style={{ padding: '5px 0', fontSize: '13px', color: '#16a34a' }}>Discount</td>
                  <td style={{ padding: '5px 0', fontSize: '13px', color: '#16a34a', textAlign: 'right' }}>-₹{order.discount}</td>
                </tr>
              )}
              <tr>
                <td style={{ padding: '5px 0', fontSize: '13px', color: '#666' }}>Shipping</td>
                <td style={{ padding: '5px 0', fontSize: '13px', color: '#000', textAlign: 'right' }}>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</td>
              </tr>
              <tr style={{ borderTop: '1px solid #ddd' }}>
                <td style={{ padding: '10px 0 5px', fontSize: '16px', fontWeight: 'bold', color: '#000' }}>Total Paid</td>
                <td style={{ padding: '10px 0 5px', fontSize: '16px', fontWeight: 'bold', color: '#d4a017', textAlign: 'right' }}>₹{order.total}</td>
              </tr>
            </table>
          </div>

          {/* Payment ID */}
          <div style={{ background: '#f0f0f0', borderRadius: '6px', padding: '12px', marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>PAYMENT ID</div>
            <div style={{ fontSize: '12px', color: '#000', fontFamily: 'monospace' }}>{order.payment_id}</div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', paddingTop: '16px', borderTop: '1px solid #eee' }}>
            <div style={{ fontSize: '12px', color: '#888' }}>Thank you for choosing Himtatwa!</div>
            <div style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>orders@himtatwa.com • himtatwa.com</div>
            <div style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>+91 90455 77509</div>
          </div>
        </div>
      </div>
    </>
  );
}