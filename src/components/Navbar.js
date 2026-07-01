'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ onAuthClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-navbar)',
        background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)',
        borderBottom: scrolled ? '1px solid var(--border-light)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        transition: 'all var(--transition-normal)',
        backdropFilter: 'blur(8px)',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--primary-gradient)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              color: 'white',
              fontWeight: '800',
              fontFamily: 'var(--font-heading)',
            }}>G</div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: '800',
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>GharStay</span>
          </Link>

          {/* Desktop Nav */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }} className="desktop-nav">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/properties">Explore Stays</NavLink>
            <NavLink href="/tenant/dashboard">My Bookings</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* Desktop Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }} className="desktop-nav">
            <button className="btn btn-primary btn-sm" onClick={onAuthClick}>
              Login / Register
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '24px',
              height: '2px',
              background: 'var(--text-primary)',
              marginBottom: '6px',
              transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(45deg) translateY(8px)' : 'none',
            }} />
            <div style={{
              width: '24px',
              height: '2px',
              background: 'var(--text-primary)',
              marginBottom: '6px',
              opacity: mobileOpen ? 0 : 1,
              transition: 'all 0.3s',
            }} />
            <div style={{
              width: '24px',
              height: '2px',
              background: 'var(--text-primary)',
              transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.3)',
            zIndex: 999,
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '280px',
        height: '100vh',
        background: 'var(--bg-primary)',
        zIndex: 1001,
        transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: mobileOpen ? '-4px 0 24px rgba(0,0,0,0.1)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        padding: '80px 24px 24px',
      }}>
        <MobileLink href="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
        <MobileLink href="/properties" onClick={() => setMobileOpen(false)}>Explore Stays</MobileLink>
        <MobileLink href="/tenant/dashboard" onClick={() => setMobileOpen(false)}>📱 My Bookings</MobileLink>
        <MobileLink href="/pricing" onClick={() => setMobileOpen(false)}>Pricing</MobileLink>
        <MobileLink href="/about" onClick={() => setMobileOpen(false)}>About</MobileLink>
        <MobileLink href="/contact" onClick={() => setMobileOpen(false)}>Contact</MobileLink>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="btn btn-primary" onClick={() => { onAuthClick?.(); setMobileOpen(false); }}>Login / Register</button>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}

function NavLink({ href, children }) {
  return (
    <Link href={href} style={{
      padding: '8px 16px',
      fontSize: '0.938rem',
      fontWeight: '500',
      color: 'var(--text-secondary)',
      textDecoration: 'none',
      borderRadius: 'var(--radius-md)',
      transition: 'all var(--transition-fast)',
    }}
    onMouseEnter={e => {
      e.target.style.color = 'var(--primary-600)';
      e.target.style.background = 'var(--primary-50)';
    }}
    onMouseLeave={e => {
      e.target.style.color = 'var(--text-secondary)';
      e.target.style.background = 'transparent';
    }}
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, onClick, children }) {
  return (
    <Link href={href} onClick={onClick} style={{
      padding: '14px 16px',
      fontSize: '1rem',
      fontWeight: '500',
      color: 'var(--text-primary)',
      textDecoration: 'none',
      borderRadius: 'var(--radius-md)',
      display: 'block',
      transition: 'background var(--transition-fast)',
    }}
    onMouseEnter={e => e.target.style.background = 'var(--bg-secondary)'}
    onMouseLeave={e => e.target.style.background = 'transparent'}
    >
      {children}
    </Link>
  );
}
