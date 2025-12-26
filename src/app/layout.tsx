// app/layout.tsx
import './globals.css';
import { Providers } from '@/providers';
import HeaderWrapper from './header-wrapper';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black`}>
        <Providers>
          <HeaderWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}
