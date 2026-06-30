'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

export default function TenantDashboard() {
  const [authOpen, setAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [rentPaid, setRentPaid] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);
  const [complaintText, setComplaintText] = useState('');
  const [complaintCategory, setComplaintCategory] = useState('wifi');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('gharstay_bookings') || '[]');
      setBookings(stored);
    }
  }, []);

  const handlePayRent = () => {
    setRentPaid(true);
  };

  const handleRaiseTicket = (e) => {
    e.preventDefault();
    setTicketSent(true);
    setComplaintText('');
  };

  return (
    <>
      <Navbar onAuthClick={() => setAuthOpen(true)} />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

      <main style={{ paddingTop: '80px', minHeight: '85vh', background: 'var(--bg-secondary)', paddingBottom: '60px' }}>
        {/* Header */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)', padding: '28px 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '6px' }}>Tenant Residency Portal</span>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: 0 }}>Welcome Back, Rahul Mehta 👋</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '4px' }}>Resident at <strong>Sunshine PG for Men</strong> (Room 102), Koramangala, Bangalore.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/properties" className="btn btn-secondary">🔍 Browse Stays</Link>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)' }}>
          <div className="container tenant-tabs">
            {[
              { id: 'overview', label: '🏠 My Stay & Dues' },
              { id: 'maintenance', label: '🛠️ Maintenance & Complaints' },
              { id: 'documents', label: '📄 Agreement & KYC' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 4px',
                  background: 'none',
                  border: 'none',
                  fontSize: '0.938rem',
                  fontWeight: activeTab === tab.id ? '700' : '600',
                  color: activeTab === tab.id ? 'var(--primary-600)' : 'var(--text-secondary)',
                  borderBottom: activeTab === tab.id ? '3px solid var(--primary-600)' : '3px solid transparent',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="container" style={{ marginTop: '32px' }}>
          {activeTab === 'overview' && (
            <div className="tenant-grid">
              <div>
                {/* Active Stay Section */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '16px' }}>🏠 My Active Stay</h3>
                {/* Active Rent Bill Card */}
                <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '28px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: '800' }}>Current Month Rent Dues</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>July 2026 Billing Cycle</p>
                    </div>
                    {rentPaid ? (
                      <span className="badge badge-success" style={{ fontSize: '0.875rem', padding: '6px 16px' }}>Paid Online ✅</span>
                    ) : (
                      <span className="badge badge-warning" style={{ fontSize: '0.875rem', padding: '6px 16px' }}>Due by July 5th ⚠️</span>
                    )}
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.938rem', marginBottom: '8px' }}>
                      <span>Monthly Room Rent</span>
                      <span>₹8,500</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.938rem', marginBottom: '8px' }}>
                      <span>Maintenance Charge</span>
                      <span>₹500</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.125rem', borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: '12px' }}>
                      <span>Total Amount Payable</span>
                      <span style={{ color: 'var(--primary-600)' }}>₹9,000</span>
                    </div>
                  </div>

                  {!rentPaid ? (
                    <button onClick={handlePayRent} className="btn btn-primary btn-full btn-lg">
                      💳 Pay Rent Now (Razorpay / UPI)
                    </button>
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--success)', fontWeight: '700' }}>
                      🎉 Payment received! Transaction ID: #TXN_9872134
                    </div>
                  )}
                </div>

                {/* My Booking Requests */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '16px' }}>📅 My Stays & Bookings</h3>
                {bookings.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {bookings.map((b) => (
                      <div key={b.id} style={{
                        background: 'white',
                        borderRadius: 'var(--radius-xl)',
                        padding: '20px',
                        border: '1px solid var(--border-light)',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--gray-200)' }}>
                          <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: '1 1 200px' }}>
                          <h4 style={{ fontSize: '1.063rem', fontWeight: '700', marginBottom: '4px' }}>{b.title}</h4>
                          <p style={{ fontSize: '0.813rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                            📍 {b.area}, {b.city ? b.city.charAt(0).toUpperCase() + b.city.slice(1) : ''}
                          </p>
                          <div style={{ display: 'flex', gap: '12px', fontSize: '0.813rem', color: 'var(--text-tertiary)' }}>
                            <span>Move-in: <strong>{b.date}</strong></span>
                            <span>Duration: <strong>{b.duration} Month(s)</strong></span>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--primary-600)', marginBottom: '8px' }}>
                            ₹{(b.rent).toLocaleString()}/mo
                          </div>
                          <span className="badge badge-warning" style={{ fontSize: '0.75rem' }}>{b.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    background: 'white',
                    borderRadius: 'var(--radius-xl)',
                    padding: '32px',
                    textAlign: 'center',
                    border: '1px solid var(--border-light)',
                  }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>
                      No active stays or pending bookings found.
                    </p>
                    <Link href="/properties" className="btn btn-secondary btn-sm" style={{ textDecoration: 'none' }}>
                      🔍 Browse & Book Stays
                    </Link>
                  </div>
                )}
              </div>

              <div>
                {/* Property Details Summary */}
                <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '24px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                  <h4 style={{ fontSize: '1.063rem', fontWeight: '700', marginBottom: '16px' }}>Property Owner Contact</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>R</div>
                    <div>
                      <div style={{ fontWeight: '700' }}>Rajesh Kumar</div>
                      <div style={{ fontSize: '0.813rem', color: 'var(--text-secondary)' }}>Owner • Sunshine PG</div>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-full">📞 Call Owner (+91 98765 43210)</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '32px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', maxWidth: '700px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '12px' }}>🛠️ Raise Maintenance / Repair Request</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.875rem' }}>Having issues with WiFi, plumbing, AC, or housekeeping? Submit a request directly to your property manager.</p>

              {ticketSent ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✅</div>
                  <h4 style={{ color: 'var(--success)', marginBottom: '8px' }}>Support Ticket Created!</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Your property manager Rajesh Kumar has been notified via WhatsApp and will resolve this shortly.</p>
                  <button onClick={() => setTicketSent(false)} className="btn btn-secondary" style={{ marginTop: '16px' }}>Submit Another Ticket</button>
                </div>
              ) : (
                <form onSubmit={handleRaiseTicket} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label className="form-label">Issue Category</label>
                    <select className="form-select" value={complaintCategory} onChange={e => setComplaintCategory(e.target.value)}>
                      <option value="wifi">📶 High-Speed WiFi Issue</option>
                      <option value="plumbing">🚿 Plumbing / Water Supply</option>
                      <option value="ac">❄️ AC / Electrical Repairs</option>
                      <option value="cleaning">🧹 Housekeeping & Cleaning</option>
                      <option value="other">❓ Other Requirement</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Describe the Problem</label>
                    <textarea 
                      required 
                      className="form-input" 
                      rows="4" 
                      placeholder="e.g. WiFi router in 1st floor hallway is restarting repeatedly..."
                      value={complaintText}
                      onChange={e => setComplaintText(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg">Submit Maintenance Request 🚀</button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '32px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '20px' }}>📄 Rental Agreements & Digital KYC</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-secondary)' }}>
                  <div>
                    <div style={{ fontWeight: '700' }}>Registered Lease Agreement.pdf</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Signed on 01 May 2026 • 11 Months Tenure</div>
                  </div>
                  <button className="btn btn-sm btn-outline">📥 Download</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: 'var(--radius-lg)', background: 'var(--bg-secondary)' }}>
                  <div>
                    <div style={{ fontWeight: '700' }}>KYC Aadhaar Verification.pdf</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Verified by Platform ✅</div>
                  </div>
                  <button className="btn btn-sm btn-outline">👁️ View</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
