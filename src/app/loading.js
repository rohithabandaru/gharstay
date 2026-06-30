'use client';

export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-secondary)',
      gap: '16px',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid var(--primary-100)',
        borderTop: '4px solid var(--primary-600)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      <p style={{
        fontFamily: 'var(--font-heading)',
        color: 'var(--text-secondary)',
        fontSize: '1rem',
        fontWeight: '600',
      }}>
        Finding your stays...
      </p>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
