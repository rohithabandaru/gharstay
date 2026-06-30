'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { properties, cities, propertyTypes, bangaloreAreas } from '@/data/properties';
import { tenants } from '@/data/tenants';

export default function AdminDashboard() {
  const [authOpen, setAuthOpen] = useState(false);
  const [propertyList, setPropertyList] = useState(properties);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for admin posting properties on behalf of owners
  const [newProp, setNewProp] = useState({
    title: '',
    type: 'pg',
    city: 'bangalore',
    area: '',
    rent: '12000',
    ownerName: '',
    ownerPhone: '',
  });

  const toggleVerifyProperty = (id) => {
    setPropertyList(prev => prev.map(p => p.id === id ? { ...p, verified: !p.verified } : p));
  };

  const handleAdminAddProperty = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      title: newProp.title,
      type: newProp.type,
      city: newProp.city,
      area: newProp.area,
      rent: Number(newProp.rent),
      deposit: Number(newProp.rent) * 2,
      verified: true,
      featured: true,
      owner: { name: newProp.ownerName || 'Verified Owner', phone: newProp.ownerPhone },
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'],
      rating: 5.0,
      reviews: 1,
    };
    setPropertyList([created, ...propertyList]);
    setShowAddModal(false);
    setNewProp({ title: '', type: 'pg', city: 'bangalore', area: '', rent: '12000', ownerName: '', ownerPhone: '' });
  };

  return (
    <>
      <Navbar onAuthClick={() => setAuthOpen(true)} />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

      <main style={{ paddingTop: '80px', minHeight: '85vh', background: 'var(--bg-secondary)', paddingBottom: '60px' }}>
        {/* Header */}
        <div style={{ background: 'var(--gray-900)', color: 'white', padding: '28px 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="badge badge-warning" style={{ marginBottom: '8px', background: '#FEF08A', color: '#854D0E' }}>⚡ Super Admin Console</div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: 0, color: 'white' }}>Admin Listing Control</h1>
              <p style={{ color: 'var(--gray-300)', fontSize: '0.875rem', marginTop: '4px' }}>Admins personally verify and post property listings on behalf of property owners.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
                ➕ Admin: Post Property for Owner
              </button>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: '32px' }}>
          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {[
              { label: 'Total Managed Properties', val: `${propertyList.length} Units`, change: '100% Admin Verified', icon: '🏢', color: 'var(--success)' },
              { label: 'Platform Revenue Share', val: '₹4,85,000', change: '20% Admin Commission', icon: '💎', color: 'var(--primary-600)' },
              { label: 'Active City Hubs', val: '8 Cities', change: 'Delhi, Mumbai, BLR...', icon: '🏙️', color: 'var(--info)' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '24px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.813rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{s.label}</span>
                  <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>{s.val}</div>
                <span style={{ fontSize: '0.75rem', color: s.color, fontWeight: '700' }}>{s.change}</span>
              </div>
            ))}
          </div>

          {/* Admin Managed Properties Table */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>🛡️ Admin Published Property Catalog</h3>
              <button onClick={() => setShowAddModal(true)} className="btn btn-sm btn-primary">+ Post New Property</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {propertyList.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{p.title}</h4>
                      {p.verified ? (
                        <span className="badge badge-success">Admin Verified ✅</span>
                      ) : (
                        <span className="badge badge-warning">Under Review ⚠️</span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.813rem', color: 'var(--text-secondary)' }}>
                      📍 {p.area}, {p.city} • Rent: <strong>₹{(p.rent || p.price || 0).toLocaleString()}/mo</strong> • Owner: <strong>{p.owner?.name || 'Assigned Owner'}</strong>
                    </p>
                  </div>
                  <div>
                    <button 
                      onClick={() => toggleVerifyProperty(p.id)}
                      className={`btn btn-sm ${p.verified ? 'btn-outline' : 'btn-primary'}`}
                    >
                      {p.verified ? 'Unpublish' : 'Publish to Marketplace ✅'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for Admin to Post Property on Behalf of Owner */}
        {showAddModal && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
          }}>
            <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '32px', maxWidth: '500px', width: '100%', boxShadow: 'var(--shadow-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>➕ Admin: Post Property for Owner</h3>
                <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              </div>

              <form onSubmit={handleAdminAddProperty} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="form-label">Property Name / Title</label>
                  <input type="text" required className="form-input" placeholder="e.g. Royal PG for Men" value={newProp.title} onChange={e => setNewProp({...newProp, title: e.target.value})} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label">City</label>
                    <select className="form-select" value={newProp.city} onChange={e => setNewProp({...newProp, city: e.target.value})}>
                      {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Property Type</label>
                    <select className="form-select" value={newProp.type} onChange={e => setNewProp({...newProp, type: e.target.value})}>
                      {propertyTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label">Locality / Area</label>
                    <select 
                      required 
                      className="form-select" 
                      value={newProp.area} 
                      onChange={e => setNewProp({...newProp, area: e.target.value})}
                    >
                      <option value="">Select Area</option>
                      {bangaloreAreas.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Monthly Rent (₹)</label>
                    <input type="number" required className="form-input" placeholder="12000" value={newProp.rent} onChange={e => setNewProp({...newProp, rent: e.target.value})} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label">Owner Name</label>
                    <input type="text" required className="form-input" placeholder="Rajesh Kumar" value={newProp.ownerName} onChange={e => setNewProp({...newProp, ownerName: e.target.value})} />
                  </div>
                  <div>
                    <label className="form-label">Owner Phone</label>
                    <input type="tel" required className="form-input" placeholder="+91 9876543210" value={newProp.ownerPhone} onChange={e => setNewProp({...newProp, ownerPhone: e.target.value})} />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '8px' }}>
                  Publish Property Listing ✅
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
