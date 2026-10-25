import {
  BAZARDOR_API_URL,
  isCategory,
  isProductDetail,
  type Category,
  type Product,
  type ProductDetail,
} from "@/lib/bazardor-types";

// Validate each API item before passing external data into typed UI components.
function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const product = value as Record<string, unknown>;
  const change = product.change;

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
    typeof change === "object" &&
    change !== null &&
    "dir" in change &&
    (change.dir === "up" || change.dir === "down" || change.dir === "flat") &&
    "pct" in change &&
    typeof change.pct === "number" &&
    Number.isFinite(change.pct)
  );
}

async function fetchProducts(url: string | URL): Promise<Product[]> {
  const response = await fetch(url, { next: { revalidate: 300 } });

  if (!response.ok) {
    throw new Error(`Product API error: ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new Error("Invalid product API response");
  }

  return data;
}

// Fetch category details; a 404 represents an invalid category slug.
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const response = await fetch(
    `${BAZARDOR_API_URL}/categories/${encodeURIComponent(slug)}`,
    { next: { revalidate: 300 } },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Category API error: ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!isCategory(data)) {
    throw new Error("Invalid category API response");
  }

  return data;
}

// Fetch and validate only products assigned to the requested category.
export async function getProductsByCategory(
  slug: string,
): Promise<Product[]> {
  const url = new URL(`${BAZARDOR_API_URL}/products`);
  url.searchParams.set("category", slug);

  return fetchProducts(url);
}

// Shared full catalog fetch for the homepage and price movement sections.
export async function getAllProducts(): Promise<Product[]> {
  return fetchProducts(`${BAZARDOR_API_URL}/products`);
}

// Fetch a single product by its numeric API id or return null when missing.
export async function getProductById(
  id: string,
): Promise<ProductDetail | null> {
  const response = await fetch(
    `${BAZARDOR_API_URL}/products/${encodeURIComponent(id)}`,
    { next: { revalidate: 300 } },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Product API error: ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!isProductDetail(data)) {
    throw new Error("Invalid product detail API response");
  }

  return data;
}
