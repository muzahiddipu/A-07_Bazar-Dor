import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  TrendingUp,
} from "lucide-react";

import heroImg from "../assets/bazar-hero.png";

const HomePage = () => {
  const date = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <section className="relative isolate overflow-hidden bg-[#fbfdf9]">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-lime-100/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#16653412_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-900/[0.07] bg-white/85 shadow-[0_32px_100px_-50px_rgba(22,101,52,0.28)] backdrop-blur-sm sm:rounded-[2.5rem]">
          {/* Top accent */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-800 via-green-500 to-lime-400"
          />

          <div className="grid items-center gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-4 lg:px-16 lg:py-16 xl:px-20 xl:py-20">
            {/* Content */}
            <div className="relative z-10">
              {/* Date badge */}
              <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-emerald-100 bg-emerald-50/80 px-3.5 py-2 text-xs font-semibold text-emerald-900 sm:text-sm">
                <CalendarDays
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-emerald-700"
                />
                <span>{date}</span>
              </div>

              {/* Headline */}
              <h1 className="mt-7 max-w-2xl text-[2rem] font-extrabold leading-[1.3] tracking-tight text-gray-950 sm:mt-8 sm:text-5xl sm:leading-[1.25] lg:text-[3.5rem]">
                প্রতিদিনের বাজারদর,
                <span className="relative mt-1 block text-emerald-700">
                  এখন আপনার হাতেই।
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-1 w-20 rounded-full bg-lime-400 sm:w-28"
                  />
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-8 text-gray-600 sm:text-base sm:leading-9">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের বাজারদর
                জানুন সহজেই। বিভিন্ন বাজারের দামের তুলনা করুন এবং কেনাকাটার
                সিদ্ধান্ত নিন আরও আত্মবিশ্বাসের সঙ্গে।
              </p>

              {/* Feature highlights */}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
                  <MapPin
                    aria-hidden="true"
                    className="h-4 w-4 text-emerald-700"
                  />
                  বাজারভিত্তিক দর
                </span>

                <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
                  <TrendingUp
                    aria-hidden="true"
                    className="h-4 w-4 text-emerald-700"
                  />
                  দামের তুলনা
                </span>

                <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-4 w-4 text-emerald-700"
                  />
                  সহজ তথ্য
                </span>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
                <Link
                  href="/products"
                  className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-900 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:min-w-48"
                >
                  সব পণ্যের দাম দেখুন
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/markets"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                >
                  বাজার খুঁজুন
                  <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-5 text-xs leading-6 text-gray-400">
                আপনার নিত্যদিনের বাজার পরিকল্পনা হোক আরও সহজ।
              </p>
            </div>

            {/* Illustration */}
            <div className="relative mx-auto flex min-h-[290px] w-full max-w-md items-center justify-center sm:min-h-[380px] lg:min-h-[450px]">
              {/* Illustration backdrop */}
              <div
                aria-hidden="true"
                className="absolute h-[78%] w-[78%] rounded-full bg-gradient-to-br from-emerald-100 via-green-50 to-lime-50"
              />

              <div
                aria-hidden="true"
                className="absolute h-[88%] w-[88%] rounded-full border border-dashed border-emerald-200/80"
              />

              {/* Floating card: price information */}
              <div className="absolute left-0 top-[17%] z-20 rounded-2xl border border-white/90 bg-white/95 px-3.5 py-3 shadow-[0_12px_35px_-15px_rgba(22,101,52,0.25)] backdrop-blur-md sm:left-1 sm:px-4 sm:py-3.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50">
                    <TrendingUp
                      aria-hidden="true"
                      className="h-4 w-4 text-emerald-700"
                    />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-gray-900 sm:text-sm">
                      বাজারের খবর
                    </p>
                    <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                      এক নজরে সব তথ্য
                    </p>
                  </div>
                </div>
              </div>

              {/* Main image */}
              <div className="relative z-10 w-[76%] transition-transform duration-500 ease-out hover:scale-[1.04]">
                <Image
                  src={heroImg}
                  alt="তাজা শাকসবজি ও নিত্যপ্রয়োজনীয় বাজারের পণ্যের চিত্র"
                  priority
                  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 35vw, 360px"
                  className="h-auto w-full drop-shadow-[0_28px_25px_rgba(22,101,52,0.16)]"
                />
              </div>

              {/* Floating location card */}
              <div className="absolute bottom-[13%] right-0 z-20 flex items-center gap-2.5 rounded-2xl border border-white bg-white/95 px-3.5 py-3 shadow-[0_12px_35px_-15px_rgba(22,101,52,0.25)] backdrop-blur-md sm:right-1 sm:px-4 sm:py-3.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-100">
                  <MapPin
                    aria-hidden="true"
                    className="h-[18px] w-[18px] text-emerald-800"
                  />
                </span>
                <div>
                  <p className="text-xs font-bold text-gray-900 sm:text-sm">
                    আপনার বাজার
                  </p>
                  <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                    দর জানুন সহজে
                  </p>
                </div>
              </div>

              {/* Decorative dots */}
              <span
                aria-hidden="true"
                className="absolute right-[13%] top-[15%] h-3 w-3 rounded-full bg-lime-400 ring-4 ring-lime-100/70"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-[19%] left-[12%] h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100/70"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
