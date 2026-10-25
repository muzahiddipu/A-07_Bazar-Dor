"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  LogIn,
  UserPlus,
  CalendarDays,
} from "lucide-react";

// Sticky brand, authentication actions, and the category navigation slot.
const Header = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="sticky top-0 z-50 border-b border-green-100/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex min-h-[88px] items-center justify-between gap-3 py-3 sm:gap-5">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3 sm:gap-4"
            aria-label="বাজার দর হোম"
          >
            {/* Shopping Cart Icon */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-green-800 text-white shadow-md shadow-green-800/15 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-green-800/20 sm:h-14 sm:w-14">
              <ShoppingCart
                size={29}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-300" />
            </div>

            {/* Brand Name and Date */}
            <div className="min-w-0">
              <span className="text-xl font-extrabold leading-tight tracking-tight text-green-900 transition-colors group-hover:text-green-700 sm:text-2xl md:text-3xl">
                বাজার দর
              </span>

              {/* Date stays directly below the brand name */}
              <div className="mt-2 flex min-w-0 items-center gap-1.5">
                <CalendarDays
                  size={13}
                  strokeWidth={2}
                  className="shrink-0 text-green-700"
                />
                <p className="truncate text-[11px] font-medium leading-relaxed text-gray-500 sm:text-xs md:text-sm">
                  {date}
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Tagline */}
          <div className="hidden flex-1 justify-center lg:flex">
            <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-gradient-to-r from-green-50/70 to-emerald-50/40 px-5 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                <ShoppingCart size={19} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-bold text-green-900">
                  আপনার প্রতিদিনের বাজার
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  নিত্যপণ্যের সঠিক দর, আপনার হাতেই
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Authentication */}
          <div className="hidden shrink-0 items-center gap-2.5 sm:flex">
            <Link
              href="/signIn"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-2.5 text-sm font-semibold text-green-800 transition duration-200 hover:border-green-600 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              <LogIn size={17} />
              সাইন ইন
            </Link>

            <Link
              href="/signUp"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-green-900/10 transition duration-200 hover:bg-green-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              <UserPlus size={17} />
              সাইন আপ
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-100 bg-green-50/50 text-green-800 transition hover:bg-green-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:hidden"
            aria-label={isMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="border-t border-green-100 py-4 sm:hidden"
          >
            <div className="mb-4 rounded-xl border border-green-100 bg-green-50/70 p-3">
              <div className="flex items-center gap-2 text-green-800">
                <CalendarDays size={16} className="shrink-0" />
                <p className="text-xs font-medium leading-relaxed">{date}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/signIn"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-3 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50"
              >
                <LogIn size={17} />
                সাইন ইন
              </Link>

              <Link
                href="/signUp"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-3 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                <UserPlus size={17} />
                সাইন আপ
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Brand Accent */}
      <div className="h-0.5 bg-gradient-to-r from-emerald-200 via-green-600 to-emerald-300" />
      {children}
    </header>
  );
};

export default Header;
