'use client';
import { useState, createContext, useContext } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

/**
 * Context to allow any child page to trigger the AuthModal.
 * Usage in page: const openAuth = useAuth();
 */
const AuthContext = createContext(() => {});

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * PageShell wraps every page with Navbar, Footer, and AuthModal.
 * This eliminates the duplicated boilerplate across all 13 pages.
 */
export default function PageShell({ children }) {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <AuthContext.Provider value={() => setAuthOpen(true)}>
      <Navbar onAuthClick={() => setAuthOpen(true)} />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      {children}
      <Footer />
    </AuthContext.Provider>
  );
}
