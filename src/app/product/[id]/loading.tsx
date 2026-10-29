export default function ProductDetailsLoading() {
  return (
    <section
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
      className="min-h-screen bg-gradient-to-b from-green-50/50 to-white"
    >
      <div className="mx-auto w-full max-w-7xl animate-pulse px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="h-4 w-52 rounded bg-green-100" />
        <div className="mt-8 grid overflow-hidden rounded-3xl border border-green-100 bg-white lg:grid-cols-2">
          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-2xl bg-green-100 sm:h-24 sm:w-24" />
              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-gray-100" />
                <div className="h-8 w-44 rounded bg-gray-100 sm:w-60" />
                <div className="h-4 w-32 rounded bg-gray-100" />
              </div>
            </div>
            <div className="mt-7 h-5 w-56 rounded bg-gray-100" />
          </div>
          <div className="border-t border-green-100 bg-green-50/60 p-6 lg:border-l lg:border-t-0 sm:p-10">
            <div className="h-40 rounded-2xl bg-white" />
          </div>
        </div>
        <div className="mt-10 h-8 w-48 rounded bg-gray-100" />
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="h-36 rounded-2xl bg-white" />
          ))}
        </div>
        <div className="mt-10 h-8 w-60 rounded bg-gray-100" />
        <div className="mt-5 h-72 rounded-2xl bg-white" />
      </div>
    </section>
  );
}
