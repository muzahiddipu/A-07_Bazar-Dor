"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogIn,
  UserPlus,
  UserRound,
  ChevronDown,
  ChevronUp,
  LogOut,
  Mail,
  Check,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Generate a consistent avatar when the user has no profile photo.
  const avatarSeed = encodeURIComponent(
    user?.id || user?.name || user?.email || "bazar-dor-user",
  );

  const fallbackAvatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${avatarSeed}`;

  const avatarSrc = user?.image && !imageError ? user.image : fallbackAvatar;

  // Reset image error when the user's profile photo changes.
  useEffect(() => {
    setImageError(false);
  }, [user?.image]);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsOpen(false);
            router.replace("/");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Sign out failed:", error);
      setIsSigningOut(false);
    }
  };

  // Logged-in user interface.
  if (user) {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* User Avatar and Name */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label="ইউজার মেনু খুলুন"
          className="group flex max-w-full items-center gap-2 rounded-2xl border border-green-100 bg-white p-1.5 pr-3 shadow-sm transition duration-200 hover:border-green-300 hover:bg-green-50/70 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:gap-3 sm:p-1.5 sm:pr-3"
        >
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-green-100 ring-2 ring-green-100 transition group-hover:ring-green-200 sm:h-11 sm:w-11">
            <img
              src={avatarSrc}
              alt={`${user.name || "User"} এর প্রোফাইল ছবি`}
              onError={() => {
                if (!imageError) {
                  setImageError(true);
                }
              }}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="hidden min-w-0 text-left sm:block">
            <p className="max-w-32 truncate text-sm font-bold text-green-950">
              {user.name || "ব্যবহারকারী"}
            </p>
            <p className="mt-0.5 text-xs font-medium text-gray-500">
              আমার অ্যাকাউন্ট
            </p>
          </div>

          <span className="hidden text-green-700 sm:block">
            {isOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
          </span>
        </button>

        {/* Profile Dropdown */}
        {isOpen && (
          <div
            role="menu"
            className="absolute right-0 top-full z-[60] mt-3 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-green-100 bg-white shadow-xl shadow-green-950/10 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {/* User Information */}
            <div className="border-b border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50/70 p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-green-100 ring-2 ring-white shadow-sm">
                  <img
                    src={avatarSrc}
                    alt=""
                    onError={() => {
                      if (!imageError) {
                        setImageError(true);
                      }
                    }}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-green-950">
                    {user.name || "ব্যবহারকারী"}
                  </p>

                  <div className="mt-1 flex min-w-0 items-center gap-1.5 text-gray-500">
                    <Mail size={13} className="shrink-0" />
                    <p className="truncate text-xs">{user.email}</p>
                  </div>
                </div>

                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700"
                  title="সাইন ইন করা আছে"
                >
                  <Check size={14} strokeWidth={2.5} />
                </span>
              </div>
            </div>

            {/* Dropdown Menu Items */}
            <div className="space-y-1 p-2">
              <Link
                href="/profile"
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-800 focus-visible:bg-green-50 focus-visible:outline-none"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100/80 text-green-700">
                  <UserRound size={19} />
                </span>

                <span className="flex-1">আমার প্রোফাইল</span>

                <ChevronDown size={15} className="-rotate-90 text-gray-400" />
              </Link>

              <div className="my-1 border-t border-gray-100" />

              <button
                type="button"
                role="menuitem"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700 focus-visible:bg-red-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <LogOut size={19} />
                </span>

                <span className="flex-1 text-left">
                  {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                </span>
              </button>
            </div>

            {/* Dropdown Footer */}
            <div className="border-t border-gray-100 bg-gray-50/70 px-4 py-3">
              <p className="text-center text-[11px] font-medium text-gray-400">
                আপনার প্রতিদিনের বাজার · বাজার দর
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Logged-out user interface.
  return (
    <>
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

      {/* Mobile Authentication */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        <Link
          href="/signIn"
          className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-3 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50"
        >
          <LogIn size={17} />
          সাইন ইন
        </Link>

        <Link
          href="/signUp"
          className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-3 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          <UserPlus size={17} />
          সাইন আপ
        </Link>
      </div>
    </>
  );
};

export default UserInfo;
