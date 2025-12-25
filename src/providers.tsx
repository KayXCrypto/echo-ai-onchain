'use client';

import { EchoProvider } from '@merit-systems/echo-react-sdk';

console.log('ECHO APP ID:', process.env.NEXT_PUBLIC_ECHO_APP_ID);
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EchoProvider config={{ appId: process.env.NEXT_PUBLIC_ECHO_APP_ID! }}>
      {children}
    </EchoProvider>
  );
}
