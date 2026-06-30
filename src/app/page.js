'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PropertyCard from '@/components/PropertyCard';
import { properties, cities, propertyTypes, bangaloreAreas } from '@/data/properties';
import { testimonials } from '@/data/tenants';

export default function HomePage() {
  const [searchArea, setSearchArea] = useState('');
  const [searchType, setSearchType] = useState('');
  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    setAllProperties([...properties]);
  }, []);

  const featuredProps = allProperties.filter(p => p.featured).slice(0, 6);

  return (
    <PageShell>
      <main style={{ minHeight: '85vh', background: 'var(--bg-secondary)', paddingBottom: '60px' }}>
        {/* ===== HERO SECTION ===== */}
        <section style={{
          paddingTop: '120px',
          paddingBottom: '80px',
          background: 'linear-gradient(180deg, var(--primary-50) 0%, #FFFFFF 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          }} />

          <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div className="badge badge-primary" style={{ marginBottom: '16px', fontSize: '0.813rem', padding: '6px 16px' }}>
              🏠 India's #1 Rental Property Platform
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '20px',
              maxWidth: '720px',
              margin: '0 auto 20px',
            }}>
              Find Your Perfect{' '}
              <span style={{
                background: 'var(--primary-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Home Away</span>{' '}
              From Home
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              margin: '0 auto 40px',
              lineHeight: '1.7',
            }}>
              Browse verified PGs, Hostels, Flats, Apartments & Co-Living spaces across Bangalore's premium localities. Trusted by 10,000+ tenants.
            </p>

            {/* Search Bar */}
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
              padding: '8px',
              maxWidth: '800px',
              margin: '0 auto',
              display: 'flex',
              gap: '4px',
              flexWrap: 'wrap',
            }}>
              <select
                className="form-select"
                style={{
                  flex: '1 1 180px',
                  border: 'none',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                }}
                value={searchArea}
                onChange={e => setSearchArea(e.target.value)}
              >
                <option value="">📍 Select Area</option>
                {bangaloreAreas.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
              <select
                className="form-select"
                style={{
                  flex: '1 1 180px',
                  border: 'none',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                }}
                value={searchType}
                onChange={e => setSearchType(e.target.value)}
              >
                <option value="">🏠 Property Type</option>
                {propertyTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="🔍 Search area, locality..."
                className="form-input"
                style={{
                  flex: '2 1 200px',
                  border: 'none',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                }}
              />
              <Link href={`/properties?area=${searchArea}&type=${searchType}`} className="btn btn-primary btn-lg" style={{
                flex: '0 0 auto',
                borderRadius: 'var(--radius-lg)',
                padding: '14px 32px',
                textDecoration: 'none',
              }}>
                Search
              </Link>
            </div>

            {/* Quick Tags */}
            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '20px',
            }}>
              <span style={{ fontSize: '0.813rem', color: 'var(--text-tertiary)' }}>Popular:</span>
              {['PG in Koramangala', 'Hostel in Whitefield', 'Co-Living in Indiranagar', 'Flat in HSR Layout'].map(tag => (
                <Link key={tag} href={`/properties?area=${tag.split(' in ')[1].toLowerCase().replace(' ', '-')}`} style={{
                  fontSize: '0.813rem',
                  color: 'var(--primary-500)',
                  padding: '4px 12px',
                  background: 'var(--primary-50)',
                  borderRadius: 'var(--radius-full)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}>{tag}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STATS BAR ===== */}
        <section style={{
          padding: '40px 0',
          borderBottom: '1px solid var(--border-light)',
        }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '32px',
              textAlign: 'center',
            }}>
              <StatItem value="10,000+" label="Happy Tenants" emoji="😊" />
              <StatItem value="3,000+" label="Stays Listed" emoji="🏠" />
              <StatItem value="13" label="Areas in Bangalore" emoji="📍" />
              <StatItem value="1,500+" label="Verified Properties" emoji="✅" />
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">How GharStay Works</h2>
            <p className="section-subtitle">Find your perfect rental in 3 simple steps</p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '32px',
              maxWidth: '960px',
              margin: '0 auto',
            }}>
              {[
                { step: '01', icon: '🔍', title: 'Search Properties', desc: 'Browse thousands of verified PGs, flats, and hostels across 8+ cities with smart filters.' },
                { step: '02', icon: '🏠', title: 'Visit & Compare', desc: 'View detailed photos, amenities, reviews, and contact property owners directly.' },
                { step: '03', icon: '🎉', title: 'Book & Move In', desc: 'Book your preferred property online, complete paperwork, and move into your new home!' },
              ].map((item, i) => (
                <div key={i} style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  borderRadius: 'var(--radius-xl)',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-light)',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--primary-gradient)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '4px 14px',
                    borderRadius: 'var(--radius-full)',
                  }}>Step {item.step}</div>
                  <div style={{ fontSize: '2.5rem', marginBottom: '16px', marginTop: '8px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURED PROPERTIES ===== */}
        <section className="section-alt">
          <div className="container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '40px',
              flexWrap: 'wrap',
              gap: '16px',
            }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>Featured Properties</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Handpicked premium properties with the best amenities</p>
              </div>
              <Link href="/properties" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                View All Properties →
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}>
              {featuredProps.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROPERTY TYPES ===== */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">Explore by Property Type</h2>
            <p className="section-subtitle">Find the perfect accommodation that suits your lifestyle</p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              gap: '16px',
              maxWidth: '900px',
              margin: '0 auto',
            }}>
              {propertyTypes.map(type => (
                <Link key={type.id} href={`/properties?type=${type.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    textAlign: 'center',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--primary-300)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ height: '110px', overflow: 'hidden' }}>
                      <img src={type.image} alt={type.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '16px 12px' }}>
                      <h4 style={{ fontSize: '0.938rem', fontWeight: '700', marginBottom: '4px', color: 'var(--text-primary)' }}>{type.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{type.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== POPULAR BANGALORE AREAS ===== */}
        <section className="section-alt">
          <div className="container">
            <h2 className="section-title">Popular Areas in Bangalore</h2>
            <p className="section-subtitle">Explore verified PGs, hostels & apartments across Bangalore's top localities</p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '20px',
            }}>
              {bangaloreAreas.map(area => (
                <Link key={area.id} href={`/properties?area=${area.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = 'var(--primary-200)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                  }}
                  >
                    <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                      <img src={area.image} alt={area.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>{area.name}</h4>
                      <span style={{ fontSize: '0.813rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        📍 Near {area.landmark}
                      </span>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginTop: '12px',
                        borderTop: '1px solid var(--border-light)',
                        paddingTop: '12px'
                      }}>
                        <span style={{ fontSize: '0.813rem', color: 'var(--primary-600)', fontWeight: '700' }}>
                          {area.propertyCount.toLocaleString()}+ Stays
                        </span>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OWNER CTA ===== */}
        <section style={{
          padding: '80px 0',
          background: 'linear-gradient(135deg, #312E81 0%, #4338CA 50%, #6366F1 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}>
              <div>
                <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '16px', color: 'white' }}>
                  Relocating to a New City?
                </h2>
                <p style={{ fontSize: '1.063rem', lineHeight: '1.7', opacity: 0.85, marginBottom: '32px' }}>
                  Get end-to-end support for your move: from digital rental agreements and pre-inspected spaces to moving and cleaning assistance.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link href="/tenant-services" className="btn" style={{
                    background: 'white',
                    color: 'var(--primary-700)',
                    fontWeight: '700',
                    padding: '14px 28px',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    Explore Relocation Support 🧳
                  </Link>
                  <Link href="/properties" className="btn" style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    Browse Stays →
                  </Link>
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}>
                {[
                  { icon: '📜', title: 'Digital Lease', desc: '100% legal, e-signed contracts' },
                  { icon: '🚚', title: 'Moving Help', desc: 'Safe and hassle-free packing' },
                  { icon: '🧹', title: 'Deep Clean', desc: 'Sanitised rooms before move-in' },
                  { icon: '📶', title: 'Pre-fitted WiFi', desc: 'High-speed internet ready to go' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '20px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '8px' }}>{item.icon}</div>
                    <h4 style={{ fontSize: '0.938rem', fontWeight: '700', marginBottom: '4px', color: 'white' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">Trusted by thousands of tenants and property owners</p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}>
              {testimonials.map(t => (
                <div key={t.id} className="card" style={{ padding: '28px', cursor: 'default' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'var(--primary-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.125rem',
                    }}>{t.name.charAt(0)}</div>
                    <div>
                      <h4 style={{ fontSize: '0.938rem', fontWeight: '700' }}>{t.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t.role} • {t.city}</p>
                    </div>
                  </div>
                  <div className="stars" style={{ marginBottom: '12px' }}>
                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', fontStyle: 'italic' }}>
                    "{t.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function StatItem({ value, label, emoji }) {
  return (
    <div>
      <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{emoji}</div>
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.75rem',
        fontWeight: '800',
        color: 'var(--text-primary)',
      }}>{value}</div>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}
