'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

export default function TenantServicesPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [bookedService, setBookedService] = useState(null);

  const services = [
    {
      id: 'agreement',
      title: '📜 Digital Rental Agreement',
      price: '₹499',
      badge: 'Most Popular',
      desc: 'Get a legally vetted 11-month rental agreement delivered to your email with e-stamping and digital signatures.',
      img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'movers',
      title: '🚚 Packers & Movers',
      price: 'Starting ₹1,999',
      badge: 'Discounted',
      desc: 'Hassle-free relocation services. Professional packing, loading, transportation, and setup in your new stay.',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'cleaning',
      title: '🧹 Deep Room Cleaning',
      price: '₹799',
      badge: 'Sanitised',
      desc: 'Professional deep cleaning and sanitization of your room, bathroom, and furniture before move-in.',
      img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'wifi',
      title: '📶 High-Speed WiFi Setup',
      price: 'Free Installation',
      badge: 'Instant',
      desc: 'Get 100 Mbps fiber broadband installed in your room within 24 hours of moving in.',
      img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <>
      <Navbar onAuthClick={() => setAuthOpen(true)} />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

      <main style={{ paddingTop: '80px', minHeight: '85vh', background: 'var(--bg-secondary)', paddingBottom: '80px' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(180deg, var(--primary-50) 0%, #FFFFFF 100%)', padding: '48px 0', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Tailored for Renters</span>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '12px' }}>Tenant Relocation & Care Services 🧳</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.063rem', lineHeight: '1.7' }}>
              Everything you need for a smooth, stress-free move into your new PG, hostel, or apartment.
            </p>
          </div>
        </div>

        <div className="container" style={{ marginTop: '48px' }}>
          {bookedService && (
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '20px', borderRadius: 'var(--radius-xl)', marginBottom: '32px', textAlign: 'center', color: '#166534' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🎉</div>
              <h4 style={{ fontWeight: '800', fontSize: '1.125rem' }}>Service Request Confirmed for {bookedService}!</h4>
              <p style={{ fontSize: '0.875rem', marginTop: '4px' }}>Our tenant care coordinator will call you shortly to schedule the service.</p>
              <button onClick={() => setBookedService(null)} className="btn btn-sm btn-success" style={{ marginTop: '12px' }}>Close</button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
            {services.map((s) => (
              <div key={s.id} style={{ background: 'white', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                    <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--primary-600)', color: 'white', fontSize: '0.75rem', fontWeight: '700', padding: '4px 12px', borderRadius: 'var(--radius-full)' }}>{s.badge}</span>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '8px' }}>{s.title}</h3>
                    <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-600)', marginBottom: '12px' }}>{s.price}</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{s.desc}</p>
                  </div>
                </div>
                <div style={{ padding: '0 20px 20px' }}>
                  <button onClick={() => setBookedService(s.title)} className="btn btn-primary btn-full">
                    Book Service Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
