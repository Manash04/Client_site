'use client';

const messages = [
  '🚚 FREE DELIVERY ON ALL ORDERS',
  '🎉 USE CODE LAUNCH30 FOR 30% OFF',
  '⚡ GET 30ml SHILAJIT AT JUST ₹2 — USE CODE WELCOME2',
  '🏔️ SOURCED FROM 16,000+ FEET ALTITUDE',
  '✅ LAB TESTED • FSSAI CERTIFIED • 100% PURE',
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