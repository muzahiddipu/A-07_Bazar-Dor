import { ArrowDown } from "lucide-react";

interface Product {
  id: number | string;
  nameBn: string;
  unit: string;
  image?: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const unitLabels: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  dozen: "প্রতি ডজন",
};

const PriceDecreased = async () => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );

  if (!response.ok) {
    throw new Error(`পণ্যের দাম লোড করা যায়নি। (${response.status})`);
  }

  const products: Product[] = await response.json();
  const decreasedProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <section
      aria-labelledby="price-decreased-heading"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mb-5 sm:mb-7">
        <h2
          id="price-decreased-heading"
          className="mt-1 flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-950 sm:gap-3 sm:text-3xl lg:text-4xl"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700 sm:h-11 sm:w-11">
            <ArrowDown aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          আজ দাম কমেছে
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {decreasedProducts.map((product) => {
          const changeStyles = {
            up: {
              badge: "bg-red-50 text-red-600",
              indicator: "▲",
            },
            down: {
              badge: "bg-green-50 text-green-700",
              indicator: "▼",
            },
            flat: {
              badge: "bg-gray-100 text-gray-600",
              indicator: "—",
            },
          }[product.change.dir];

          return (
            <article
              key={product.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-900/5 transition duration-200 hover:-translate-y-0.5 hover:border-green-100 hover:shadow-md sm:p-6"
            >
              <div className="flex items-center gap-4">
                <div
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-3xl"
                >
                  {product.image || "🛒"}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-bold text-gray-900">
                    {product.nameBn}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {unitLabels[product.unit.toLowerCase()] ??
                      `প্রতি ${product.unit}`}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between gap-3 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    আজকের দাম
                  </p>
                  <p className="mt-1 text-2xl font-black tracking-tight text-gray-950">
                    {product.today}
                    <span className="ml-1 text-base font-semibold text-gray-600">
                      টাকা
                    </span>
                  </p>
                </div>

                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold ${changeStyles.badge}`}
                  aria-label={`দামের পরিবর্তন ${Math.abs(product.change.pct)} শতাংশ`}
                >
                  <span aria-hidden="true">{changeStyles.indicator}</span>
                  {Math.abs(product.change.pct)}%
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default PriceDecreased;
