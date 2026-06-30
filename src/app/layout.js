import './globals.css';

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
