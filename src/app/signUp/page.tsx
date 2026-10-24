"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  UserRound,
  Mail,
  LockKeyhole,
} from "lucide-react";

const SignUpPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("দুটি পাসওয়ার্ড মিলছে না। আবার চেষ্টা করুন।");
      return;
    }

    // Connect your registration API or authentication logic here.
  };

  return (
    <main className="min-h-screen bg-[#f1f5ef] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <header className="mb-8 text-center sm:mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#202b22] sm:text-4xl md:text-5xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base md:text-lg">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </header>

        {/* Sign Up Card */}
        <section className="rounded-[1.75rem] border border-[#dce6dc] bg-white/85 p-5 shadow-[0_12px_45px_-30px_rgba(22,101,52,0.18)] sm:rounded-[2rem] sm:p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2.5 block text-base font-semibold text-[#263329] sm:text-lg"
              >
                নাম
              </label>

              <div className="relative">
                <UserRound
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="যেমন: রহিম উদ্দিন"
                  required
                  className="h-14 w-full rounded-xl border border-[#dce6dc] bg-[#fcfdfb] pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 sm:text-lg"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2.5 block text-base font-semibold text-[#263329] sm:text-lg"
              >
                ইমেইল
              </label>

              <div className="relative">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="h-14 w-full rounded-xl border border-[#dce6dc] bg-[#fcfdfb] pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 sm:text-lg"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2.5 block text-base font-semibold text-[#263329] sm:text-lg"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  minLength={8}
                  required
                  className="h-14 w-full rounded-xl border border-[#dce6dc] bg-[#fcfdfb] pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 sm:text-lg"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2.5 block text-base font-semibold text-[#263329] sm:text-lg"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="আবার লিখুন"
                  minLength={8}
                  required
                  className="h-14 w-full rounded-xl border border-[#dce6dc] bg-[#fcfdfb] pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 sm:text-lg"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#07883f] px-5 text-base font-bold text-white shadow-[0_4px_0_#056b32,0_8px_16px_-8px_rgba(5,107,50,0.45)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#067735] hover:shadow-[0_4px_0_#045c2b,0_12px_22px_-8px_rgba(5,107,50,0.4)] active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:h-16 sm:text-xl"
            >
              অ্যাকাউন্ট তৈরি করুন
              <ArrowRight
                aria-hidden="true"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4 sm:my-8">
            <div className="h-px flex-1 bg-[#dfe6df]" />

            <span className="text-sm font-medium text-gray-500 sm:text-base">
              অথবা
            </span>

            <div className="h-px flex-1 bg-[#dfe6df]" />
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Google */}
            <button
              type="button"
              onClick={() => {
                // Connect Google OAuth here.
              }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dce6dc] bg-white px-3 py-3 text-sm font-semibold text-[#263329] transition hover:border-emerald-300 hover:bg-emerald-50/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:min-h-14 sm:text-base"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 48 48"
                className="h-5 w-5 shrink-0"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  transform="translate(0 5)"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.64 5.93c4.46-4.13 7.14-10.21 7.14-17.58Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.54 2.56 10.78l7.97-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.82l-7.64-5.93c-2.13 1.43-4.86 2.27-8.27 2.27-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>
              Google দিয়ে চালিয়ে যান
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => {
                // Connect GitHub OAuth here.
              }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dce6dc] bg-white px-3 py-3 text-sm font-semibold text-[#263329] transition hover:border-emerald-300 hover:bg-emerald-50/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:min-h-14 sm:text-base"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 shrink-0"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.75-1.32-3.75-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.23-5.07-5.49 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.98 0 4.27-2.61 5.2-5.1 5.48.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-7 text-center text-sm text-[#39453b] sm:text-base md:text-lg">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-emerald-700 transition hover:text-emerald-900 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </section>

        {/* Back to Home */}
        <div className="mt-7 text-center sm:mt-9">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-800 sm:text-base"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
