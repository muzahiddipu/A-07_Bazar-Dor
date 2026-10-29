import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CategoryProducts from "@/components/CategoryProducts";
import {
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/bazardor";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) {
    return (
      <section className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl"
        >
          🔎
        </span>
        <h1 className="mt-5 text-2xl font-bold text-gray-950 sm:text-3xl">
          ক্যাটাগরি পাওয়া যায়নি
        </h1>
        <p className="mt-2 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
          এই ক্যাটাগরিটি নেই বা সরিয়ে ফেলা হয়েছে। সব পণ্য দেখতে হোমপেজে ফিরে
          যান।
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          হোমে ফিরে যান
        </Link>
      </section>
    );
  }

  const matchingProducts = products.filter(
    (product) => product.category === category.slug,
  );

  return (
    <section className="min-h-[60vh] bg-gradient-to-b from-green-50/50 to-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-green-800 transition hover:text-green-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          সব পণ্য
        </Link>

        <div className="mt-6 rounded-3xl border border-green-100 bg-white p-5 shadow-sm shadow-green-900/5 sm:mt-8 sm:p-8">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-3xl sm:h-16 sm:w-16"
            >
              {category.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-green-700">
                পণ্যের ক্যাটাগরি
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
                {category.nameBn}
              </h1>
            </div>
          </div>
        </div>

        {matchingProducts.length > 0 ? (
          <CategoryProducts products={matchingProducts} />
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-green-200 bg-white px-5 py-12 text-center sm:mt-8">
            <p className="text-lg font-semibold text-gray-900">
              এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই
            </p>
            <p className="mt-2 text-sm text-gray-500">
              অন্য পণ্য দেখতে হোমপেজে ফিরে যান।
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex min-h-10 items-center rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              হোমে ফিরে যান
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
