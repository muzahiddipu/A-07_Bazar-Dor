import Link from "next/link";

export default function ProductNotFound() {
  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <span
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl"
      >
        🔎
      </span>
      <h1 className="mt-5 text-2xl font-bold text-gray-950 sm:text-3xl">
        পণ্যটি পাওয়া যায়নি
      </h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
        পণ্যটি সরিয়ে ফেলা হয়েছে অথবা ঠিকানাটি সঠিক নয়।
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
      >
        সব পণ্য দেখুন
      </Link>
    </section>
  );
}
