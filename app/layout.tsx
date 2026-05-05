import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Caprice des Îles — Restaurant Gastronomique Créole · Baillif, Guadeloupe',
  description: 'Restaurant Caprice des Îles à Baillif, Guadeloupe. Cuisine créole raffinée, fruits de mer, langouste grillée. Réservation : +590 590 81 74 97',
  keywords: 'restaurant guadeloupe, cuisine créole, caprice des îles, baillif, langouste, colombo, accras',
  authors: [{ name: 'Chrisnaël Berdier' }],
  openGraph: {
    title: 'Caprice des Îles — Saveurs authentiques des Antilles',
    description: 'Cuisine créole raffinée au cœur de Baillif, Guadeloupe',
    type: 'website',
    locale: 'fr_FR',
  },
  icons: {
    icon: [
      { url: '/img/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/img/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#020D1C',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
