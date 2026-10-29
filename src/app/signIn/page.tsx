"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    const loadingToast = toast.loading("সাইন ইন হচ্ছে...");

    try {
      const formData = new FormData(e.currentTarget);
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "");

      if (!email || !password) {
        toast.error("ইমেইল ও পাসওয়ার্ড লিখুন।", {
          id: loadingToast,
        });
        return;
      }

      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।", {
          id: loadingToast,
        });
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!", {
        id: loadingToast,
      });
    } catch (error) {
      console.error("Sign-in error:", error);

      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    if (isLoading) return;
    setIsLoading(true);

    const loadingToast = toast.loading(
      provider === "google"
        ? "Google দিয়ে সাইন ইন হচ্ছে..."
        : "GitHub দিয়ে সাইন ইন হচ্ছে...",
    );

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: `/?socialAuth=success&provider=${provider}`,
        errorCallbackURL: `/?socialAuth=error&provider=${provider}`,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error(`${provider} sign-in error:`, error);

      const status =
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        typeof error.status === "number"
          ? error.status
          : undefined;

      toast.error(
        status
          ? `${provider === "google" ? "Google" : "GitHub"} sign-in শুরু করা যায়নি (HTTP ${status})।`
          : `${provider === "google" ? "Google" : "GitHub"} সার্ভারের সাথে সংযোগ করা যায়নি। আবার চেষ্টা করুন।`,
        {
          id: loadingToast,
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5f0] px-4 py-10 text-[#202a22] sm:px-6">
      <div className="w-full max-w-5xl">
        <header className="mb-10 text-center sm:mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            সাইন ইন
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#667068] sm:text-xl md:text-2xl">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </header>

        <section className="mx-auto w-full max-w-4xl rounded-[28px] border border-[#dfe8df] bg-[#fbfdfb] p-6 shadow-sm sm:p-10 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label
                htmlFor="email"
                className="mb-3 block text-lg font-semibold sm:text-2xl"
              >
                ইমেইল
              </label>

              <div className="relative">
                <Mail
                  size={21}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b877d]"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  className="h-14 w-full rounded-2xl border-2 border-[#e0e8e0] bg-transparent pl-12 pr-4 text-base outline-none transition placeholder:text-[#89928b] focus:border-[#07883f] focus:ring-4 focus:ring-[#07883f]/10 disabled:opacity-60 sm:h-[72px] sm:text-xl"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-3 block text-lg font-semibold sm:text-2xl"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <LockKeyhole
                  size={21}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b877d]"
                />

                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  className="h-14 w-full rounded-2xl border-2 border-[#e0e8e0] bg-transparent pl-12 pr-14 text-base outline-none transition placeholder:text-[#89928b] focus:border-[#07883f] focus:ring-4 focus:ring-[#07883f]/10 disabled:opacity-60 sm:h-[72px] sm:text-xl"
                />

                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((visible) => !visible)}
                  aria-label={
                    isPasswordVisible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  aria-pressed={isPasswordVisible}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#737e75] transition hover:bg-[#eaf2ea] hover:text-[#07883f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07883f]"
                >
                  {isPasswordVisible ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              <div className="mt-3 text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[#07883f] transition hover:text-[#056b32] hover:underline sm:text-base"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#07883f] px-5 text-lg font-bold text-white shadow-[0_5px_0_#056b32,0_8px_12px_rgba(7,136,63,0.15)] transition duration-200 hover:bg-[#067636] active:translate-y-1 active:shadow-sm disabled:cursor-not-allowed disabled:opacity-70 sm:h-[84px] sm:text-2xl"
            >
              {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4 sm:my-10">
            <div className="h-[2px] flex-1 bg-[#e2e8e2]" />

            <span className="shrink-0 text-base font-medium text-[#465148] sm:text-xl">
              অথবা
            </span>

            <div className="h-[2px] flex-1 bg-[#e2e8e2]" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={isLoading}
              className="flex min-h-14 items-center justify-center gap-3 rounded-2xl border-2 border-[#e0e8e0] px-3 py-4 text-base font-semibold transition hover:bg-[#f2f7f2] disabled:opacity-60 sm:min-h-[72px] sm:text-lg"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 48 48"
                className="h-6 w-6 shrink-0"
              >
                <path
                  fill="#4285F4"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                />
                <path
                  fill="#34A853"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3C9.2 39.5 16 44 24 44Z"
                />
                <path
                  fill="#FBBC05"
                  d="M12.6 27.5a12 12 0 0 1 0-7v-5.3H5.8a20 20 0 0 0 0 17.6l6.8-5.3Z"
                />
                <path
                  fill="#EA4335"
                  d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.5 4 24 4 16 4 9.2 8.5 5.8 15.2l6.8 5.3c1.6-4.8 6.1-8.4 11.4-8.4Z"
                />
              </svg>

              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={isLoading}
              className="flex min-h-14 items-center justify-center gap-3 rounded-2xl border-2 border-[#e0e8e0] px-3 py-4 text-base font-semibold transition hover:bg-[#f2f7f2] disabled:opacity-60 sm:min-h-[72px] sm:text-lg"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 fill-current"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.75-1.32-3.75-1.32-.5-1.3-1.23-1.65-1.23-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.71 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.97-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.06 1.14a10.6 10.6 0 0 1 5.57 0c2.12-1.44 3.06-1.14 3.06-1.14.61 1.53.23 2.66.11 2.94.72.77 1.15 1.76 1.15 2.97 0 4.27-2.61 5.21-5.1 5.49.4.35.76 1.02.76 2.06v3.12c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="mt-8 text-center text-base leading-relaxed sm:mt-10 sm:text-xl">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#07883f] transition hover:text-[#056b32] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>

        <div className="mt-8 text-center sm:mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-base text-[#788279] transition hover:text-[#07883f] sm:text-xl"
          >
            <ArrowLeft size={21} />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
