'use client';
import { useState } from 'react';
import PageShell from '@/components/PageShell';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Honeypot spam protection: if the hidden field has content, silently reject
    if (honeypot) {
      setSubmitted(true); // Show success to fool the bot, but do nothing
      return;
    }
    setSubmitted(true);
  };

  return (
    <PageShell>
      <main style={{ paddingTop: '80px', minHeight: '85vh', background: 'var(--bg-secondary)', paddingBottom: '80px' }}>
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)', padding: '48px 0', textAlign: 'center' }}>
          <div className="container">
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '8px' }}>Contact Our Support Team</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto' }}>
              Have a question about a property listing, booking, or subscription plan? We are here to help 24/7.
            </p>
          </div>
        </div>

        <div className="container" style={{ marginTop: '48px', maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {/* Contact Form */}
            <div style={{ background: 'white', padding: '32px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✉️</div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--success)', marginBottom: '8px' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Thank you for reaching out. Our customer care executive will contact you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-secondary" style={{ marginTop: '20px' }}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Send Us a Message</h3>
                  {/* Honeypot field — invisible to real users, traps spam bots */}
                  <input
                    type="text"
                    name="website_url"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                  />
                  <div>
                    <label className="form-label">Full Name</label>
                    <input type="text" required className="form-input" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input type="email" required className="form-input" placeholder="name@example.com" />
                  </div>
                  <div>
                    <label className="form-label">Message</label>
                    <textarea required className="form-input" rows="4" placeholder="How can we assist you?"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-full btn-lg">Submit Inquiry</button>
                </form>
              )}
            </div>

            {/* Support Info Box — contact info synchronized with Footer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px' }}>📍 Corporate Head Office</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                  GharStay Technologies Pvt Ltd<br />
                  Level 4, Tech Park Towers, Indiranagar<br />
                  Bangalore, Karnataka - 560038
                </p>
              </div>

              <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px' }}>📞 Helpline & Support</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.8' }}>
                  <strong>Tenant Hotline:</strong> +91 1800-123-4567<br />
                  <strong>Owner Partner Desk:</strong> +91 98765 00000<br />
                  <strong>Email:</strong> support@gharstay.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
