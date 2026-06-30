'use client';
import Link from 'next/link';
import PageShell, { useAuth } from '@/components/PageShell';
import { ownerPlans, tenantPlans } from '@/data/tenants';

export default function PricingPage() {
  return (
    <PageShell>
      <PricingContent />
    </PageShell>
  );
}

function PricingContent() {
  const openAuth = useAuth();
  const activePlans = tenantPlans;

  return (
    <main style={{ paddingTop: '80px', minHeight: '85vh', background: 'var(--bg-secondary)', paddingBottom: '80px' }}>
      {/* Hero */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)', padding: '48px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="badge badge-primary" style={{ marginBottom: '12px' }}>Simple, Transparent Pricing</div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '12px' }}>Choose Your GharStay Prime Plan</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto' }}>
            Unlock priority support, zero platform fees, move-in cashbacks, and free rental agreement handling with Prime.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {activePlans.map((plan) => (
            <div
              key={plan.id}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: '32px 28px',
                border: plan.popular ? '2px solid var(--primary-600)' : '1px solid var(--border-light)',
                boxShadow: plan.popular ? 'var(--shadow-xl)' : 'var(--shadow-sm)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s',
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--primary-gradient)',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '4px 16px',
                  borderRadius: 'var(--radius-full)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  MOST POPULAR ✨
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '8px' }}>{plan.name}</h3>
                <div style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--primary-600)', marginBottom: '16px' }}>
                  ₹{plan.price.toLocaleString()} <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '400' }}>/{plan.period}</span>
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.813rem', fontWeight: '700', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '12px' }}>Included Features:</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {plan.features.map((feature, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                        <span style={{ color: 'var(--success)', fontSize: '1rem', fontWeight: 'bold' }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={openAuth}
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-full btn-lg`}
              >
                Get Started with {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
