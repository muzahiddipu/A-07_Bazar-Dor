"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSocialSigningIn, setIsSocialSigningIn] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting || isSocialSigningIn) return;

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না। আবার চেষ্টা করুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("অ্যাকাউন্ট তৈরি হচ্ছে...");

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        console.error("Signup error:", error);

        toast.error(
          error.message ||
            "সাইন আপ করা যায়নি। আপনার তথ্য যাচাই করে আবার চেষ্টা করুন।",
          { id: toastId },
        );
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", {
          id: toastId,
        });

        router.push("/");
        router.refresh();
      } else {
        toast.error("সাইন আপ সম্পন্ন হয়নি। আবার চেষ্টা করুন.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Unexpected signup error:", error);

      toast.error("একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    if (isSubmitting || isSocialSigningIn) return;

    setIsSocialSigningIn(true);
    const providerName = provider === "google" ? "Google" : "GitHub";
    const toastId = toast.loading(`${providerName} দিয়ে সাইন ইন হচ্ছে...`);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: `/?socialAuth=success&provider=${provider}`,
        errorCallbackURL: `/?socialAuth=error&provider=${provider}`,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।", {
          id: toastId,
        });
        return;
      }

      toast.dismiss(toastId);
    } catch (error) {
      console.error(`${providerName} sign-in error:`, error);

      const status =
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        typeof error.status === "number"
          ? error.status
          : undefined;

      toast.error(
        status
          ? `${providerName} sign-in শুরু করা যায়নি (HTTP ${status})।`
          : `${providerName} সার্ভারের সাথে সংযোগ করা যায়নি। আবার চেষ্টা করুন।`,
        { id: toastId },
      );
    } finally {
      setIsSocialSigningIn(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f1f5ef] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-8 text-center sm:mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#202b22] sm:text-4xl md:text-5xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base md:text-lg">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </header>

        <section className="rounded-[1.75rem] border border-[#dce6dc] bg-white/85 p-5 shadow-[0_12px_45px_-30px_rgba(22,101,52,0.18)] sm:rounded-[2rem] sm:p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
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
                  disabled={isSubmitting || isSocialSigningIn}
                  className="h-14 w-full rounded-xl border border-[#dce6dc] bg-[#fcfdfb] pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:opacity-60 sm:text-lg"
                />
              </div>
            </div>

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
                  disabled={isSubmitting || isSocialSigningIn}
                  className="h-14 w-full rounded-xl border border-[#dce6dc] bg-[#fcfdfb] pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:opacity-60 sm:text-lg"
                />
              </div>
            </div>

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
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  minLength={8}
                  required
                  disabled={isSubmitting || isSocialSigningIn}
                  className="h-14 w-full rounded-xl border border-[#dce6dc] bg-[#fcfdfb] pl-12 pr-12 text-base text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:opacity-60 sm:text-lg"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  aria-pressed={showPassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md text-gray-400 transition hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

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
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="আবার লিখুন"
                  minLength={8}
                  required
                  disabled={isSubmitting || isSocialSigningIn}
                  className="h-14 w-full rounded-xl border border-[#dce6dc] bg-[#fcfdfb] pl-12 pr-12 text-base text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-emerald-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 disabled:opacity-60 sm:text-lg"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "নিশ্চিতকরণ পাসওয়ার্ড লুকান"
                      : "নিশ্চিতকরণ পাসওয়ার্ড দেখুন"
                  }
                  aria-pressed={showConfirmPassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md text-gray-400 transition hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSocialSigningIn}
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#07883f] px-5 text-base font-bold text-white shadow-[0_4px_0_#056b32,0_8px_16px_-8px_rgba(5,107,50,0.45)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#067735] active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:h-16 sm:text-xl"
            >
              {isSubmitting ? (
                "অ্যাকাউন্ট তৈরি হচ্ছে..."
              ) : (
                <>
                  অ্যাকাউন্ট তৈরি করুন
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4 sm:my-8">
            <div className="h-px flex-1 bg-[#dfe6df]" />

            <span className="text-sm font-medium text-gray-500 sm:text-base">
              অথবা
            </span>

            <div className="h-px flex-1 bg-[#dfe6df]" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={isSubmitting || isSocialSigningIn}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dce6dc] bg-white px-3 py-3 text-sm font-semibold text-[#263329] transition hover:border-emerald-300 hover:bg-emerald-50/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-14 sm:text-base"
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

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={isSubmitting || isSocialSigningIn}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dce6dc] bg-white px-3 py-3 text-sm font-semibold text-[#263329] transition hover:border-emerald-300 hover:bg-emerald-50/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-14 sm:text-base"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 shrink-0"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.75-1.32-3.75-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.23-5.07-5.49 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.23-.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.23-5.07-5.49 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.23-.92A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-7 text-center text-sm text-[#39453b] sm:text-base md:text-lg">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signIn"
              className="font-semibold text-emerald-700 transition hover:text-emerald-900 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </section>

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
    </section>
  );
};

export default SignUpPage;
