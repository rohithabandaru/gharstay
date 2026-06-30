'use client';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export default function NotFound() {
  return (
    <PageShell>
      <main style={{
        paddingTop: '120px',
        paddingBottom: '80px',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-secondary)',
      }}>
        <div style={{
          textAlign: 'center',
          background: 'white',
          padding: '48px',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: '480px',
          width: '90%',
          margin: '0 auto',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🗺️</div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2rem',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}>
            Stray Stay? 404
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.938rem',
            lineHeight: '1.6',
            marginBottom: '24px',
          }}>
            Oops! The page you are looking for doesn't exist. It might have been moved or deleted.
          </p>
          <Link href="/" className="btn btn-primary btn-lg" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Back to Safe Haven 🏠
          </Link>
        </div>
      </main>
    </PageShell>
  );
}
