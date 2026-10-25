"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/bazardor-types";

type SortOrder = "default" | "price-asc" | "price-desc";

// Adds interactive numeric-price sorting to the server-fetched category products.
const CategoryProducts = ({ products }: { products: Product[] }) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const sortedProducts = useMemo(() => {
    if (sortOrder === "default") {
      return products;
    }

    return [...products].sort((first, second) =>
      sortOrder === "price-asc"
        ? first.today - second.today
        : second.today - first.today,
    );
  }, [products, sortOrder]);

  return (
    <div className="mt-6 sm:mt-8">
      {/* Product count and sort control */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-gray-600">
          মোট{" "}
          <span className="font-bold text-gray-900">
            {new Intl.NumberFormat("bn-BD").format(products.length)}
          </span>{" "}
          টি পণ্য
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="category-product-sort"
            className="shrink-0 text-sm font-medium text-gray-600"
          >
            সাজান:
          </label>
          <select
            id="category-product-sort"
            value={sortOrder}
            onChange={(event) => {
              const value = event.target.value;
              if (
                value === "default" ||
                value === "price-asc" ||
                value === "price-desc"
              ) {
                setSortOrder(value);
              }
            }}
            className="min-h-10 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:flex-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Sorted products retain the shared card appearance and behavior */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
