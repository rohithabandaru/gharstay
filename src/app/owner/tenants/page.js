'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { mockTenants } from '@/data/tenants';
import { properties } from '@/data/properties';

export default function TenantManagementPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [tenantList, setTenantList] = useState(mockTenants);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form state for adding a new tenant
  const [newTenant, setNewTenant] = useState({
    name: '',
    phone: '',
    email: '',
    propertyId: properties[0].id,
    roomNo: '',
    rentAmount: '12000',
    moveInDate: '',
  });

  const handleStatusChange = (tenantId, newStatus) => {
    setTenantList(prev => prev.map(t => {
      if (t.id === tenantId) {
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  const handleAddTenantSubmit = (e) => {
    e.preventDefault();
    const selectedProp = properties.find(p => p.id === newTenant.propertyId);
    const created = {
      id: `t_${Date.now()}`,
      name: newTenant.name,
      phone: newTenant.phone,
      email: newTenant.email,
      propertyId: newTenant.propertyId,
      propertyTitle: selectedProp ? selectedProp.title : 'Selected Stay',
      roomNo: newTenant.roomNo || '101',
      status: 'Active',
      rentAmount: Number(newTenant.rentAmount),
      moveInDate: newTenant.moveInDate || new Date().toISOString().split('T')[0],
      kycVerified: true,
      paymentStatus: 'Paid',
    };
    setTenantList([created, ...tenantList]);
    setShowAddModal(false);
    setNewTenant({
      name: '',
      phone: '',
      email: '',
      propertyId: properties[0].id,
      roomNo: '',
      rentAmount: '12000',
      moveInDate: '',
    });
  };

  const filteredTenants = tenantList.filter(t => {
    if (filterStatus === 'all') return true;
    return t.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <>
      <Navbar onAuthClick={() => setAuthOpen(true)} />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

      <main style={{ paddingTop: '80px', minHeight: '85vh', background: 'var(--bg-secondary)', paddingBottom: '60px' }}>
        {/* Header */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)', padding: '24px 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '4px' }}>Tenant Management 👥</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Add new residents, review applicant requests, accept or reject tenant profiles.</p>
            </div>
            <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
              ➕ Add New Tenant
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Bar */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)' }}>
          <div className="container" style={{ display: 'flex', gap: '24px', overflowX: 'auto' }}>
            <Link href="/owner/dashboard" style={{ padding: '16px 4px', color: 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              📊 Overview
            </Link>
            <Link href="/owner/tenants" style={{ padding: '16px 4px', color: 'var(--primary-600)', fontWeight: '700', borderBottom: '3px solid var(--primary-600)', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              👥 Tenants Management (Add / Reject)
            </Link>
            <Link href="/owner/bookings" style={{ padding: '16px 4px', color: 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              📅 Booking Requests
            </Link>
            <Link href="/owner/add-property" style={{ padding: '16px 4px', color: 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.938rem', whitespace: 'nowrap' }}>
              🏠 My Properties
            </Link>
          </div>
        </div>

        <div className="container" style={{ marginTop: '32px' }}>
          {/* Status Tabs Filter */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Residents & Applicants' },
              { id: 'active', label: 'Active Tenants 🟢' },
              { id: 'pending', label: 'Pending Applicants 🟡' },
              { id: 'rejected', label: 'Rejected / Blocked 🔴' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`btn ${filterStatus === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.875rem' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tenants Table List */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)', fontWeight: '700' }}>
                    <th style={{ padding: '16px 20px' }}>Tenant Details</th>
                    <th style={{ padding: '16px 20px' }}>Property & Room</th>
                    <th style={{ padding: '16px 20px' }}>Rent & Payment</th>
                    <th style={{ padding: '16px 20px' }}>KYC Status</th>
                    <th style={{ padding: '16px 20px' }}>Application Status</th>
                    <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions (Accept / Reject)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTenants.length > 0 ? (
                    filteredTenants.map((tenant) => (
                      <tr key={tenant.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.938rem' }}>{tenant.name}</div>
                          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.813rem' }}>📞 {tenant.phone}</div>
                          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.813rem' }}>✉️ {tenant.email}</div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: '600' }}>{tenant.propertyTitle}</div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.813rem' }}>Room No: {tenant.roomNo}</div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: '700', color: 'var(--primary-600)' }}>₹{tenant.rentAmount.toLocaleString()}/mo</div>
                          <span className={`badge ${tenant.paymentStatus === 'Paid' ? 'badge-success' : 'badge-danger'}`} style={{ marginTop: '4px' }}>
                            {tenant.paymentStatus}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          {tenant.kycVerified ? (
                            <span className="badge badge-success">Verified ✅</span>
                          ) : (
                            <span className="badge badge-warning">Pending ⚠️</span>
                          )}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          {tenant.status === 'Active' && <span className="badge badge-success">Active Resident 🟢</span>}
                          {tenant.status === 'Pending' && <span className="badge badge-warning">Applicant Pending 🟡</span>}
                          {tenant.status === 'Rejected' && <span className="badge badge-danger">Rejected 🔴</span>}
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            {tenant.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(tenant.id, 'Active')}
                                  className="btn btn-sm btn-success"
                                  title="Accept Tenant Application"
                                >
                                  ✅ Accept
                                </button>
                                <button
                                  onClick={() => handleStatusChange(tenant.id, 'Rejected')}
                                  className="btn btn-sm btn-danger"
                                  title="Reject Tenant Application"
                                >
                                  ❌ Reject
                                </button>
                              </>
                            )}
                            {tenant.status === 'Active' && (
                              <button
                                onClick={() => handleStatusChange(tenant.id, 'Rejected')}
                                className="btn btn-sm btn-outline"
                                style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}
                              >
                                🚫 Terminate / Block
                              </button>
                            )}
                            {tenant.status === 'Rejected' && (
                              <button
                                onClick={() => handleStatusChange(tenant.id, 'Active')}
                                className="btn btn-sm btn-secondary"
                              >
                                🔄 Re-Activate
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        No tenants found in this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal for Adding New Tenant Manually */}
        {showAddModal && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}>
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: '32px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: 'var(--shadow-xl)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>➕ Add New Tenant</h3>
                <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              </div>

              <form onSubmit={handleAddTenantSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="form-label">Tenant Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="e.g. Ramesh Kumar"
                    value={newTenant.name}
                    onChange={e => setNewTenant({ ...newTenant, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      className="form-input" 
                      placeholder="+91 9876543210"
                      value={newTenant.phone}
                      onChange={e => setNewTenant({ ...newTenant, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      className="form-input" 
                      placeholder="ramesh@gmail.com"
                      value={newTenant.email}
                      onChange={e => setNewTenant({ ...newTenant, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Select Property</label>
                  <select 
                    className="form-select"
                    value={newTenant.propertyId}
                    onChange={e => setNewTenant({ ...newTenant, propertyId: e.target.value })}
                  >
                    {properties.map(p => (
                      <option key={p.id} value={p.id}>{p.title} ({p.city})</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label">Room / Flat No.</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="e.g. B-204"
                      value={newTenant.roomNo}
                      onChange={e => setNewTenant({ ...newTenant, roomNo: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="form-label">Monthly Rent (₹)</label>
                    <input 
                      type="number" 
                      required 
                      className="form-input" 
                      placeholder="12000"
                      value={newTenant.rentAmount}
                      onChange={e => setNewTenant({ ...newTenant, rentAmount: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '8px' }}>
                  Confirm & Add Tenant 🚀
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
