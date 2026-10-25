import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/bazardor-types";

const unitLabels: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  dozen: "প্রতি ডজন",
};

const formatBengaliNumber = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

// Shared clickable product card used by the catalog and price-trend sections.
const ProductCard = ({ product }: { product: Product }) => {
  const changeStyles = {
    up: {
      badge: "bg-red-50 text-red-700 ring-red-100",
      label: "দাম বেড়েছে",
      TrendIcon: ArrowUp,
    },
    down: {
      badge: "bg-green-50 text-green-700 ring-green-100",
      label: "দাম কমেছে",
      TrendIcon: ArrowDown,
    },
    flat: {
      badge: "bg-gray-100 text-gray-600 ring-gray-200",
      label: "দাম অপরিবর্তিত",
      TrendIcon: Minus,
    },
  }[product.change.dir];
  const TrendIcon = changeStyles.TrendIcon;

  return (
    <Link
      href={`/product/${encodeURIComponent(String(product.id))}`}
      aria-label={`${product.nameBn}, বিস্তারিত দেখুন`}
      className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
    >
      <article className="group flex h-full min-w-0 flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm shadow-gray-900/5 transition duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-lg hover:shadow-green-900/5 motion-reduce:transition-none motion-reduce:hover:transform-none sm:p-5">
        {/* Product image, name, and unit */}
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl transition-colors group-hover:bg-green-100 sm:h-16 sm:w-16"
          >
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
              {product.nameBn}
            </h3>
            <p className="mt-0.5 text-sm text-gray-500">
              {unitLabels[product.unit.toLowerCase()] ?? `প্রতি ${product.unit}`}
            </p>
          </div>
        </div>

        {/* Current price and consistent direction icon/badge */}
        <div className="mt-4 flex flex-1 items-end justify-between gap-2 border-t border-gray-100 pt-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500 sm:text-sm">
              আজকের দাম
            </p>
            <p className="mt-1 whitespace-nowrap text-xl font-black tracking-tight text-gray-950 sm:text-2xl">
              {formatBengaliNumber.format(product.today)}
              <span className="ml-1 text-sm font-semibold text-gray-600">
                টাকা
              </span>
            </p>
          </div>

          <span
            className={`inline-flex shrink-0 flex-col items-center rounded-xl px-2 py-1.5 text-xs font-bold ring-1 sm:px-2.5 ${changeStyles.badge}`}
            aria-label={`${changeStyles.label} ${formatBengaliNumber.format(Math.abs(product.change.pct))} শতাংশ`}
          >
            <span className="inline-flex items-center gap-1">
              <TrendIcon aria-hidden="true" className="h-3.5 w-3.5" />
              {formatBengaliNumber.format(Math.abs(product.change.pct))}%
            </span>
            <span className="mt-0.5 text-[10px] font-medium">
              {changeStyles.label}
            </span>
          </span>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
