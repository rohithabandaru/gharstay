'use client';
import { useState } from 'react';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { mockBookings } from '@/data/tenants';

export default function BookingsManagementPage() {
  const [bookings, setBookings] = useState(mockBookings);

  const handleAction = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <PageShell>
      <main style={{ paddingTop: '80px', minHeight: '85vh', background: 'var(--bg-secondary)', paddingBottom: '60px' }}>
        {/* Header */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)', padding: '24px 0' }}>
          <div className="container">
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '4px' }}>Booking Requests 📅</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Approve or decline online tenant visit & move-in requests.</p>
          </div>
        </div>

        {/* Dashboard Navigation Bar */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)' }}>
          <div className="container" style={{ display: 'flex', gap: '24px', overflowX: 'auto' }}>
            <Link href="/owner/dashboard" style={{ padding: '16px 4px', color: 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              📊 Overview
            </Link>
            <Link href="/owner/tenants" style={{ padding: '16px 4px', color: 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              👥 Tenants Management (Add / Reject)
            </Link>
            <Link href="/owner/bookings" style={{ padding: '16px 4px', color: 'var(--primary-600)', fontWeight: '700', borderBottom: '3px solid var(--primary-600)', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              📅 Booking Requests
            </Link>
            <Link href="/owner/add-property" style={{ padding: '16px 4px', color: 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              🏠 My Properties
            </Link>
          </div>
        </div>

        <div className="container" style={{ marginTop: '32px' }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {bookings.map(b => (
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '1.063rem', fontWeight: '700' }}>{b.tenantName}</h4>
                      {b.status === 'Confirmed' && <span className="badge badge-success">Confirmed ✅</span>}
                      {b.status === 'Pending' && <span className="badge badge-warning">Pending Review ⏳</span>}
                      {b.status === 'Cancelled' && <span className="badge badge-danger">Cancelled ❌</span>}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '4px' }}>
                      Property: <strong>{b.propertyTitle}</strong>
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.813rem', color: 'var(--text-tertiary)' }}>
                      <span>🗓️ Move-in Date: {b.moveInDate}</span>
                      <span>📞 Contact: {b.phone}</span>
                      <span>💰 Monthly Rent: ₹{b.rentAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {b.status === 'Pending' && (
                      <>
                        <button onClick={() => handleAction(b.id, 'Confirmed')} className="btn btn-success">
                          Approve Request
                        </button>
                        <button onClick={() => handleAction(b.id, 'Cancelled')} className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                          Decline
                        </button>
                      </>
                    )}
                    {b.status !== 'Pending' && (
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                        Action Processed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
