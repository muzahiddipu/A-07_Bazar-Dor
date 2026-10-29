"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  LoaderCircle,
  LogOut,
  Mail,
  UserRound,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const UserProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Populate the input when the user's session becomes available.
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("অনুগ্রহ করে আপনার নাম লিখুন।");
      setMessage("");
      return;
    }

    if (trimmedName === user?.name) {
      setError("");
      setMessage("আপনার নামের কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setIsUpdating(true);
    setError("");
    setMessage("");

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        setError(
          result.error.message || "নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।",
        );
        return;
      }

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch (err) {
      console.error("Profile update failed:", err);
      setError("নাম আপডেট করার সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setError("");

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        setIsSigningOut(false);
        return;
      }

      router.replace("/signIn");
      router.refresh();
    } catch (err) {
      console.error("Sign out failed:", err);
      setError("সাইন আউট করার সময় সমস্যা হয়েছে।");
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
        <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
          <LoaderCircle className="h-5 w-5 animate-spin text-green-700" />
          প্রোফাইল লোড হচ্ছে...
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <UserRound className="mx-auto mb-4 h-10 w-10 text-gray-400" />
          <h1 className="text-xl font-bold text-gray-900">সাইন ইন করুন</h1>
          <p className="mt-2 text-sm text-gray-500">
            আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
          </p>
          <button
            type="button"
            onClick={() => router.push("/signIn")}
            className="mt-6 w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            সাইন ইন
          </button>
        </div>
      </main>
    );
  }

  const userInitial = user.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Page heading */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        {/* Profile summary card */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-green-100 text-xl font-bold text-green-800 ring-1 ring-green-200">
                {user.image ? (
                  <Image
                    src={user.image}
                    width={64}
                    height={64}
                    unoptimized
                    alt={`${user.name || "ব্যবহারকারী"} এর প্রোফাইল ছবি`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  userInitial
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
                  {user.name || "ব্যবহারকারী"}
                </h2>
                <p className="mt-1 flex min-w-0 items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSigningOut ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </section>

        {/* Profile update card */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-gray-900">তথ্য</h2>
            <p className="mt-1 text-sm text-gray-500">
              আপনার ব্যক্তিগত তথ্য আপডেট করুন।
            </p>
          </div>

          {/* Feedback messages */}
          {message && (
            <div
              role="status"
              className="mb-5 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                নাম
              </label>

              <input
                id="profile-name"
                type="text"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setMessage("");
                  setError("");
                }}
                autoComplete="name"
                maxLength={100}
                required
                placeholder="আপনার নাম লিখুন"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating || !name.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  আপডেট হচ্ছে...
                </>
              ) : (
                "আপডেট"
              )}
            </button>
          </form>
        </section>

        <p className="mt-6 text-center text-xs text-gray-400">
          আপনার প্রতিদিনের বাজার · বাজার দর
        </p>
      </div>
    </main>
  );
};

export default UserProfilePage;
