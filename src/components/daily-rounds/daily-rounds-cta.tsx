"use client";

import { useState, useEffect } from 'react';
import DotBackground from "@/components/ui/dot-background";
import ChatBotSection from "./ChatBotSection"; // Import thành phần vừa tạo ở trên

export default function CombinedIntelligencePage() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<Record<string, string>>({});
  const [isScanning, setIsScanning] = useState<string | null>(null);

  useEffect(() => {
    // Dữ liệu mẫu từ daily-rounds-ctabk.tsx
    setTokens([
      { id: '1', name: 'ZkSync Native', symbol: 'ZK', chain: 'ZkSync', liquidity: 5400000, volume24h: 12000000, holders: 45200, listedAt: '2 days ago' },
      { id: '2', name: 'Aether Protocol', symbol: 'AETH', chain: 'Ethereum', liquidity: 850000, volume24h: 2100000, holders: 3200, listedAt: '4 days ago' },
    ]);
  }, []);

  const runAIAnalysis = (token: any) => {
    setIsScanning(token.id);
    setTimeout(() => {
      setAnalysis(prev => ({ ...prev, [token.id]: `[AI Audit]: ${token.symbol} Trust Score: 85/100. Strong liquidity.` }));
      setIsScanning(null);
    }, 1000);
  };

  return (
    <DotBackground>
      <div className="flex flex-col lg:flex-row h-screen w-full p-4 gap-4 overflow-hidden">
        
        {/* TRÁI: ON-CHAIN INTELLIGENCE */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
            <h1 className="text-2xl font-black text-white uppercase italic">
              AI <span className="text-blue-500">On-Chain</span> Dashboard
            </h1>
          </div>

          <div className="grid gap-4">
            {tokens.map((token) => (
              <div key={token.id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-white">{token.name} ({token.symbol})</h2>
                  <button 
                    onClick={() => runAIAnalysis(token)}
                    className="bg-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-500 transition-colors"
                  >
                    {isScanning === token.id ? "Scanning..." : "Run AI Audit"}
                  </button>
                </div>
                {analysis[token.id] && (
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-sm text-gray-300 italic">
                    {analysis[token.id]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PHẢI: AI CHAT ASSISTANT */}
        <div className="w-full lg:w-[400px] flex flex-col bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <span className="text-xs font-bold uppercase tracking-tighter text-white">AI Assistant</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatBotSection />
          </div>
        </div>

      </div>
    </DotBackground>
  );
}