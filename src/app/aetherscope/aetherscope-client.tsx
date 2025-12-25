"use client";

import { useState, useEffect, useRef } from 'react';
import DotBackground from "@/components/ui/dot-background";

interface MarketData {
  value: number;
  value_classification: string;
  timestamp: string;
}

export default function MarketInsightClient() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lấy dữ liệu Fear & Greed Index
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const res = await fetch('https://api.alternative.me/fng/');

        // Sửa lỗi: Sử dụng .json() thay vì .data
        const json = await res.json();

        if (json && json.data && json.data[0]) {
          setMarketData({
            value: parseInt(json.data[0].value),
            value_classification: json.data[0].value_classification,
            timestamp: json.data[0].timestamp
          });
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu thị trường:", err);
        // Dữ liệu dự phòng nếu API lỗi hoặc bị chặn (CORS)
        setMarketData({
          value: 50,
          value_classification: 'Neutral',
          timestamp: Date.now().toString()
        });
      }
    };
    fetchMarketData();
  }, []);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatInput('');
    setIsLoading(true);

    // Giả lập phản hồi từ AI (Bạn có thể thay bằng fetch tới API OpenAI/Gemini của bạn)
    setTimeout(() => {
      const aiResponse = `Dựa trên chỉ số Fear & Greed hiện tại là ${marketData?.value} (${marketData?.value_classification}), thị trường đang có tâm lý ${marketData?.value_classification.toLowerCase()}. Bạn nên cẩn trọng với các vị thế đòn bẩy cao.`;
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  const getGaugeColor = (value: number) => {
    if (value < 25) return 'text-red-500';
    if (value < 45) return 'text-orange-400';
    if (value < 55) return 'text-yellow-400';
    if (value < 75) return 'text-green-400';
    return 'text-green-600';
  };

  return (
    <DotBackground>
      <div className="h-screen w-full p-4 md:p-8 flex flex-col gap-6 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
          <div>
            <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              AetherScope Market Analysis
            </h1>
            <p className="text-gray-400 text-sm">Phân tích tâm lý thị trường thời gian thực</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          {/* Cột trái: Chỉ số Fear & Greed */}
          <div className="lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <h3 className="text-white font-semibold mb-8">Fear & Greed Index</h3>

              <div className="relative flex items-center justify-center">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                  <circle
                    cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent"
                    strokeDasharray={502.4}
                    strokeDashoffset={502.4 - (502.4 * (marketData?.value || 0)) / 100}
                    className={`${getGaugeColor(marketData?.value || 0)} transition-all duration-1000`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-black ${getGaugeColor(marketData?.value || 0)}`}>
                    {marketData?.value || '--'}
                  </span>
                  <span className="text-gray-400 text-sm font-medium mt-1 uppercase tracking-widest">
                    {marketData?.value_classification}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 text-sm">Phân tích nhanh</h3>
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-xs text-gray-400 mb-1">Trạng thái:</p>
                  <p className="text-sm text-gray-200">
                    {marketData?.value! > 50
                      ? "Dòng tiền đang đổ vào thị trường mạnh mẽ. Cảnh báo hưng phấn quá đà."
                      : "Thị trường đang lo sợ. Đây có thể là cơ hội tích lũy tài sản giá rẻ."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cột phải: Chat AI */}
          <div className="lg:w-2/3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-white">AI Market Strategist</span>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm italic">
                  Hãy hỏi tôi bất cứ điều gì về thị trường hôm nay...
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white/10 text-gray-200 border border-white/10 rounded-tl-none'
                    }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none animate-pulse text-gray-400 text-xs">
                    AI đang suy nghĩ...
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-black/20 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Hỏi về xu hướng BTC, ETH..."
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9-2-9-18-9 18 9 2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DotBackground>
  );
}