import * as React from "react";
import BrowserFrame from "@/components/ui/BrowserFrame";

/**
 * Standard presentation for official product screenshots/mockups:
 * a full-bleed isla-cyan band with the product window sitting inside it.
 */
export function ProductShowcase({
  url = "app.isla.to",
  className,
  frameClassName,
  children,
}: {
  url?: string;
  className?: string;
  frameClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`w-full bg-isla-cyan ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-8 md:px-10 md:pt-14 lg:px-20">
        <BrowserFrame
          url={url}
          className={`rounded-t-2xl border-b-0 shadow-[0_-10px_60px_rgba(0,0,0,0.12)] ${frameClassName ?? ""}`}
        >
          {children}
        </BrowserFrame>
      </div>
    </div>
  );
}

export default ProductShowcase;