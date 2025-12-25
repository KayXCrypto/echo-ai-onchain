'use client';

import { EchoAccount } from '@/components/echo-account-next';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { MobileNav } from './mobile-nav';
import { Activity, ShieldCheck, Cpu } from 'lucide-react';

interface HeaderProps {
  title?: string;
  className?: string;
  showEchoAccount?: boolean;
}

const Header: FC<HeaderProps> = ({
  title = 'Analysis On-chain AI',
  className = '',
  showEchoAccount = true,
}) => {

  return (
    <header
      className={`sticky top-0 z-[100] w-full border-b border-white/10 bg-black/80 backdrop-blur-xl ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo & Brand Section */}
          <Link href="/" className="flex items-center gap-4 group transition-all">
            <div className="relative h-10 w-10">
              {/* Hiệu ứng hào quang cho logo */}
              <div className="absolute inset-0 bg-blue-500/20 blur-xl group-hover:bg-blue-500/40 transition-all rounded-full" />
              <Image
                src="/dark.svg" // Đường dẫn logo của bạn
                alt="AI Sentinel Logo"
                fill
                className="object-contain relative z-10"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-white tracking-tighter uppercase italic leading-none">
                AI <span className="text-blue-500">SENTINEL</span>
              </h1>
              <p className="text-[9px] text-neutral-500 font-bold tracking-[0.2em] mt-1 uppercase hidden sm:block">
                {title}
              </p>
            </div>
          </Link>

          {/* Central Navigation (Chỉ hiện trên Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/10">
            <Link href="#" className="text-[10px] font-bold text-blue-400 hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
              <Activity className="w-3 h-3 animate-pulse" /> Live Terminal
            </Link>
            <div className="w-[1px] h-3 bg-white/10" />
            <Link href="#" className="text-[10px] font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldCheck className="w-3 h-3" /> AI Audit
            </Link>
          </nav>

          {/* Account & Mobile Nav Section */}
          <div className="flex items-center gap-4">
            {/* Status Indicator (Desktop) */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-500/5 border border-green-500/20 rounded-lg">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">System Operational</span>
            </div>

            <div className="flex items-center gap-3">
              {/* PHẦN KẾT NỐI TÀI KHOẢN GIỐNG CODE MẪU NHƯNG ĐƯỢC DECOR ĐẸP HƠN */}
              {showEchoAccount && (
                <div className="relative group p-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-xl">
                  <div className="bg-[#0A0A0A] rounded-xl flex items-center pr-1 overflow-hidden transition-all group-hover:border-white/20 border border-transparent">
                    {/* Icon CPU bổ trợ phong cách AI */}
                    <div className="pl-3 hidden sm:block border-r border-white/5 mr-1 pr-2">
                      <Cpu className="w-3.5 h-3.5 text-blue-500/70" />
                    </div>
                    <EchoAccount />
                  </div>
                </div>
              )}

              <MobileNav />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;