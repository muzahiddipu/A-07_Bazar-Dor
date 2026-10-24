export default function CategoryLoading() {
  return (
    <section
      aria-label="ক্যাটাগরির পণ্য লোড হচ্ছে"
      className="min-h-[60vh] bg-gradient-to-b from-green-50/50 to-white"
    >
      <div className="mx-auto w-full max-w-7xl animate-pulse px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="h-5 w-24 rounded bg-green-100" />
        <div className="mt-8 flex items-center gap-4 rounded-3xl border border-green-100 bg-white p-5 sm:p-8">
          <div className="h-14 w-14 rounded-2xl bg-green-100 sm:h-16 sm:w-16" />
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-gray-100" />
            <div className="h-8 w-40 rounded bg-gray-100 sm:w-56" />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-36 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-xl bg-green-50" />
                <div className="space-y-2">
                  <div className="h-5 w-28 rounded bg-gray-100" />
                  <div className="h-4 w-20 rounded bg-gray-100" />
                </div>
              </div>
              <div className="mt-5 h-px bg-gray-100" />
              <div className="mt-4 h-5 w-32 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
