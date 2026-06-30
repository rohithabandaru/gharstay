'use client';
import Link from 'next/link';
import { amenitiesList } from '@/data/properties';

export default function PropertyCard({ property }) {
  const amenityIcons = (property.amenities || []).slice(0, 4).map(id => {
    const a = amenitiesList.find(am => am.id === id);
    return a ? a : { icon: '•', name: id };
  });

  const genderColors = {
    male: { bg: '#EFF6FF', color: '#2563EB', label: 'Male' },
    female: { bg: '#FDF2F8', color: '#DB2777', label: 'Female' },
    unisex: { bg: '#F0FDF4', color: '#16A34A', label: 'Unisex' },
  };

  const genderStyle = genderColors[property.gender] || genderColors.unisex;
  const rent = property.rent || property.price || 10000;
  const mainImg = property.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';

  return (
    <Link href={`/properties/${property.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card" style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
        {/* Featured Ribbon */}
        {property.featured && <div className="featured-ribbon">⭐ FEATURED</div>}

        {/* Real Property Image */}
        <div style={{
          position: 'relative',
          height: '200px',
          overflow: 'hidden',
          background: 'var(--gray-200)',
        }}>
          <img 
            src={mainImg} 
            alt={property.title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }} 
          />

          {/* Type Badge */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(4px)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.688rem',
            fontWeight: '700',
            color: 'var(--primary-600)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            boxShadow: 'var(--shadow-sm)',
          }}>
            {property.type === 'co-living' ? 'Co-Living' : property.type?.charAt(0).toUpperCase() + property.type?.slice(1)}
          </div>

          {/* Gender Badge */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: genderStyle.bg,
            color: genderStyle.color,
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.688rem',
            fontWeight: '600',
            boxShadow: 'var(--shadow-sm)',
          }}>
            {genderStyle.label}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 20px 20px' }}>
          {/* Title */}
          <h3 style={{
            fontSize: '1.063rem',
            fontWeight: '700',
            marginBottom: '4px',
            lineHeight: '1.3',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {property.title}
          </h3>

          {/* Location */}
          <p style={{
            fontSize: '0.813rem',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
          }}>
            📍 {property.area}, {property.city ? property.city.charAt(0).toUpperCase() + property.city.slice(1) : 'City'}
          </p>

          {/* Room & Furnishing */}
          <div style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '12px',
            flexWrap: 'wrap',
          }}>
            <span className="tag">{property.roomType || 'Private Room'}</span>
            <span className="tag">{property.furnishing || 'Furnished'}</span>
          </div>

          {/* Amenities */}
          <div style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}>
            {amenityIcons.map((a, i) => (
              <span key={i} style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}>
                {a.icon} {a.name}
              </span>
            ))}
            {(property.amenities || []).length > 4 && (
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-500)', fontWeight: '600' }}>
                +{(property.amenities || []).length - 4} more
              </span>
            )}
          </div>

          {/* Bottom Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-light)',
          }}>
            {/* Price */}
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.375rem',
                fontWeight: '800',
                color: 'var(--primary-600)',
              }}>
                ₹{rent.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '0.813rem', color: 'var(--text-tertiary)' }}>/month</span>
            </div>

            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.813rem',
            }}>
              <span style={{ color: 'var(--accent-400)' }}>★</span>
              <span style={{ fontWeight: '600' }}>{property.rating || 4.5}</span>
              <span style={{ color: 'var(--text-tertiary)' }}>({property.reviews || 50})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
