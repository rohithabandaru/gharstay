'use client';
import { useState } from 'react';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { cities, propertyTypes, bangaloreAreas, addProperty } from '@/data/properties';

export default function AddPropertyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'pg',
    city: 'bangalore',
    area: '',
    address: '',
    price: '',
    deposit: '',
    gender: 'unisex',
    sharing: 'Private Room',
    food: '3 Meals Included',
    amenities: ['WiFi', 'AC', 'Power Backup', '3 Meals Daily'],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const rentAmount = Number(formData.price || 12000);
    const depositAmount = Number(formData.deposit || rentAmount * 2);

    const newProperty = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      city: formData.city,
      area: formData.area || 'Koramangala',
      address: `${formData.area || 'Koramangala'}, ${formData.city || 'Bangalore'}`,
      rent: rentAmount,
      price: rentAmount,
      deposit: depositAmount,
      maintenance: 500,
      roomType: formData.sharing || 'Private Room',
      gender: formData.gender || 'unisex',
      furnishing: 'Fully Furnished',
      amenities: ['wifi', 'power-backup', 'security', 'cctv', 'geyser'],
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 5.0,
      reviews: 1,
      description: `Newly listed ${formData.type} in ${formData.area}, ${formData.city}. Spacious room with all modern amenities, ready to move in. Contact the owner for immediate visiting slot.`,
      rules: ['No smoking', 'No pets', 'Guests allowed during daytime'],
      owner: { id: 9, name: 'Rajesh Sharma', phone: '+91 98765 43210', responseRate: 98, image: '' },
      featured: false,
      verified: true,
      available: true,
      postedDate: new Date().toISOString().split('T')[0],
    };

    addProperty(newProperty);
    setSubmitted(true);
  };

  return (
    <PageShell>
      <main style={{ paddingTop: undefined, minHeight: '85vh', background: 'var(--bg-secondary)', paddingBottom: '60px' }}>
        {/* Header */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)', padding: '24px 0' }}>
          <div className="container">
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '4px' }}>List Your Property 🏠</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Fill in the details below to publish your property on GharStay marketplace.</p>
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
            <Link href="/owner/bookings" style={{ padding: '16px 4px', color: 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              📅 Booking Requests
            </Link>
            <Link href="/owner/add-property" style={{ padding: '16px 4px', color: 'var(--primary-600)', fontWeight: '700', borderBottom: '3px solid var(--primary-600)', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              🏠 My Properties
            </Link>
          </div>
        </div>

        <div className="container" style={{ marginTop: '32px', maxWidth: '800px' }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '32px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--success)', marginBottom: '8px' }}>Property Submitted Successfully!</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Your listing for <strong>{formData.title || 'New Property'}</strong> is under verification. It will go live within 2-4 hours.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <Link href="/owner/dashboard" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                    Go to Dashboard
                  </Link>
                  <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                    Add Another Property
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                  1. Basic Property Information
                </h3>

                <div>
                  <label className="form-label">Property Title / Name</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="e.g. Starlight Luxury PG for Men"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label">Property Type</label>
                    <select className="form-select" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                      {propertyTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">City</label>
                    <select className="form-select" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}>
                      {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label">Locality / Area</label>
                    <select 
                      required 
                      className="form-select" 
                      value={formData.area}
                      onChange={e => setFormData({ ...formData, area: e.target.value })}
                    >
                      <option value="">Select Area</option>
                      {bangaloreAreas.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Preferred Tenants</label>
                    <select className="form-select" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                      <option value="boys">Boys Only</option>
                      <option value="girls">Girls Only</option>
                      <option value="unisex">Co-Living / Any</option>
                      <option value="family">Family / Couples</option>
                    </select>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginTop: '12px' }}>
                  2. Pricing & Deposit
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label">Monthly Rent (₹)</label>
                    <input 
                      type="number" 
                      required 
                      className="form-input" 
                      placeholder="14000"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="form-label">Security Deposit (₹)</label>
                    <input 
                      type="number" 
                      required 
                      className="form-input" 
                      placeholder="28000"
                      value={formData.deposit}
                      onChange={e => setFormData({ ...formData, deposit: e.target.value })}
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginTop: '12px' }}>
                  3. Facilities & Amenities
                </h3>

                <div>
                  <label className="form-label">Select Included Facilities</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                    {['WiFi', 'Air Conditioning', 'Power Backup', 'Daily Housekeeping', '3 Meals Daily', 'Washing Machine', 'CCTV Security', 'Parking'].map(item => (
                      <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '16px' }}>
                  Publish Property Listing 🚀
                </button>
              </form>
            )}

          </div>
        </div>
      </main>
    </PageShell>
  );
}
