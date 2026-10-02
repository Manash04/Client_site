'use client';

const messages = [
  '🔥 USE CODE ELEVEN35 FOR 35% OFF — LIMITED USE',
  '🚚 FREE DELIVERY ON ALL ORDERS',
  '🎉 USE CODE LAUNCH30 FOR 30% OFF',
  '🏔️ SOURCED FROM 16,000+ FEET ALTITUDE',
  '✅ LAB TESTED • FSSAI CERTIFIED • 100% PURE',
  '🔥 USE CODE ELEVEN35 FOR 35% OFF — LIMITED USE',
  '🚚 FREE DELIVERY ON ALL ORDERS',
  '🎉 USE CODE LAUNCH30 FOR 30% OFF',
  '🏔️ SOURCED FROM 16,000+ FEET ALTITUDE',
  '✅ LAB TESTED • FSSAI CERTIFIED • 100% PURE',
];

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="announcement-track">
        {messages.map((msg, i) => (
          <span key={i} className="announcement-item">
            {msg}
            <span className="announcement-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}