"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const API_URL = "https://api.abcz.workers.dev/api/bazardor/categories";

const NavLinks = () => {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Category API error: ${response.status}`);
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid category API response");
        }

        const validCategories = data.filter(
          (item): item is Category =>
            item !== null &&
            typeof item === "object" &&
            typeof item.id === "string" &&
            typeof item.slug === "string" &&
            typeof item.nameBn === "string" &&
            typeof item.icon === "string",
        );

        setCategories(validCategories);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Failed to load categories:", error);
          setCategories([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchCategories();

    return () => controller.abort();
  }, []);

  return (
    <nav
      aria-label="পণ্যের নেভিগেশন"
      className="relative border-b border-green-100 bg-white"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center sm:h-14">
          <div className="flex min-w-0 flex-1 snap-x snap-mandatory items-center gap-1.5 overflow-x-auto overscroll-x-contain py-1 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden sm:gap-2">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-9 w-20 shrink-0 animate-pulse rounded-full bg-green-50 sm:h-10 sm:w-24"
                />
              ))
            ) : categories.length > 0 ? (
              categories.map((nav) => {
                const slug = nav.slug.trim();
                const href = slug.startsWith("/") ? slug : `/${slug}`;

                const isActive =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(`${href}/`));

                return (
                  <Link
                    key={nav.id}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex h-9 shrink-0 snap-start items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:h-10 sm:gap-2 sm:px-4 sm:text-sm ${
                      isActive
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-transparent text-gray-600 hover:border-green-100 hover:bg-green-50 hover:text-green-800"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-4 w-4 shrink-0 items-center justify-center text-sm leading-none sm:h-5 sm:w-5 sm:text-base"
                    >
                      {nav.icon}
                    </span>

                    <span>{nav.nameBn}</span>
                  </Link>
                );
              })
            ) : (
              <p className="px-2 text-xs text-gray-500 sm:text-sm">
                ক্যাটাগরি লোড করা যায়নি।
              </p>
            )}
          </div>
        </div>
      </div>

    </nav>
  );
};

export default NavLinks;
