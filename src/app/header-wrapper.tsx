'use client';

import Header from '@/app/_components/header';
import { usePathname } from 'next/navigation';

export default function HeaderWrapper() {
  const pathname = usePathname();
  const showEchoAccount =
    pathname === '/chat' || pathname === '/aetherscope';

  return <Header title="AI On-chain" showEchoAccount={showEchoAccount} />;
}
