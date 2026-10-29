import { ArrowDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/bazardor";

const PriceDecreased = async () => {
  const products = await getAllProducts();
  const decreasedProducts = products
    .filter((product) => product.change.dir === "down")
    .sort(
      (first, second) =>
        Math.abs(second.change.pct) - Math.abs(first.change.pct),
    )
    .slice(0, 6);

  return (
    <section
      aria-labelledby="price-decreased-heading"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mb-5 sm:mb-7">
        <h2
          id="price-decreased-heading"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-950 sm:gap-3 sm:text-3xl lg:text-4xl"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700 sm:h-11 sm:w-11">
            <ArrowDown aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          আজ দাম কমেছে
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {decreasedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PriceDecreased;
