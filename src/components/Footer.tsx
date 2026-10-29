import Link from "next/link";
import { TrendingUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-emerald-100 bg-[#fbfdf9]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            aria-label="বাজার দর - হোম"
            className="group flex items-center gap-3 self-start"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-800 text-white shadow-sm transition-colors duration-200 group-hover:bg-emerald-900">
              <TrendingUp aria-hidden="true" className="h-5 w-5" />
            </span>

            <span className="min-w-0">
              <span className="block text-base font-bold tracking-tight text-gray-900">
                বাজার দর
              </span>
              <span className="mt-0.5 block text-sm leading-6 text-gray-500">
                প্রয়োজনীয় পণ্যের দাম এক নজরে।
              </span>
            </span>
          </Link>

          <p className="max-w-lg text-left text-xs leading-6 text-gray-500 sm:text-right sm:text-sm">
            <span className="font-semibold text-emerald-800">দ্রষ্টব্য:</span>{" "}
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>

        <div className="mt-6 border-t border-emerald-100 pt-4">
          <p className="text-center text-xs text-gray-400">
            © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
