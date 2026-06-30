'use client';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import AuthModal from '@/components/AuthModal';
import { properties, cities, propertyTypes, bangaloreAreas } from '@/data/properties';

function FilterContent({ selectedArea, setSelectedArea, selectedType, setSelectedType, selectedGender, setSelectedGender, priceRange, setPriceRange, verifiedOnly, setVerifiedOnly, resetFilters }) {
  return (
    <>
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
    </>
  );
}

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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeFilterCount = [
    selectedArea !== '',
    selectedType !== '',
    selectedGender !== 'all',
    priceRange !== 30000,
    verifiedOnly,
  ].filter(Boolean).length;

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

  const filterProps = {
    selectedArea, setSelectedArea,
    selectedType, setSelectedType,
    selectedGender, setSelectedGender,
    priceRange, setPriceRange,
    verifiedOnly, setVerifiedOnly,
    resetFilters,
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
            
            {/* Desktop Sidebar Filters - hidden on mobile */}
            <aside className="properties-sidebar" style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <FilterContent {...filterProps} />
            </aside>

            {/* Main Content List */}
            <div>
              {/* Top Controls */}
              <div style={{
                background: 'white',
                padding: '12px 16px',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                marginBottom: '24px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
                {/* Mobile Filter Button - shown only on mobile */}
                <button
                  className="mobile-filter-btn"
                  onClick={() => setMobileFiltersOpen(true)}
                  style={{
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 16px',
                    background: activeFilterCount > 0 ? 'var(--primary-50)' : 'var(--bg-secondary)',
                    border: activeFilterCount > 0 ? '1.5px solid var(--primary-400)' : '1.5px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: activeFilterCount > 0 ? 'var(--primary-600)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="8" y1="12" x2="20" y2="12" />
                    <line x1="12" y1="18" x2="20" y2="18" />
                    <circle cx="6" cy="12" r="2" fill="currentColor" />
                    <circle cx="10" cy="18" r="2" fill="currentColor" />
                  </svg>
                  Filters
                  {activeFilterCount > 0 && (
                    <span style={{
                      background: 'var(--primary-gradient)',
                      color: 'white',
                      borderRadius: 'var(--radius-full)',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.688rem',
                      fontWeight: '700',
                    }}>
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <div style={{ flex: '1 1 200px' }}>
                  <input 
                    type="text" 
                    placeholder="🔍 Search locality, landmark, or area..." 
                    className="form-input" 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Sort:</span>
                  <select 
                    className="form-select" 
                    style={{ width: 'auto', padding: '8px 32px 8px 12px' }}
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-low">Price: Low → High</option>
                    <option value="price-high">Price: High → Low</option>
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

      {/* Mobile Filter Bottom Sheet - Backdrop */}
      {mobileFiltersOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.4)',
            zIndex: 1100,
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}

      {/* Mobile Filter Bottom Sheet - Panel */}
      <div
        className="mobile-filter-sheet"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: '85vh',
          background: 'white',
          borderRadius: '20px 20px 0 0',
          zIndex: 1200,
          transform: mobileFiltersOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: mobileFiltersOpen ? '0 -8px 32px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        {/* Handle bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '12px 0 4px',
        }}>
          <div style={{
            width: '40px',
            height: '4px',
            background: 'var(--gray-300)',
            borderRadius: '2px',
          }} />
        </div>

        {/* Sheet Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 20px 16px',
          borderBottom: '1px solid var(--border-light)',
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Filters</h3>
          <button
            onClick={() => setMobileFiltersOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-secondary)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
            }}
          >
            ✕
          </button>
        </div>

        {/* Sheet Body - scrollable */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
        }}>
          <FilterContent {...filterProps} />
        </div>

        {/* Sheet Footer - Apply button */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          gap: '12px',
          background: 'white',
        }}>
          <button 
            onClick={resetFilters}
            className="btn btn-outline"
            style={{ flex: 1 }}
          >
            Reset
          </button>
          <button 
            onClick={() => setMobileFiltersOpen(false)}
            className="btn btn-primary"
            style={{ flex: 2 }}
          >
            Show {filteredProperties.length} Results
          </button>
        </div>
      </div>

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
        .mobile-filter-btn {
          display: none;
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
