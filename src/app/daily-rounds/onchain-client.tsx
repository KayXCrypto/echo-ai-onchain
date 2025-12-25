"use client";

import { useState, useEffect } from 'react';
import DotBackground from "@/components/ui/dot-background";

interface NewToken {
    id: string;
    name: string;
    symbol: string;
    chain: string;
    liquidity: number;
    volume24h: number;
    holders: number;
    listedDays: number;
}

export default function OnchainInsightClient() {
    const [tokens, setTokens] = useState<NewToken[]>([]);
    const [marketMood, setMarketMood] = useState<{ value: number; label: string } | null>(null);
    const [analysisResult, setAnalysisResult] = useState<Record<string, string>>({});
    const [isScanning, setIsScanning] = useState<string | null>(null);

    // 1. Lấy dữ liệu tâm lý thị trường (Fear & Greed Index)
    useEffect(() => {
        fetch('https://api.alternative.me/fng/')
            .then(res => res.json()) // Sửa lỗi .data từ hình ảnh bạn cung cấp
            .then(json => {
                if (json.data && json.data[0]) {
                    setMarketMood({
                        value: parseInt(json.data[0].value),
                        label: json.data[0].value_classification
                    });
                }
            })
            .catch(() => setMarketMood({ value: 50, label: 'Neutral' }));
    }, []);

    // 2. Mock dữ liệu Token mới listing trong 7 ngày
    useEffect(() => {
        const mockTokens: NewToken[] = [
            { id: '1', name: 'ZkSync Native', symbol: 'ZK', chain: 'ZkSync', liquidity: 5000000, volume24h: 12000000, holders: 15400, listedDays: 2 },
            { id: '2', name: 'LayerZero Pro', symbol: 'LZO', chain: 'Ethereum', liquidity: 850000, volume24h: 2100000, holders: 3200, listedDays: 5 },
            { id: '3', name: 'Solana AI Agent', symbol: 'SAI', chain: 'Solana', liquidity: 120000, volume24h: 450000, holders: 850, listedDays: 1 },
        ];
        setTokens(mockTokens);
    }, []);

    // 3. AI Phân tích dữ liệu On-chain
    const runAIScan = async (token: NewToken) => {
        setIsScanning(token.id);
        // Giả lập logic AI đánh giá dựa trên các chỉ số on-chain
        setTimeout(() => {
            let riskScore = token.liquidity < 200000 ? 'CAOR' : 'THẤP';
            let potential = token.volume24h > token.liquidity * 2 ? 'Bùng nổ' : 'Ổn định';

            const report = `[AI Phân tích]: Token ${token.symbol} có tỷ lệ Volume/Liquidity là ${(token.volume24h / token.liquidity).toFixed(1)}x. Tín hiệu dòng tiền: ${potential}. Rủi ro thanh khoản: ${riskScore}. Đánh giá: ${riskScore === 'CAO' ? 'Cẩn thận Rugpull.' : 'Có thể tích lũy.'}`;

            setAnalysisResult(prev => ({ ...prev, [token.id]: report }));
            setIsScanning(null);
        }, 1500);
    };

    return (
        <DotBackground>
            <div className="min-h-screen w-full p-4 md:p-8 flex flex-col gap-6">
                {/* Header với Chỉ số Tâm lý */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                            AI On-chain Intelligence
                        </h1>
                        <p className="text-gray-400 text-sm italic">Quét tín hiệu token mới listing trong 7 ngày</p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                        <div className="text-right">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Market Mood</p>
                            <p className={`text-sm font-black ${marketMood?.value! > 50 ? 'text-green-400' : 'text-red-400'}`}>
                                {marketMood?.label} ({marketMood?.value})
                            </p>
                        </div>
                    </div>
                </div>

                {/* Danh sách Token */}
                <div className="grid grid-cols-1 gap-4">
                    {tokens.map((token) => (
                        <div key={token.id} className="group bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-2xl p-5 transition-all">
                            <div className="flex flex-col lg:flex-row justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white">
                                            {token.symbol[0]}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{token.name} <span className="text-gray-500 text-xs font-normal">({token.symbol})</span></h3>
                                            <p className="text-xs text-blue-400 font-mono">{token.chain} • Niêm yết {token.listedDays} ngày trước</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                                            <p className="text-[10px] text-gray-500 uppercase">Thanh khoản</p>
                                            <p className="text-sm text-white font-mono">${token.liquidity.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                                            <p className="text-[10px] text-gray-500 uppercase">Volume 24h</p>
                                            <p className="text-sm text-white font-mono">${token.volume24h.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                                            <p className="text-[10px] text-gray-500 uppercase">Holders</p>
                                            <p className="text-sm text-white font-mono">{token.holders.toLocaleString()}</p>
                                        </div>
                                        <button
                                            onClick={() => runAIScan(token)}
                                            disabled={isScanning === token.id}
                                            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
                                        >
                                            {isScanning === token.id ? "ĐANG QUÉT DỮ LIỆU..." : "AI ANALYZE"}
                                        </button>
                                    </div>
                                </div>

                                {/* Khu vực hiển thị kết quả AI */}
                                <div className={`lg:w-1/3 min-h-[100px] rounded-2xl p-4 transition-all duration-500 ${analysisResult[token.id] ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-white/5 border border-dashed border-white/10 flex items-center justify-center'}`}>
                                    {analysisResult[token.id] ? (
                                        <div className="animate-in fade-in slide-in-from-bottom-2">
                                            <div className="flex items-center gap-2 mb-2 text-blue-400">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11H9v2h2V7zm0 4H9v2h2v-2z" /></svg>
                                                <span className="text-[10px] font-bold uppercase tracking-tighter">AI On-chain Report</span>
                                            </div>
                                            <p className="text-xs text-gray-300 leading-relaxed font-medium">
                                                {analysisResult[token.id]}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-600 italic">Click AI Analyze để nhận định tiềm năng</p>
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