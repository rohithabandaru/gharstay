'use client';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import AuthModal from '@/components/AuthModal';
import { properties, cities, propertyTypes, bangaloreAreas } from '@/data/properties';

function PropertyListingContent() {
  const searchParams = useSearchParams();
  const initialArea = searchParams.get('area') || '';
  const initialType = searchParams.get('type') || '';

  const [authOpen, setAuthOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(initialArea);
  const [selectedType, setSelectedType] = useState(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('all');
  const [priceRange, setPriceRange] = useState(30000);
  const [sortBy, setSortBy] = useState('featured');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const propRent = p.rent || p.price || 0;
      if (selectedArea && p.area.toLowerCase() !== selectedArea.toLowerCase()) return false;
      if (selectedType && p.type !== selectedType) return false;
      if (selectedGender !== 'all' && p.gender !== selectedGender && p.gender !== 'unisex') return false;
      if (propRent > priceRange) return false;
      if (verifiedOnly && !p.verified) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchLoc = (p.address || '').toLowerCase().includes(q);
        const matchArea = (p.area || '').toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchArea) return false;
      }
      return true;
    }).sort((a, b) => {
      const rentA = a.rent || a.price || 0;
      const rentB = b.rent || b.price || 0;
      if (sortBy === 'price-low') return rentA - rentB;
      if (sortBy === 'price-high') return rentB - rentA;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedArea, selectedType, selectedGender, priceRange, verifiedOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedArea('');
    setSelectedType('');
    setSelectedGender('all');
    setPriceRange(30000);
    setSearchQuery('');
    setVerifiedOnly(false);
    setSortBy('featured');
  };

  return (
    <>
      <Navbar onAuthClick={() => setAuthOpen(true)} />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

      <main style={{ paddingTop: '80px', minHeight: '80vh', background: 'var(--bg-secondary)' }}>
        {/* Header */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-light)', padding: '32px 0' }}>
          <div className="container">
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>
              Explore Properties {selectedArea ? `in ${bangaloreAreas.find(a => a.id.toLowerCase() === selectedArea.toLowerCase())?.name || selectedArea}` : 'in Bangalore'}
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Showing {filteredProperties.length} verified rental properties available for instant booking
            </p>
          </div>
        </div>

        <div className="container" style={{ padding: '32px 16px' }}>
          <div className="properties-layout" style={{ display: 'grid', gap: '24px', alignItems: 'start' }}>
            
            {/* Sidebar Filters */}
            <aside className="properties-sidebar" style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Filters</h3>
                <button 
                  onClick={resetFilters}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-600)', fontSize: '0.813rem', fontWeight: '600', cursor: 'pointer' }}
                >
                  Reset All
                </button>
              </div>

              {/* Area Filter */}
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">Area / Locality</label>
                <select className="form-select" value={selectedArea} onChange={e => setSelectedArea(e.target.value)}>
                  <option value="">All Areas</option>
                  {bangaloreAreas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>

              {/* Type Filter */}
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">Property Type</label>
                <select className="form-select" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                  <option value="">All Types</option>
                  {propertyTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>

              {/* Gender Preferred */}
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">Preferred Tenant</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: 'all', label: 'Any / All' },
                    { id: 'male', label: 'Boys / Men 👦' },
                    { id: 'female', label: 'Girls / Women 👧' },
                    { id: 'unisex', label: 'Co-Living / Unisex 👫' },
                  ].map(g => (
                    <label key={g.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', cursor: 'pointer', color: 'var(--text-primary)' }}>
                      <input 
                        type="radio" 
                        name="gender" 
                        checked={selectedGender === g.id} 
                        onChange={() => setSelectedGender(g.id)}
                      />
                      {g.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Max Budget</label>
                  <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--primary-600)' }}>
                    ₹{priceRange.toLocaleString()}/mo
                  </span>
                </div>
                <input 
                  type="range" 
                  min="3000" 
                  max="50000" 
                  step="1000" 
                  value={priceRange} 
                  onChange={e => setPriceRange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary-600)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  <span>₹3,000</span>
                  <span>₹50,000+</span>
                </div>
              </div>

              {/* Verified Filter */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', cursor: 'pointer', fontWeight: '600' }}>
                  <input 
                    type="checkbox" 
                    checked={verifiedOnly} 
                    onChange={e => setVerifiedOnly(e.target.checked)}
                  />
                  Featured Properties ⭐
                </label>
              </div>
            </aside>

            {/* Main Content List */}
            <div>
              {/* Top Controls */}
              <div style={{
                background: 'white',
                padding: '16px 20px',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                marginBottom: '24px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
                <div style={{ flex: '1 1 240px' }}>
                  <input 
                    type="text" 
                    placeholder="🔍 Search locality, landmark, or area..." 
                    className="form-input" 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', whitespace: 'nowrap' }}>Sort By:</span>
                  <select 
                    className="form-select" 
                    style={{ width: 'auto', padding: '8px 32px 8px 12px' }}
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Grid of Results */}
              {filteredProperties.length > 0 ? (
                <div className="properties-grid" style={{
                  display: 'grid',
                  gap: '24px',
                }}>
                  {filteredProperties.map(p => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              ) : (
                <div style={{
                  background: 'white',
                  borderRadius: 'var(--radius-xl)',
                  padding: '64px 24px',
                  textAlign: 'center',
                  border: '1px solid var(--border-light)',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No Properties Found</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    Try adjusting your search filters or selected city to find available stays.
                  </p>
                  <button onClick={resetFilters} className="btn btn-primary">
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .properties-layout {
          grid-template-columns: 280px 1fr;
        }
        .properties-sidebar {
          position: sticky;
          top: 100px;
        }
        .properties-grid {
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
        @media (max-width: 1024px) {
          .properties-layout {
            grid-template-columns: 240px 1fr;
          }
        }
        @media (max-width: 768px) {
          .properties-layout {
            grid-template-columns: 1fr;
          }
          .properties-sidebar {
            position: static;
          }
          .properties-grid {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          }
        }
        @media (max-width: 480px) {
          .properties-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div>Loading properties...</div>}>
      <PropertyListingContent />
    </Suspense>
  );
}
