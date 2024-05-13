import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthContext } from '@/context/AutxContext';

import './globals.css';
import { CONFIG } from './config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: CONFIG.appTitle,
  description: CONFIG.appDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
