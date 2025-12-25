"use client";

import Link from "next/link";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import DotBackground from "@/components/ui/dot-background";
import APODCard from "@/components/nasa/apod-card";
import OnchainInsightClient from "@/components/daily-rounds/daily-rounds-cta";
import { ArrowRight, MessageSquare, Telescope, Rocket, FileText, Image as ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import TradingViewWidget from "@/components/tradingview/TradingViewWidget";

export default function Home() {
  return (
    <DotBackground>
      <div className="h-full w-full overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 py-8 md:py-12">
            <motion.h1
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #4c1d95, #7c3aed, #a855f7, #ffffff, #f9a8d4, #f472b6, #db2777)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              Analysis On-chain
            </motion.h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
              Instant Intelligence for the On-chain Frontier
            </p>
          </div>

          {/* Featured APOD */}
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Analysis On-chain
              </h2>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors group shrink-0"
              >
                <span className="text-sm md:text-base">View Archive</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <BentoGrid className="md:auto-rows-[400px]">
              <BentoGridItem
                title=""
                description=""
                header={<TradingViewWidget />}
                className="md:col-span-3"
              />
            </BentoGrid>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Reports Card */}
            <Link href="/reports">
              <div className="group relative overflow-hidden rounded-xl border border-white/[0.2] bg-black hover:bg-white/[0.05] transition-all duration-300 p-6 md:p-8 h-full">
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-white/[0.05] text-white">
                        <FileText className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        Top Trending
                      </h3>
                    </div>
                    <p className="text-neutral-400 text-sm md:text-base">
                      Real-time top growth data
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300 group-hover:text-white mt-4 group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">View Reports</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Chat Card */}
            <Link href="/chat">
              <div className="group relative overflow-hidden rounded-xl border border-white/[0.2] bg-black hover:bg-white/[0.05] transition-all duration-300 p-6 md:p-8 h-full">
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-white/[0.05] text-white">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        AI Analysis
                      </h3>
                    </div>
                    <p className="text-neutral-400 text-sm md:text-base">
                      Leverage AI chat to explore data, ask analytical questions, and receive actionable insights instantly
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300 group-hover:text-white mt-4 group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Start Chatting</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* AetherScope Card */}
            <Link href="/aetherscope">
              <div className="group relative overflow-hidden rounded-xl border border-white/[0.2] bg-black hover:bg-white/[0.05] transition-all duration-300 p-6 md:p-8 h-full">
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-white/[0.05] text-white">
                        <Telescope className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        Fear and Greed Index
                      </h3>
                    </div>
                    <p className="text-neutral-400 text-sm md:text-base">
                      From AI-powered market sentiment indicators
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300 group-hover:text-white mt-4 group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Market sentiment</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Vehicles Card */}
            <Link href="/vehicles">
              <div className="group relative overflow-hidden rounded-xl border border-white/[0.2] bg-black hover:bg-white/[0.05] transition-all duration-300 p-6 md:p-8 h-full">
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-white/[0.05] text-white">
                        <Rocket className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        Newly listed token
                      </h3>
                    </div>
                    <p className="text-neutral-400 text-sm md:text-base">
                      Analysis of newly listed tokens
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300 group-hover:text-white mt-4 group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Track Listing</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Daily Bulletin CTA */}
          <OnchainInsightClient />
        </div>
      </div>
    </DotBackground>
  );
}