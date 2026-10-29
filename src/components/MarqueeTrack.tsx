"use client";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import type { Product } from "./Marquee";

const formatBengaliNumber = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

const unitLabels: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  dozen: "ডজন",
};

const MarqueeTrack = ({ products }: { products: Product[] }) => {
  return (
    <div className="relative flex min-w-0 flex-1 items-center overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3 bg-gradient-to-r from-white to-transparent sm:w-6"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 bg-gradient-to-l from-white to-transparent sm:w-6"
      />

      <div className="marquee-content flex min-w-0 flex-1 items-center overflow-hidden">
        {products.length > 0 ? (
          <div className="flex w-max items-center animate-marquee motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex shrink-0 items-center"
              >
                {products.map((product, index) => {
                  const change = Number(product.change?.pct ?? 0);
                  const isDecrease = change < 0;
                  const isIncrease = change > 0;
                  const TrendIcon = isDecrease
                    ? TrendingDown
                    : isIncrease
                      ? TrendingUp
                      : Minus;

                  return (
                    <div
                      key={`${product.id}-${index}`}
                      className="flex shrink-0 items-center gap-1.5 border-r border-emerald-100/80 px-2.5 py-2 sm:gap-2.5 sm:px-5 sm:py-2.5"
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-sm sm:h-8 sm:w-8 sm:rounded-lg sm:bg-white sm:text-base sm:shadow-sm sm:ring-1 sm:ring-emerald-100/80"
                      >
                        {product.categoryIcon}
                      </span>

                      <span className="whitespace-nowrap text-[11px] font-semibold text-slate-600 sm:text-sm">
                        {product.nameBn}
                      </span>

                      <span className="whitespace-nowrap text-xs font-bold tabular-nums text-slate-900 sm:text-base sm:font-extrabold">
                        {formatBengaliNumber.format(product.today)}
                        <span className="ml-1 text-[10px] font-medium text-slate-500 sm:text-xs">
                          টাকা/{unitLabels[product.unit.toLowerCase()] ?? product.unit}
                        </span>
                      </span>

                      <span
                        role="img"
                        aria-label={`দামের পরিবর্তন ${change > 0 ? "বৃদ্ধি" : change < 0 ? "হ্রাস" : "অপরিবর্তিত"} ${formatBengaliNumber.format(Math.abs(change))} শতাংশ`}
                        className={`inline-flex items-center gap-0.5 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[9px] font-bold tabular-nums sm:gap-1 sm:px-2 sm:py-1 sm:text-xs ${
                          isDecrease
                            ? "bg-emerald-100 text-emerald-800"
                            : isIncrease
                              ? "bg-rose-100 text-rose-700"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <TrendIcon
                          aria-hidden="true"
                          size={11}
                          strokeWidth={2.5}
                        />
                        {formatBengaliNumber.format(Math.abs(change))}%
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <p className="px-4 text-xs font-medium text-slate-500 sm:px-6 sm:text-sm">
            বাজারদরের তথ্য এখন পাওয়া যাচ্ছে না।
          </p>
        )}
      </div>
    </div>
  );
};

export default MarqueeTrack;
