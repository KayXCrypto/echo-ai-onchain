"use client";

import { useState } from "react";
import DotBackground from "@/components/ui/dot-background";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Send, Bot, Sparkles, ShieldAlert } from "lucide-react";

import {
  TopGainersByChain,
  TopGainers24h,
  TopGainers30d,
  OnchainMetrics24h,
} from "@/components/onchain-widgets";

// New AI Chatbot Component
function AIChatWidget() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your On-chain AI assistant. How can I help you analyze the market today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: `I've analyzed the on-chain data for your query. Current sentiment is shifting towards "Greed", but watch the liquidity on new ZkSync listings. Would you like a risk report?`
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-blue-500/5">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-white text-sm tracking-tight">AI INTELLIGENCE CHAT</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-gray-400 uppercase font-bold">Live Analysis</span>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-tr-none'
                : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-none'
              }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-black/20">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI about token risks or whale movements..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-400 hover:text-white transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Home() {
  return (
    <DotBackground>
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">

        {/* Title Section with AI Branding */}
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">
              ON-CHAIN <span className="text-blue-500 underline">SENTINEL</span>
            </h1>
            <p className="text-neutral-400 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Real-time market intelligence & AI risk assessment
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span className="text-[10px] font-bold text-red-500 uppercase">High Volatility Alert</span>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <BentoGrid className="md:auto-rows-[360px]">
          {/* Main Chatbot - Now spans the large area */}
          <BentoGridItem
            header={<AIChatWidget />}
            className="md:col-span-2 md:row-span-2 min-h-[720px]"
          />

          <BentoGridItem
            title="Top Gainers by Chain"
            header={<TopGainersByChain />}
          />

          <BentoGridItem
            title="On-chain Metrics (24h)"
            header={<OnchainMetrics24h />}
          />

          <BentoGridItem
            title="Top Gainers 24h"
            header={<TopGainers24h />}
          />

          <BentoGridItem
            title="Top Gainers 30D"
            header={<TopGainers30d />}
          />
        </BentoGrid>
      </div>
    </DotBackground>
  );
}