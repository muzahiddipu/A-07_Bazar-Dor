export const BAZARDOR_API_URL = "https://api.abcz.workers.dev/api/bazardor";

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface Product {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export interface ProductMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ProductDetail extends Product {
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  markets: ProductMarket[];
}

export function isCategory(value: unknown): value is Category {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const category = value as Record<string, unknown>;

  return (
    typeof category.id === "string" &&
    typeof category.slug === "string" &&
    typeof category.nameBn === "string" &&
    typeof category.icon === "string"
  );
}

export function isProductDetail(value: unknown): value is ProductDetail {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const product = value as Record<string, unknown>;

  return (
    (typeof product.id === "number" || typeof product.id === "string") &&
    typeof product.slug === "string" &&
    typeof product.nameBn === "string" &&
    typeof product.category === "string" &&
    typeof product.categoryNameBn === "string" &&
    typeof product.categoryIcon === "string" &&
    typeof product.unit === "string" &&
    typeof product.image === "string" &&
    typeof product.today === "number" &&
    Number.isFinite(product.today) &&
    typeof product.yesterday === "number" &&
    Number.isFinite(product.yesterday) &&
    typeof product.lastWeek === "number" &&
    Number.isFinite(product.lastWeek) &&
    typeof product.lastMonth === "number" &&
    Number.isFinite(product.lastMonth) &&
    typeof product.change === "object" &&
    product.change !== null &&
    "dir" in product.change &&
    (product.change.dir === "up" ||
      product.change.dir === "down" ||
      product.change.dir === "flat") &&
    "pct" in product.change &&
    typeof product.change.pct === "number" &&
    Number.isFinite(product.change.pct) &&
    Array.isArray(product.markets) &&
    product.markets.every(
      (market) =>
        typeof market === "object" &&
        market !== null &&
        "market" in market &&
        typeof market.market === "string" &&
        "division" in market &&
        typeof market.division === "string" &&
        "min" in market &&
        typeof market.min === "number" &&
        Number.isFinite(market.min) &&
        "max" in market &&
        typeof market.max === "number" &&
        Number.isFinite(market.max),
    )
  );
}
