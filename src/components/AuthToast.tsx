"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthToast() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const result = url.searchParams.get("socialAuth");
    const provider = url.searchParams.get("provider");

    if (result !== "success" && result !== "error") return;

    url.searchParams.delete("socialAuth");
    url.searchParams.delete("provider");
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );

    if (provider !== "google" && provider !== "github") return;

    const providerName = provider === "google" ? "Google" : "GitHub";

    if (result === "success") {
      toast.success(`${providerName} দিয়ে সফলভাবে সাইন ইন হয়েছে!`);
    } else {
      toast.error(`${providerName} দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।`);
    }
  }, []);

  return null;
}
