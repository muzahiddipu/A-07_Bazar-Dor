import Link from "next/link";
import {
  ShoppingBasket,
  Leaf,
  Search,
  House,
  ChevronRight,
} from "lucide-react";

const LoadingPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7faf7] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-green-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-lime-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <header className="flex items-center justify-between border-b border-green-100 pb-5">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-700 text-white shadow-md shadow-green-900/10 transition-transform group-hover:scale-105">
              <ShoppingBasket size={23} strokeWidth={1.8} />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-gray-900">
                বাজার-<span className="text-green-700">দর</span>
              </h1>
              <p className="text-[10px] font-medium tracking-wide text-gray-500">
                আপনার প্রতিদিনের বাজার
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-green-100 bg-white/80 px-3.5 py-2 sm:flex">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600" />
            </span>
            <span className="text-xs font-semibold text-gray-600">
              প্রস্তুত হচ্ছে...
            </span>
          </div>
        </header>

        <section
          aria-busy="true"
          aria-label="পেজ লোড হচ্ছে"
          className="py-12 sm:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-xl text-center">
            <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center sm:h-36 sm:w-36">
              <div className="absolute inset-0 animate-ping rounded-full bg-green-200/40 [animation-duration:2.5s]" />
              <div className="absolute inset-2 rounded-full border border-dashed border-green-300 animate-[spin_12s_linear_infinite]" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-green-600 to-emerald-800 text-white shadow-xl shadow-green-900/20 sm:h-28 sm:w-28">
                <ShoppingBasket
                  size={48}
                  strokeWidth={1.5}
                  className="animate-[bounce_2s_ease-in-out_infinite]"
                />

                <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-xl border-[3px] border-[#f7faf7] bg-lime-300 text-green-950">
                  <Leaf size={17} />
                </span>
              </div>

              <span className="absolute left-0 top-5 h-3 w-3 rounded-full bg-lime-400 animate-pulse" />
              <span className="absolute bottom-2 right-0 h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse [animation-delay:500ms]" />
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-xs font-bold text-green-800">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600" />
              একটু অপেক্ষা করুন
            </div>

            <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              আপনার বাজার
              <span className="mt-1 block text-green-700">তৈরি হচ্ছে...</span>
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
              আপনার প্রয়োজনীয় তথ্য নিয়ে আসছি। আর একটু অপেক্ষা করুন, আমরা প্রায়
              প্রস্তুত!
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Getting everything ready for you.
            </p>

            <div
              role="progressbar"
              aria-label="লোড হচ্ছে"
              className="mx-auto mt-8 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-green-100"
            >
              <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-green-500 via-green-600 to-lime-400 animate-[loading_1.6s_ease-in-out_infinite]" />
            </div>

            <p className="mt-3 text-[11px] font-medium tracking-wide text-gray-400">
              LOADING YOUR EXPERIENCE
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-4xl sm:mt-16">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="h-5 w-36 animate-pulse rounded-md bg-gray-200/80" />
              <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200/70" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4"
                >
                  <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-xl bg-gray-100">
                    <ShoppingBasket
                      size={27}
                      strokeWidth={1.3}
                      className="text-gray-300"
                    />
                  </div>

                  <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-100" />

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="h-5 w-14 animate-pulse rounded-md bg-green-100" />
                    <div className="h-7 w-7 animate-pulse rounded-lg bg-green-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-green-100 py-5">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-gray-400">
              <span className="font-bold text-green-700">বাজার-দর</span> — সঠিক
              দামে, নিশ্চিন্তে বাজার।
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 transition hover:text-green-900"
            >
              <House size={14} />
              হোম পেজ
              <ChevronRight size={13} />
            </Link>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-110%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(280%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
};

export default LoadingPage;
