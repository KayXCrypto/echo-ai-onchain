"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        TradingView: any;
    }
}

export default function TradingViewWidget() {
    useEffect(() => {
        // tránh load trùng (StrictMode)
        if (document.getElementById("tradingview-script")) return;

        const script = document.createElement("script");
        script.id = "tradingview-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;

        script.onload = () => {
            if (!window.TradingView) return;

            new window.TradingView.widget({
                container_id: "tradingview_container",
                width: "100%",
                height: "100%",
                symbol: "BTCUSDT",
                interval: "D",
                timezone: "Etc/UTC",
                theme: "dark",
                style: "1",
                locale: "en",
                toolbar_bg: "#000000",
                enable_publishing: false,
                allow_symbol_change: true,
                hide_side_toolbar: false,
                save_image: false,
            });
        };

        document.body.appendChild(script);
    }, []);

    return (
        <div className="w-full h-full min-h-[350px] rounded-xl overflow-hidden">
            <div
                id="tradingview_container"
                className="w-full h-full"
            />
        </div>
    );
}
