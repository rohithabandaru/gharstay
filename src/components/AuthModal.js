'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthModal({ onClose }) {
  const router = useRouter();
  const [tab, setTab] = useState('login');
  const [role, setRole] = useState('tenant');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      if (role === 'owner') {
        router.push('/owner/dashboard');
      } else {
        router.push('/tenant/dashboard');
      }
    }, 1000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <h3>Welcome to GharStay</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {/* Tabs */}
            <div className="tabs">
              <button type="button" className={`tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Login</button>
              <button type="button" className={`tab ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>Register</button>
            </div>

            {/* Role Selection */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => setRole('tenant')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${role === 'tenant' ? 'var(--primary-500)' : 'var(--border-light)'}`,
                  background: role === 'tenant' ? 'var(--primary-50)' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🔍</div>
                <div style={{ fontSize: '0.813rem', fontWeight: '600', color: role === 'tenant' ? 'var(--primary-600)' : 'var(--text-primary)' }}>Tenant</div>
                <div style={{ fontSize: '0.688rem', color: 'var(--text-tertiary)' }}>Looking for a home</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('owner')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${role === 'owner' ? 'var(--primary-500)' : 'var(--border-light)'}`,
                  background: role === 'owner' ? 'var(--primary-50)' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🏠</div>
                <div style={{ fontSize: '0.813rem', fontWeight: '600', color: role === 'owner' ? 'var(--primary-600)' : 'var(--text-primary)' }}>Owner</div>
                <div style={{ fontSize: '0.688rem', color: 'var(--text-tertiary)' }}>List your property</div>
              </button>
            </div>

            {/* Phone Input */}
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{
                  padding: '12px 14px',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.938rem',
                  color: 'var(--text-secondary)',
                  background: 'var(--bg-secondary)',
                }}>+91</div>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Enter mobile number"
                  maxLength={10}
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>

            {tab === 'register' && (
              <>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter email address"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
              {loading ? 'Processing...' : (tab === 'login' ? 'Send OTP' : 'Create Account')}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            margin: '24px 0',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
            <span style={{ fontSize: '0.813rem', color: 'var(--text-tertiary)' }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
          </div>

          {/* Social Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={handleSubmit}>
              🔵 Google
            </button>
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={handleSubmit}>
              📘 Facebook
            </button>
          </div>

          <p style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
            marginTop: '20px',
            lineHeight: '1.5',
          }}>
            By continuing, you agree to GharStay's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
