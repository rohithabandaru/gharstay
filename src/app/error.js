'use client';
import { useEffect } from 'react';
import PageShell from '@/components/PageShell';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to console
    console.error(error);
  }, [error]);

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
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>⚠️</div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2rem',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}>
            Something went wrong!
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.938rem',
            lineHeight: '1.6',
            marginBottom: '24px',
          }}>
            An unexpected error occurred while loading this page. Our technical team has been notified.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={() => reset()} className="btn btn-primary btn-lg">
              Try Again 🔄
            </button>
            <a href="/" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>
              Go Home 🏠
            </a>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
