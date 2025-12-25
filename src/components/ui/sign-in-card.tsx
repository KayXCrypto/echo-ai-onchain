import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SignInButton from '@/app/_components/echo/sign-in-button';

export default function SignInCard() {
  return (
    <Card className="w-full max-w-2xl shadow-lg backdrop-blur-sm bg-white/95 dark:bg-black/95">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="text-2xl font-bold sm:text-3xl">
          Analysis On-chain
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          On-chain data analysis with AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SignInButton />
        <p className="text-center text-gray-500 text-xs dark:text-gray-400">
          Secure authentication with built-in AI billing
        </p>
      </CardContent>
    </Card>
  );
}