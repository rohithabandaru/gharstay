import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'GharStay — Find Your Perfect Rental Home',
  description: 'GharStay connects tenants with property owners. Search PGs, Hostels, Flats, Apartments & Co-Living spaces across Delhi, Mumbai, Bangalore, Hyderabad, Pune, Chennai, Kolkata & Jaipur.',
  keywords: 'PG, rental, hostel, flat, apartment, co-living, paying guest, rent house, accommodation',
  openGraph: {
    title: 'GharStay — Find Your Perfect Rental Home',
    description: 'India\'s trusted rental property marketplace. Find verified PGs, Hostels, Flats & more.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
