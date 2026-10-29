import MarqueeTrack from "./MarqueeTrack";

export interface Product {
  id: string | number;
  categoryIcon: string;
  nameBn: string;
  unit: string;
  today: number;
  change: {
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  if (!res.ok) {
    throw new Error("পণ্যের দাম লোড করা যায়নি।");
  }

  const data: Product[] = await res.json();

  return (
    <section
      aria-label="আজকের বাজারদর"
      className="relative isolate border-b border-emerald-100/80 bg-white"
    >
      <div className="flex min-h-12 items-stretch sm:min-h-14">
        <div className="relative z-20 flex shrink-0 items-center gap-1.5 bg-emerald-800 px-2.5 text-white sm:gap-2.5 sm:px-5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-sm font-bold sm:h-8 sm:w-8 sm:rounded-lg sm:text-base">
            ৳
          </span>
          <span className="whitespace-nowrap">
            <span className="block text-[11px] font-bold leading-tight sm:text-sm">
              বাজারদর
            </span>
            <span className="mt-0.5 hidden text-[10px] leading-tight text-emerald-100/90 sm:block">
              আজকের দর
            </span>
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-px bg-white/15"
          />
        </div>

        <MarqueeTrack products={data} />
      </div>
    </section>
  );
};

export default Marquee;
