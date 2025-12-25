'use client';

import { EchoAccount } from '@/components/echo-account-next';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { MobileNav } from './mobile-nav';

interface HeaderProps {
  title?: string;
  className?: string;
  showEchoAccount?: boolean;
}

const Header: FC<HeaderProps> = ({
  title = 'My App',
  className = '',
  showEchoAccount = false,
}) => {

  return (
    <header
      className={`border-white/[0.2] border-b bg-black shadow-sm ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/dark.svg"
              alt="AI Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <h1 className="font-semibold text-white text-xl">
              <span className="hidden md:inline">{title}</span>
              <span className="md:hidden">Analysis On-chain</span>
            </h1>
          </Link>

          {/* Desktop and Mobile Navigation */}
          <div className="flex items-center gap-4">
            {showEchoAccount && <EchoAccount />}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
