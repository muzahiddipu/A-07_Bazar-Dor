import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUp, Minus } from "lucide-react";
import { getProductById } from "@/lib/bazardor";

const formatNumber = new Intl.NumberFormat("bn-BD", {
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

// Product details, historical price summary, and market-level comparison.
export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const unitName =
    unitLabels[product.unit.toLowerCase()] ?? product.unit;
  const priceDifference = product.today - product.yesterday;
  const DirectionIcon =
    priceDifference > 0 ? ArrowUp : priceDifference < 0 ? ArrowDown : Minus;
  const priceDirection =
    priceDifference > 0
      ? "বেড়েছে"
      : priceDifference < 0
        ? "কমেছে"
        : "অপরিবর্তিত";
  const directionColor =
    priceDifference > 0
      ? "text-red-600"
      : priceDifference < 0
        ? "text-green-700"
        : "text-gray-500";

  const lowestMarket = product.markets.reduce<(typeof product.markets)[number] | null>(
    (lowest, market) =>
      lowest === null || market.min < lowest.min ? market : lowest,
    null,
  );
  const highestMarket = product.markets.reduce<(typeof product.markets)[number] | null>(
    (highest, market) =>
      highest === null || market.max > highest.max ? market : highest,
    null,
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        {/* Route breadcrumb: home, category, then current product */}
        <nav
          aria-label="ব্রেডক্রাম্ব"
          className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 sm:mb-8"
        >
          <Link className="font-medium text-green-800 hover:text-green-950" href="/">
            হোম
          </Link>
          <span aria-hidden="true">›</span>
          <Link
            className="font-medium text-green-800 hover:text-green-950"
            href={`/category/${encodeURIComponent(product.category)}`}
          >
            {product.categoryNameBn}
          </Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page" className="font-semibold text-gray-800">
            {product.nameBn}
          </span>
        </nav>

        {/* Product identity, today's price, and daily movement */}
        <section
          aria-labelledby="product-name"
          className="grid overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm shadow-green-950/5 lg:grid-cols-[1fr_0.8fr]"
        >
          <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
            <div className="flex items-center gap-4 sm:gap-5">
              <span
                aria-hidden="true"
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-5xl sm:h-24 sm:w-24 sm:text-6xl"
              >
                {product.image || product.categoryIcon || "🛒"}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-green-700">
                  {product.categoryNameBn}
                </p>
                <h1
                  id="product-name"
                  className="mt-1 text-2xl font-bold leading-tight tracking-tight text-gray-950 sm:text-3xl lg:text-4xl"
                >
                  {product.nameBn}
                </h1>
                <p className="mt-2 text-sm font-medium text-gray-500 sm:text-base">
                  প্রতি {unitName}: {product.categoryNameBn}
                </p>
              </div>
            </div>

            <p className={`mt-6 flex items-center gap-2 text-sm font-semibold sm:text-base ${directionColor}`}>
              <DirectionIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
              গতকালের তুলনায় আজ দাম {priceDirection}
              {priceDifference !== 0 && (
                <span>{formatNumber.format(Math.abs(priceDifference))} টাকা</span>
              )}
            </p>
          </div>

          <div className="border-t border-green-100 bg-green-50/60 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-7">
              <p className="text-sm font-semibold text-gray-500">আজকের দাম</p>
              <p className="mt-1 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">
                {formatNumber.format(product.today)}
                <span className="ml-2 text-lg font-bold text-gray-600 sm:text-xl">
                  টাকা / {unitName}
                </span>
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold ${
                    product.change.dir === "up"
                      ? "bg-red-50 text-red-700"
                      : product.change.dir === "down"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {product.change.dir === "up" ? (
                    <ArrowUp aria-hidden="true" className="h-4 w-4" />
                  ) : product.change.dir === "down" ? (
                    <ArrowDown aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <Minus aria-hidden="true" className="h-4 w-4" />
                  )}
                  {formatNumber.format(Math.abs(product.change.pct))}%
                </span>
                <span className="text-sm text-gray-500">
                  গতকালের তুলনায়
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Lowest, highest, and previous-month price summaries */}
        <section aria-labelledby="price-summary-heading" className="mt-8 sm:mt-10">
          <h2
            id="price-summary-heading"
            className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl"
          >
            দামের সারসংক্ষেপ
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            <article className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold text-gray-600">সর্বনিম্ন দাম</p>
              <p className="mt-2 text-3xl font-black text-green-700">
                {lowestMarket
                  ? formatNumber.format(lowestMarket.min)
                  : "—"}
                <span className="ml-1 text-base font-semibold">টাকা</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {lowestMarket
                  ? `সবচেয়ে কম দামের বাজার · ${lowestMarket.market}`
                  : "বাজারের তথ্য নেই"}
              </p>
            </article>

            <article className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold text-gray-600">সর্বোচ্চ দাম</p>
              <p className="mt-2 text-3xl font-black text-red-600">
                {highestMarket
                  ? formatNumber.format(highestMarket.max)
                  : "—"}
                <span className="ml-1 text-base font-semibold">টাকা</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {highestMarket
                  ? `সবচেয়ে বেশি দামের বাজার · ${highestMarket.market}`
                  : "বাজারের তথ্য নেই"}
              </p>
            </article>

            <article className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:col-span-2 sm:p-6 lg:col-span-1">
              <p className="text-sm font-semibold text-gray-600">গত মাস</p>
              <p className="mt-2 text-3xl font-black text-green-700">
                {formatNumber.format(product.lastMonth)}
                <span className="ml-1 text-base font-semibold">টাকা</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">
                প্রতি {unitName}-এর হিসাব
              </p>
            </article>
          </div>
        </section>

        {/* Market price ranges with a horizontally scrollable mobile table */}
        <section
          aria-labelledby="market-prices-heading"
          className="mt-8 sm:mt-10"
        >
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="market-prices-heading"
              className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl"
            >
              বাজারভিত্তিক আজকের দাম
            </h2>
            <p className="text-sm text-gray-500">
              {formatNumber.format(product.markets.length)}টি বাজারের তথ্য
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {product.markets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                  <thead className="bg-green-50 text-xs font-bold uppercase tracking-wide text-green-900 sm:text-sm">
                    <tr>
                      <th scope="col" className="px-4 py-3.5 sm:px-5">
                        বাজার
                      </th>
                      <th scope="col" className="px-4 py-3.5 sm:px-5">
                        জেলা
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-right sm:px-5">
                        সর্বনিম্ন
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-right sm:px-5">
                        সর্বোচ্চ
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-right sm:px-5">
                        গড়
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {product.markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${market.division}`}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap px-4 py-3.5 font-semibold text-gray-900 sm:px-5"
                        >
                          {market.market}
                        </th>
                        <td className="whitespace-nowrap px-4 py-3.5 text-gray-600 sm:px-5">
                          {market.division}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-right tabular-nums text-gray-700 sm:px-5">
                          {formatNumber.format(market.min)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-right tabular-nums text-gray-700 sm:px-5">
                          {formatNumber.format(market.max)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-right font-semibold tabular-nums text-gray-900 sm:px-5">
                          {formatNumber.format((market.min + market.max) / 2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="px-5 py-10 text-center text-sm text-gray-500">
                এই পণ্যের বাজারভিত্তিক তথ্য এখন পাওয়া যাচ্ছে না।
              </p>
            )}
          </div>
        </section>

        <Link
          href={`/category/${encodeURIComponent(product.category)}`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-green-800 transition hover:text-green-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {product.categoryNameBn} ক্যাটাগরিতে ফিরুন
        </Link>
      </div>
    </section>
  );
}
