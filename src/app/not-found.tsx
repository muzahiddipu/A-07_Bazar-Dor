"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Search,
  ShoppingBasket,
  Store,
} from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#f7faf7] px-4 py-12 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-lime-100/50 blur-3xl" />

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Illustration */}
          <div className="relative order-1 flex items-center justify-center lg:order-2">
            <div className="relative flex aspect-square w-full max-w-[390px] items-center justify-center">
              {/* Decorative circles */}
              <div className="absolute inset-[8%] rounded-full border border-dashed border-green-300" />
              <div className="absolute inset-[17%] rounded-full bg-green-100/70" />

              {/* Floating label */}
              <div className="absolute right-0 top-[15%] z-10 flex items-center gap-2 rounded-2xl border border-green-100 bg-white px-3 py-2.5 shadow-lg shadow-green-900/5 sm:right-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Search size={17} />
                </span>
                <div>
                  <p className="text-xs font-bold text-gray-800">
                    খুঁজে পাওয়া যায়নি!
                  </p>
                  <p className="text-[10px] text-gray-500">Page not found</p>
                </div>
              </div>

              {/* Main basket illustration */}
              <div className="relative z-10 flex h-48 w-48 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-green-600 to-emerald-800 shadow-2xl shadow-green-900/20 sm:h-56 sm:w-56 sm:rounded-[3rem]">
                <div className="absolute inset-2 rounded-[2rem] border border-white/15 sm:rounded-[2.5rem]" />
                <ShoppingBasket
                  className="h-24 w-24 text-white sm:h-28 sm:w-28"
                  strokeWidth={1.2}
                />

                <span className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-[#f7faf7] bg-lime-300 text-xl font-black text-green-950 shadow-lg sm:h-[72px] sm:w-[72px] sm:text-2xl">
                  404
                </span>

                <span className="absolute -bottom-3 -left-3 flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-[#f7faf7] bg-white text-green-700 shadow-md">
                  <Store size={22} />
                </span>
              </div>

              {/* Floating decorative elements */}
              <span className="absolute left-[10%] top-[25%] h-4 w-4 rounded-full bg-lime-400" />
              <span className="absolute bottom-[18%] right-[12%] h-3 w-3 rounded-full bg-green-400" />
              <span className="absolute bottom-[12%] left-[24%] h-2.5 w-2.5 rounded-full bg-emerald-300" />

              <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-green-100 bg-white/90 px-4 py-2 text-xs font-semibold text-green-800 shadow-sm">
                আপনার বাজার, আরও সহজে
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-2 text-xs font-bold tracking-wide text-green-800">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              ERROR 404 · PAGE NOT FOUND
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-[3.5rem]">
              ওহ! পৃষ্ঠাটি
              <br />
              <span className="text-green-700">খুঁজে পাওয়া যায়নি।</span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-600 sm:text-base lg:mx-0">
              আপনি যে পৃষ্ঠাটি খুঁজছেন, সেটি হয়তো সরানো হয়েছে, ঠিকানা পরিবর্তন
              হয়েছে অথবা লিংকটি ভুল।
              <span className="mt-1 block text-gray-500">
                The page you're looking for doesn't exist or may have moved.
              </span>
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-800/15 transition duration-200 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <Home size={18} />
                হোম পেজে ফিরুন
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition duration-200 hover:border-green-300 hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <ArrowLeft size={17} />
                ফিরে যান
              </Link>
            </div>

            {/* Helpful navigation */}
            <div className="mt-10 border-t border-gray-200 pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                আপনি যা করতে পারেন
              </p>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm lg:justify-start">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-gray-600 transition hover:text-green-700"
                >
                  <ShoppingBasket size={16} />
                  বাজার ঘুরে দেখুন
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-gray-600 transition hover:text-green-700"
                >
                  <Search size={16} />
                  পণ্য খুঁজুন
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400">
            <span className="font-bold text-green-700">বাজার-দর</span> —
            নিত্যপ্রয়োজনীয় পণ্যের দামের খোঁজে আপনার বিশ্বস্ত সঙ্গী।
          </p>
        </div>
      </div>
    </main>
  );
}
