'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Home,
  ArrowLeftRight,
  Wallet,
  Coins,
  Layers,
  TrendingUp,
  Bell,
  FileText,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { EchoAccount } from '@/components/echo-account-next';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Onchain Flows', href: '/flows', icon: ArrowLeftRight },
  { name: 'Wallet Intelligence', href: '/wallets', icon: Wallet },
  { name: 'Token Analytics', href: '/tokens', icon: Coins },
  { name: 'Protocols', href: '/protocols', icon: Layers },
  { name: 'Smart Money', href: '/smart-money', icon: TrendingUp },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Research', href: '/research', icon: FileText },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-neutral-300 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[280px] bg-black border-white/[0.2] backdrop-blur-xl"
      >
        <SheetHeader className="border-b border-white/[0.1] pb-4">
          <SheetTitle className="text-white text-left">Navigation</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-2 mt-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${isActive
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-base">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 border-t border-white/[0.1] pt-6">
          <div className="flex flex-col gap-3">
            <p className="text-xs text-neutral-400 uppercase tracking-wider">Account</p>
            <EchoAccount />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
