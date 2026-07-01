'use client';
import PageShell from '@/components/PageShell';

export default function AboutPage() {
  return (
    <PageShell>
      <main style={{ paddingTop: undefined, minHeight: '85vh', background: 'var(--bg-secondary)', paddingBottom: '80px' }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(180deg, var(--primary-50) 0%, #FFFFFF 100%)',
          padding: '64px 0',
          textAlign: 'center',
          borderBottom: '1px solid var(--border-light)',
        }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '16px' }}>About GharStay</span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2' }}>
              Building India's Most Trusted & Transparent Rental Ecosystem
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              GharStay is on a mission to simplify property hunting and rental management for millions of students, working professionals, and property owners across India.
            </p>
          </div>
        </section>

        {/* Our Story & Mission */}
        <section style={{ padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '16px' }}>Our Mission</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
                  Finding a safe, comfortable, and affordable PG or apartment in a new city has traditionally been fraught with hidden brokerages, unreliable listings, and lack of transparency.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  GharStay eliminates middleman commissions and connects verified tenants directly with trusted property owners. We leverage smart technology to enable zero-brokerage search, instant online booking, digital KYC verification, and seamless rent management.
                </p>
              </div>
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                height: '340px',
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" 
                  alt="Modern Co-Living Interior" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section style={{ background: 'white', padding: '64px 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>Why Choose GharStay?</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Principles that drive our marketplace forward every day</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
              {[
                { img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80', title: '100% Verified Properties', desc: 'Every PG, hostel, and apartment undergoes strict physical verification before getting listed.' },
                { img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80', title: 'Zero Brokerage', desc: 'Direct connect between tenants and owners. No heavy brokerage fees or surprise charges.' },
                { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', title: 'Smart Tenant Management', desc: 'Property owners get digital ledgers, automated rent collections, and instant applicant approval tools.' },
                { img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80', title: 'End-to-End Support', desc: 'From online booking requests to rental agreements and move-in support, we assist you throughout.' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
