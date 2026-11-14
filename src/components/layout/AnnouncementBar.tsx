"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";

interface AnnouncementBarProps {
  initialText?: string;
}

export function AnnouncementBar({
  initialText = "COMPLIMENTARY SHIPPING ON ORDERS OVER $200 — GLOBAL PRIORITY DISPATCH",
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-brand-dark text-white text-[11px] font-sans tracking-wide uppercase py-2.5 px-4 flex items-center justify-center transition-all z-50">
      <div className="flex items-center space-x-2 text-center overflow-hidden">
        <Sparkles className="w-3 h-3 text-brand-accent animate-pulse shrink-0" />
        <span className="font-medium tracking-luxury">{initialText}</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3.5 text-neutral-400 hover:text-white transition-colors p-1"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

