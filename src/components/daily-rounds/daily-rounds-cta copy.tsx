"use client";

import { useState, useEffect } from 'react';
import DotBackground from "@/components/ui/dot-background";

interface TokenListing {
  id: string;
  name: string;
  symbol: string;
  chain: string;
  liquidity: number;
  volume24h: number;
  holders: number;
  listedAt: string;
}

export default function OnchainInsightClient() {
  const [tokens, setTokens] = useState<TokenListing[]>([]);
  const [marketMood, setMarketMood] = useState<{ value: number; label: string } | null>(null);
  const [analysis, setAnalysis] = useState<Record<string, string>>({});
  const [isScanning, setIsScanning] = useState<string | null>(null);

  // 1. Fetch Fear & Greed Index
  useEffect(() => {
    const fetchFNG = async () => {
      try {
        const res = await fetch('https://api.alternative.me/fng/');
        const json = await res.json(); // Corrected: .json() instead of .data
        if (json.data && json.data[0]) {
          setMarketMood({
            value: parseInt(json.data[0].value),
            label: json.data[0].value_classification
          });
        }
      } catch (err) {
        setMarketMood({ value: 50, label: 'Neutral' });
      }
    };
    fetchFNG();
  }, []);

  // 2. New Token Listings (Last 7 Days)
  useEffect(() => {
    const mockData: TokenListing[] = [
      { id: '1', name: 'ZkSync Native', symbol: 'ZK', chain: 'ZkSync', liquidity: 5400000, volume24h: 12000000, holders: 45200, listedAt: '2 days ago' },
      { id: '2', name: 'Aether Protocol', symbol: 'AETH', chain: 'Ethereum', liquidity: 850000, volume24h: 2100000, holders: 3200, listedAt: '4 days ago' },
      { id: '3', name: 'Solana AI Agent', symbol: 'SAI', chain: 'Solana', liquidity: 120000, volume24h: 450000, holders: 850, listedAt: '1 day ago' },
      { id: '4', name: 'Base Meme King', symbol: 'BMK', chain: 'Base', liquidity: 45000, volume24h: 900000, holders: 1200, listedAt: '6 days ago' },
    ];
    setTokens(mockData);
  }, []);

  // 3. AI On-chain Analysis Logic
  const runAIAnalysis = (token: TokenListing) => {
    setIsScanning(token.id);

    setTimeout(() => {
      const volToLiq = token.volume24h / token.liquidity;
      let score = 75;
      let risk = "Low";

      if (token.liquidity < 100000) { risk = "High (Low Liquidity)"; score -= 30; }
      if (volToLiq > 5) { risk = "Potential Dump (High Vol/Liq)"; score -= 15; }
      if (token.holders > 10000) { score += 15; }

      const report = `[AI Insights]: ${token.symbol} Trust Score: ${score}/100. ${token.holders > 5000 ? 'Strong community backing.' : 'Niche holder base.'} Risk Level: ${risk}. Verdict: ${score > 60 ? 'Bullish on-chain signals.' : 'Exercise caution, high volatility.'}`;

      setAnalysis(prev => ({ ...prev, [token.id]: report }));
      setIsScanning(null);
    }, 1200);
  };

  return (
    <DotBackground>
      <div className="min-h-screen w-full p-4 md:p-8 flex flex-col gap-6 overflow-x-hidden">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter italic uppercase">
              AI <span className="text-blue-500 underline">On-Chain</span> Intelligence
            </h1>
            <p className="text-gray-400 text-sm italic">New listings (7d) and real-time AI risk assessment</p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 px-5 py-3 rounded-2xl border border-white/5">
            <div className="text-right">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest text-white/50">Market Sentiment</p>
              <p className={`text-lg font-black ${marketMood?.value! > 50 ? 'text-green-400' : 'text-red-400'}`}>
                {marketMood?.label} ({marketMood?.value})
              </p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-white/10 flex items-center justify-center font-bold text-white shadow-inner">
              {marketMood?.value}
            </div>
          </div>
        </div>

        {/* Token List */}
        <div className="grid grid-cols-1 gap-4">
          {tokens.map((token) => (
            <div key={token.id} className="group bg-white/5 hover:bg-white/[0.07] border border-white/10 rounded-2xl p-5 transition-all duration-300">
              <div className="flex flex-col lg:flex-row justify-between gap-6">

                {/* On-chain Metrics */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-black text-xl shadow-lg">
                        {token.symbol[0]}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{token.name}</h2>
                        <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{token.chain}</span>
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-gray-500 uppercase tracking-widest">
                      Listed: <span className="text-gray-200">{token.listedAt}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase">Liquidity</p>
                      <p className="text-sm text-white font-mono">${token.liquidity.toLocaleString()}</p>
                    </div>
                    <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase">24h Volume</p>
                      <p className="text-sm text-white font-mono">${token.volume24h.toLocaleString()}</p>
                    </div>
                    <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase">Total Holders</p>
                      <p className="text-sm text-white font-mono">{token.holders.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => runAIAnalysis(token)}
                      disabled={isScanning === token.id}
                      className="bg-white text-black hover:bg-blue-500 hover:text-white disabled:opacity-50 text-xs font-black rounded-xl transition-all uppercase"
                    >
                      {isScanning === token.id ? "Analyzing..." : "Run AI Scan"}
                    </button>
                  </div>
                </div>

                {/* AI Analysis Result Panel */}
                <div className={`lg:w-1/3 min-h-[120px] rounded-2xl p-4 flex flex-col justify-center transition-all duration-500 ${analysis[token.id] ? 'bg-blue-600/10 border border-blue-500/30' : 'bg-black/20 border border-dashed border-white/10'}`}>
                  {analysis[token.id] ? (
                    <div className="animate-in fade-in slide-in-from-right-2">
                      <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">AI Audit Result</span>
                      </div>
                      <p className="text-[13px] text-gray-300 leading-relaxed italic font-medium">
                        {analysis[token.id]}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center opacity-40">
                      <p className="text-xs text-gray-400 uppercase tracking-widest">Awaiting Analysis</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-auto text-center text-[10px] text-gray-600 uppercase tracking-[0.3em] py-4 border-t border-white/5">
          Secure On-chain Intelligence Hub • Driven by AI
        </p>
      </div>
    </DotBackground>
  );
}