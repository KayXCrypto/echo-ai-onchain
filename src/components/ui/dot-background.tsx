import { cn } from "@/lib/utils";
import React from "react";

export default function DotBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
