"use client";

import { useEffect } from "react";
import Link from "next/link";

// Route-level recovery UI for category API and rendering failures.
export default function CategoryError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Failed to load category page:", error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-950 sm:text-3xl">
        পণ্য লোড করা যায়নি
      </h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
        ক্যাটাগরির তথ্য আনতে সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা হোমপেজে ফিরে
        যান।
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={retry}
          className="min-h-11 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
        >
          আবার চেষ্টা করুন
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-green-200 bg-white px-5 py-2.5 text-sm font-semibold text-green-800 transition hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
        >
          হোমে ফিরে যান
        </Link>
      </div>
    </section>
  );
}
