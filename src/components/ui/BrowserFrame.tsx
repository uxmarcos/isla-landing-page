import * as React from "react";
import { Lock } from "lucide-react";

/**
 * Shared macOS-style browser window chrome used across the landing page.
 */
export function BrowserFrame({
  url = "app.isla.to",
  className,
  children,
}: {
  url?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden border border-slate-200 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] dark:border-[#2C2C2C] dark:bg-[#111111] ${className ?? ""}`}
    >
      <div className="relative flex items-center gap-3 border-b border-slate-200 bg-[#F6F6F7] px-4 py-2.5 dark:border-[#2C2C2C] dark:bg-[#1A1A1A]">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#FF5F57]" />
          <span className="size-3 rounded-full bg-[#FEBC2E]" />
          <span className="size-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="mx-auto flex h-7 w-full max-w-[320px] items-center justify-center gap-1.5 rounded-md bg-white text-[12.5px] text-slate-500 shadow-sm dark:bg-[#0A0A0A] dark:text-white/60">
          <Lock className="size-3 text-slate-400 dark:text-white/45" strokeWidth={2.5} />
          {url}
        </div>
        <div className="w-[52px]" />
      </div>
      {children}
    </div>
  );
}

export default BrowserFrame;