'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };
  return (
    <footer style={{
      background: 'var(--gray-900)',
      color: 'var(--gray-300)',
      paddingTop: '64px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          paddingBottom: '48px',
          borderBottom: '1px solid var(--gray-700)',
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'var(--primary-gradient)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                color: 'white',
                fontWeight: '800',
                fontFamily: 'var(--font-heading)',
              }}>G</div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.375rem',
                fontWeight: '800',
                color: 'white',
              }}>GharStay</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '20px', color: 'var(--gray-400)' }}>
              India's trusted rental property marketplace. Find verified PGs, Hostels, Flats & more across 8+ cities.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['📘', '🐦', '📸', '💼'].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--gray-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  transition: 'background 0.2s',
                }} onMouseEnter={e => e.target.style.background = 'var(--gray-700)'}
                   onMouseLeave={e => e.target.style.background = 'var(--gray-800)'}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.938rem', fontWeight: '700', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Quick Links</h4>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/properties">Browse Properties</FooterLink>
            <FooterLink href="/pricing">Pricing Plans</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </div>

          {/* Relocation Support */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.938rem', fontWeight: '700', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Relocation Support</h4>
            <FooterLink href="/tenant-services">Rental Agreements</FooterLink>
            <FooterLink href="/tenant-services">Packers & Movers</FooterLink>
            <FooterLink href="/tenant-services">Deep Room Cleaning</FooterLink>
            <FooterLink href="/tenant-services">WiFi Setup</FooterLink>
            <FooterLink href="/tenant/dashboard">My Bookings</FooterLink>
          </div>

          {/* Popular Areas */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.938rem', fontWeight: '700', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Popular Areas</h4>
            <FooterLink href="/properties?area=marathahalli">PG in Marathahalli</FooterLink>
            <FooterLink href="/properties?area=whitefield">PG in Whitefield</FooterLink>
            <FooterLink href="/properties?area=indiranagar">PG in Indiranagar</FooterLink>
            <FooterLink href="/properties?area=koramangala">PG in Koramangala</FooterLink>
            <FooterLink href="/properties?area=hsr-layout">PG in HSR Layout</FooterLink>
            <FooterLink href="/properties?area=bellandur">PG in Bellandur</FooterLink>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.938rem', fontWeight: '700', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Contact Us</h4>

            <a href="mailto:support@gharstay.com" style={{
              display: 'block',
              fontSize: '0.875rem',
              color: 'var(--gray-400)',
              marginBottom: '8px',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = 'var(--gray-400)'}
            >📧 support@gharstay.com</a>

            <a href="tel:+911800-123-4567" style={{
              display: 'block',
              fontSize: '0.875rem',
              color: 'var(--gray-400)',
              marginBottom: '8px',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = 'var(--gray-400)'}
            >📞 +91 1800-123-4567</a>

            <a href="https://maps.google.com/?q=Bangalore,India" target="_blank" rel="noopener noreferrer" style={{
              display: 'block',
              fontSize: '0.875rem',
              color: 'var(--gray-400)',
              marginBottom: '20px',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = 'var(--gray-400)'}
            >📍 Bangalore, India</a>

            <div style={{ background: 'var(--gray-800)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
              {subscribed ? (
                <p style={{ fontSize: '0.75rem', color: '#10B981', textAlign: 'center', padding: '8px 0' }}>✅ Subscribed successfully!</p>
              ) : (
                <>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginBottom: '8px' }}>Subscribe to Newsletter</p>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--gray-700)',
                        background: 'var(--gray-900)',
                        color: 'white',
                        fontSize: '0.813rem',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={handleSubscribe}
                      style={{
                        padding: '8px 14px',
                        background: 'var(--primary-gradient)',
                        color: 'white',
                        borderRadius: 'var(--radius-sm)',
                        border: 'none',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >→</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '24px 0',
          fontSize: '0.813rem',
          color: 'var(--gray-500)',
        }}>
          <p>© 2026 GharStay. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'var(--gray-500)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gray-300)'}
              onMouseLeave={e => e.target.style.color = 'var(--gray-500)'}
            >Privacy Policy</a>
            <a href="#" style={{ color: 'var(--gray-500)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gray-300)'}
              onMouseLeave={e => e.target.style.color = 'var(--gray-500)'}
            >Terms of Service</a>
            <a href="#" style={{ color: 'var(--gray-500)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--gray-300)'}
              onMouseLeave={e => e.target.style.color = 'var(--gray-500)'}
            >Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link href={href} style={{
      display: 'block',
      padding: '4px 0',
      fontSize: '0.875rem',
      color: 'var(--gray-400)',
      textDecoration: 'none',
      transition: 'color 0.2s',
    }}
    onMouseEnter={e => e.target.style.color = 'white'}
    onMouseLeave={e => e.target.style.color = 'var(--gray-400)'}
    >
      {children}
    </Link>
  );
}
