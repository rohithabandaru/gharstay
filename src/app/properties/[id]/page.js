'use client';
import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { properties } from '@/data/properties';

export default function PropertyDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const propId = String(params.id);

  const initialProperty = properties.find(p => String(p.id) === propId) || properties[0];
  const [property, setProperty] = useState(initialProperty);

  const [activeTab, setActiveTab] = useState('overview');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [duration, setDuration] = useState('1');

  useEffect(() => {
    const found = properties.find(p => String(p.id) === propId) || properties[0];
    setProperty(found);
  }, [propId]);

  const rent = property.rent || property.price || 10000;
  const deposit = property.deposit || rent * 2;
  const mainImg = property.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';
  const bedroomImg = property.images?.[1] || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80';
  const livingImg = property.images?.[2] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80';

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      id: Date.now(),
      propertyId: property.id,
      title: property.title,
      rent: rent,
      deposit: deposit,
      date: bookingDate,
      duration: duration,
      status: 'Pending Approval',
      ownerName: property.owner?.name || 'Rajesh Kumar',
      image: mainImg,
      area: property.area,
      city: property.city,
    };
    
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('gharstay_bookings') || '[]');
      localStorage.setItem('gharstay_bookings', JSON.stringify([newBooking, ...existing]));
    }
    
    setBookingSuccess(true);
  };

  return (
    <PageShell>
      <main className="page-main" style={{ background: 'var(--bg-secondary)', minHeight: '100vh', paddingBottom: '60px' }}>
        {/* Breadcrumb Navigation */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)', padding: '16px 0' }}>
          <div className="container" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link href="/properties" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Properties</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{property.title}</span>
          </div>
        </div>

        <div className="container" style={{ marginTop: '24px' }}>
          {/* Title & Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-primary">{property.type.toUpperCase()}</span>
                <span className="badge badge-success">Verified Property ✅</span>
                <span className="badge badge-warning">For {property.gender}</span>
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '4px' }}>{property.title}</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.938rem' }}>
                📍 {property.address || `${property.area}, ${property.city}`}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary-600)' }}>
                ₹{rent.toLocaleString()}<span style={{ fontSize: '0.938rem', color: 'var(--text-secondary)', fontWeight: '400' }}>/month</span>
              </div>
              <p style={{ fontSize: '0.813rem', color: 'var(--text-tertiary)' }}>Deposit: ₹{deposit.toLocaleString()}</p>
            </div>
          </div>

          {/* Real Photo Showcase Gallery */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '16px',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            marginBottom: '32px',
            maxHeight: '420px',
          }}>
            <div style={{ background: 'var(--gray-200)', height: '420px', overflow: 'hidden' }}>
              <img src={mainImg} alt="Main Showcase" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '16px', height: '420px' }}>
              <div style={{ background: 'var(--gray-200)', overflow: 'hidden' }}>
                <img src={bedroomImg} alt="Bedroom View" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ background: 'var(--gray-200)', overflow: 'hidden' }}>
                <img src={livingImg} alt="Living Area" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="property-details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px' }}>
            
            {/* Left Main Details */}
            <div>
              {/* Tab Navigation */}
              <div style={{
                display: 'flex',
                gap: '8px',
                borderBottom: '1px solid var(--border-light)',
                marginBottom: '24px',
                background: 'white',
                borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                padding: '8px 16px 0',
              }}>
                {['overview', 'amenities', 'rules', 'owner'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '12px 20px',
                      border: 'none',
                      background: 'none',
                      fontSize: '0.938rem',
                      fontWeight: activeTab === tab ? '700' : '500',
                      color: activeTab === tab ? 'var(--primary-600)' : 'var(--text-secondary)',
                      borderBottom: activeTab === tab ? '3px solid var(--primary-600)' : '3px solid transparent',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '28px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                {activeTab === 'overview' && (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Property Description</h3>
                    <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                      {property.description} Located in the high-demand hub of {property.area}, offering high-speed connectivity, proximity to corporate tech parks, popular dining venues, and 24/7 public transport access. Perfect for modern professionals and students looking for peace of mind and convenience.
                    </p>

                    <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px' }}>Key Specifications</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-lg)' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Room Type</div>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{property.roomType || 'Private Room'}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Furnishing</div>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{property.furnishing || 'Fully Furnished'}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Maintenance</div>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>₹{property.maintenance || 500}/mo</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Available From</div>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{property.postedDate || 'Immediate'}</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Amenities & Facilities</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                      {(property.amenities || []).map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                          <span style={{ fontSize: '1.25rem' }}>✅</span>
                          <span style={{ fontSize: '0.875rem', fontWeight: '600', textTransform: 'capitalize' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'rules' && (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>House Rules & Policies</h3>
                    <ul style={{ paddingLeft: '20px', lineHeight: '2', color: 'var(--text-secondary)' }}>
                      {(property.rules || ['No smoking', 'No pets', 'Quiet hours from 10 PM to 6 AM']).map((rule, i) => (
                        <li key={i}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'owner' && (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Property Owner Info</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '700' }}>
                        {(property.owner?.name || 'Owner').charAt(0)}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700' }}>{property.owner?.name || 'Rajesh Kumar'}</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Property Owner • {property.owner?.responseRate || 95}% Response Rate</p>
                        <span className="badge badge-success" style={{ marginTop: '4px' }}>Verified Owner ✅</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn btn-secondary" style={{ flex: 1 }}>📞 Call Owner</button>
                      <button className="btn btn-outline" style={{ flex: 1 }}>💬 WhatsApp</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Instant Booking Box */}
            <div className="booking-sidebar">
              <div style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: '28px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
                position: 'sticky',
                top: '100px',
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '16px' }}>Book This Stay</h3>
                
                {bookingSuccess ? (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
                    <h4 style={{ fontSize: '1.125rem', color: 'var(--success)', marginBottom: '8px' }}>Booking Request Sent!</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                      Your booking request has been successfully registered. You can track and manage this request inside <Link href="/tenant/dashboard" style={{ color: 'var(--primary-600)', fontWeight: '700' }}>My Bookings</Link>.
                    </p>
                    <button onClick={() => setBookingSuccess(false)} className="btn btn-secondary btn-full">
                      Book Another Stay
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label className="form-label">Move-in Date</label>
                      <input 
                        type="date" 
                        required 
                        className="form-input"
                        value={bookingDate}
                        onChange={e => setBookingDate(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="form-label">Duration</label>
                      <select className="form-select" value={duration} onChange={e => setDuration(e.target.value)}>
                        <option value="1">1 Month</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="12">1 Year</option>
                      </select>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '16px 0', margin: '8px 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
                        <span>Monthly Rent</span>
                        <span>₹{rent.toLocaleString()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
                        <span>Security Deposit</span>
                        <span>₹{deposit.toLocaleString()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
                        <span>Platform Booking Fee</span>
                        <span>₹0 (FREE)</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.125rem', marginBottom: '8px' }}>
                      <span>Total Move-in Cost</span>
                      <span style={{ color: 'var(--primary-600)' }}>
                        ₹{(rent + deposit).toLocaleString()}
                      </span>
                    </div>

                    <button type="submit" className="btn btn-primary btn-full btn-lg">
                      Request Instant Booking ⚡
                    </button>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textAlign: 'center' }}>
                      No payment charged until owner confirms your request.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <style jsx>{`
        @media (max-width: 1024px) {
          .property-details-grid {
            display: flex !important;
            flex-direction: column !important;
            grid-template-columns: unset !important;
          }
          .booking-sidebar {
            order: -1;
            position: relative !important;
            top: unset !important;
          }
        }
      `}</style>
    </PageShell>
  );
}
