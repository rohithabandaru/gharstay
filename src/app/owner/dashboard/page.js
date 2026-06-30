'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { mockTenants, mockBookings } from '@/data/tenants';
import { properties } from '@/data/properties';

export default function OwnerDashboard() {
  const [authOpen, setAuthOpen] = useState(false);

  const ownerProps = properties.slice(0, 3);
  const pendingRequests = mockBookings.filter(b => b.status === 'Pending');

  return (
    <>
      <Navbar onAuthClick={() => setAuthOpen(true)} />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

      <main style={{ paddingTop: '80px', minHeight: '85vh', background: 'var(--bg-secondary)', paddingBottom: '60px' }}>
        {/* Top Header */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)', padding: '24px 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '4px' }}>Owner Dashboard 💼</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Welcome back, Rajesh Sharma! Manage your properties, tenants, and earnings.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/owner/add-property" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                + Add New Property
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Bar */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)' }}>
          <div className="container" style={{ display: 'flex', gap: '24px', overflowX: 'auto' }}>
            <Link href="/owner/dashboard" style={{ padding: '16px 4px', color: 'var(--primary-600)', fontWeight: '700', borderBottom: '3px solid var(--primary-600)', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              📊 Overview
            </Link>
            <Link href="/owner/tenants" style={{ padding: '16px 4px', color: 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              👥 Tenants Management (Add / Reject)
            </Link>
            <Link href="/owner/bookings" style={{ padding: '16px 4px', color: 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              📅 Booking Requests ({pendingRequests.length})
            </Link>
            <Link href="/owner/add-property" style={{ padding: '16px 4px', color: 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              🏠 My Properties
            </Link>
          </div>
        </div>

        <div className="container" style={{ marginTop: '32px' }}>
          {/* Metrics Overview Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {[
              { title: 'Total Revenue', value: '₹1,45,000', change: '+12.5% this mo', icon: '💰', color: 'var(--success)' },
              { title: 'Active Tenants', value: '18 Residents', change: '92% Occupancy', icon: '👥', color: 'var(--primary-600)' },
              { title: 'Pending Applications', value: `${pendingRequests.length} Requests`, change: 'Requires Action', icon: '⏳', color: 'var(--warning)' },
              { title: 'Listed Properties', value: '3 Units', change: 'All Verified ✅', icon: '🏠', color: 'var(--info)' },
            ].map((stat, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '24px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{stat.title}</span>
                  <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>{stat.value}</div>
                <span style={{ fontSize: '0.75rem', color: stat.color, fontWeight: '700' }}>{stat.change}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
            {/* Left Main Dashboard */}
            <div>
              {/* Properties Overview */}
              <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '24px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700' }}>My Listed Properties</h3>
                  <Link href="/owner/add-property" style={{ color: 'var(--primary-600)', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none' }}>+ Add New</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {ownerProps.map(p => {
                    const price = p.rent || p.price || 0;
                    return (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', gap: '16px' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', background: 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🏠</div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.938rem', fontWeight: '700', marginBottom: '4px' }}>{p.title}</h4>
                          <p style={{ fontSize: '0.813rem', color: 'var(--text-secondary)' }}>📍 {p.area}, {p.city} • ₹{price.toLocaleString()}/mo</p>
                        </div>
                        <div>
                          <span className="badge badge-success">Active</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Pending Bookings */}
              <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '24px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Recent Booking Requests</h3>
                  <Link href="/owner/tenants" style={{ color: 'var(--primary-600)', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none' }}>View All Tenants →</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {pendingRequests.map(b => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-secondary)' }}>
                      <div>
                        <h4 style={{ fontSize: '0.938rem', fontWeight: '700' }}>{b.tenantName}</h4>
                        <p style={{ fontSize: '0.813rem', color: 'var(--text-secondary)' }}>Move-in: {b.moveInDate} • {b.propertyTitle}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link href="/owner/tenants" className="btn btn-sm btn-success" style={{ textDecoration: 'none' }}>Manage Request</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar Quick Stats & Tips */}
            <div>
              <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '24px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '16px' }}>Owner Subscription Plan</h3>
                <div style={{ padding: '16px', borderRadius: 'var(--radius-lg)', background: 'var(--primary-50)', border: '1px solid var(--primary-200)', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.813rem', color: 'var(--primary-700)', fontWeight: '700', marginBottom: '4px' }}>CURRENT PLAN</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-900)' }}>Pro Partner Plan 🚀</div>
                  <div style={{ fontSize: '0.813rem', color: 'var(--primary-600)', marginTop: '4px' }}>Unlimited Property Listings Enabled</div>
                </div>
                <Link href="/pricing" className="btn btn-outline btn-full" style={{ textDecoration: 'none', textAlign: 'center' }}>Upgrade / Change Plan</Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
