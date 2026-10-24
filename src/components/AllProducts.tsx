import ProductCard from "./ProductCard";
import { getAllProducts } from "@/lib/bazardor";

const AllProducts = async () => {
  const products = await getAllProducts();

  return (
    <section
      aria-labelledby="all-products-heading"
      className="border-t border-green-100/80 bg-gradient-to-b from-green-50/50 to-white"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-green-700">
              আজকের বাজারদর
            </p>
            <h2
              id="all-products-heading"
              className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl lg:text-4xl"
            >
              সব পণ্য
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            বাজারের নিত্যপ্রয়োজনীয় পণ্যের হালনাগাদ দাম
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
