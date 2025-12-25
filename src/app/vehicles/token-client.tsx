"use client";

import { useState, useEffect } from 'react';
import DotBackground from "@/components/ui/dot-background";

interface TokenListing {
    id: string;
    name: string;
    symbol: string;
    network: string;
    launchDate: string;
    volume24h: number;
    marketCap: number;
    liquidity: number;
}

export default function TokenIntelligenceClient() {
    const [tokens, setTokens] = useState<TokenListing[]>([]);
    const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});
    const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);

    // Giả lập dữ liệu Token mới trong 7 ngày
    useEffect(() => {
        const fetchNewTokens = () => {
            const mockData: TokenListing[] = [
                { id: 't1', name: 'ZkSync Era Token', symbol: 'ZK', network: 'ZkSync', launchDate: '2024-05-18', volume24h: 12000000, marketCap: 450000000, liquidity: 5000000 },
                { id: 't2', name: 'Aether Protocol', symbol: 'AETH', network: 'Ethereum', launchDate: '2024-05-20', volume24h: 850000, marketCap: 2000000, liquidity: 150000 },
                { id: 't3', name: 'Solana Meme King', symbol: 'SMK', network: 'Solana', launchDate: '2024-05-22', volume24h: 4500000, marketCap: 1200000, liquidity: 80000 },
            ];
            setTokens(mockData);
        };
        fetchNewTokens();
    }, []);

    const handleAIAnalyze = async (token: TokenListing) => {
        setIsAnalyzing(token.id);
        // Giả lập gọi AI phân tích
        setTimeout(() => {
            const scoring = Math.floor(Math.random() * 40) + 50; // Điểm ngẫu nhiên 50-90
            const report = `[Phân tích AI]: Token ${token.symbol} có thanh khoản chiếm ${(token.liquidity / token.marketCap * 100).toFixed(1)}% vốn hóa. Tín hiệu mạng lưới ${token.network} đang tốt. Điểm tiềm năng: ${scoring}/100. Lưu ý: ${token.volume24h > 1000000 ? 'Volume cao, có thể scalping.' : 'Thanh khoản thấp, cẩn thận trượt giá.'}`;
            setAiAnalysis(prev => ({ ...prev, [token.id]: report }));
            setIsAnalyzing(null);
        }, 1200);
    };

    return (
        <DotBackground>
            <div className="min-h-screen w-full p-4 md:p-8 flex flex-col gap-8">
                {/* Header */}
                <div className="max-w-6xl mx-auto w-full">
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                        TOKEN <span className="text-blue-500">INTELLIGENCE</span>
                    </h1>
                    <p className="text-gray-400">Danh sách token mới listing (7 ngày qua) và đánh giá rủi ro bằng AI</p>
                </div>

                {/* Token List */}
                <div className="max-w-6xl mx-auto w-full grid gap-4">
                    {tokens.map((token) => (
                        <div key={token.id} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Info */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold">
                                                {token.symbol[0]}
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-white">{token.name}</h2>
                                                <div className="flex gap-2">
                                                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-mono">{token.symbol}</span>
                                                    <span className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded">{token.network}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Ngày Listing</p>
                                            <p className="text-sm text-gray-200 font-mono">{token.launchDate}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="bg-white/5 p-3 rounded-lg">
                                            <p className="text-[10px] text-gray-500 uppercase">Volume 24h</p>
                                            <p className="text-white font-semibold">${token.volume24h.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-white/5 p-3 rounded-lg">
                                            <p className="text-[10px] text-gray-500 uppercase">Market Cap</p>
                                            <p className="text-white font-semibold">${token.marketCap.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-white/5 p-3 rounded-lg flex flex-col justify-center">
                                            <button
                                                onClick={() => handleAIAnalyze(token)}
                                                disabled={isAnalyzing === token.id}
                                                className="w-full py-2 bg-white text-black text-xs font-bold rounded-md hover:bg-blue-400 hover:text-white transition-all disabled:opacity-50"
                                            >
                                                {isAnalyzing === token.id ? "ĐANG QUÉT..." : "AI SCAN TIỀM NĂNG"}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Result Area */}
                                <div className={`lg:w-80 rounded-xl p-4 transition-all ${aiAnalysis[token.id] ? 'bg-blue-600/10 border border-blue-500/30' : 'bg-white/5 border border-dashed border-white/10 flex items-center justify-center'}`}>
                                    {aiAnalysis[token.id] ? (
                                        <div className="animate-in fade-in zoom-in duration-300">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">AI Audit Report</span>
                                            </div>
                                            <p className="text-xs text-gray-300 leading-relaxed italic">
                                                {aiAnalysis[token.id]}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-[10px] text-gray-600 uppercase text-center">Chưa có dữ liệu phân tích</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DotBackground>
    );
}