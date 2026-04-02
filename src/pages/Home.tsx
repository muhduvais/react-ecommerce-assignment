import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product } from "../types";
import { getProducts, getProductsByCategory } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const CATEGORIES = [
  "all",
  "smartphones",
  "laptops",
  "fragrances",
  "beauty",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "mens-shirts",
];

const SORT_OPTIONS = [
  { label: "A → Z", sortBy: "title", order: "asc" },
  { label: "Z → A", sortBy: "title", order: "desc" },
  { label: "Price: Low → High", sortBy: "price", order: "asc" },
  { label: "Price: High → Low", sortBy: "price", order: "desc" },
];

const PAGE_SIZE = 12;

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const sortBy = searchParams.get("sortBy") ?? "";
  const order = searchParams.get("order") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const queryParams = new URLSearchParams();
        queryParams.set("limit", String(PAGE_SIZE));
        queryParams.set("skip", String(skip));
        if (sortBy) queryParams.set("sortBy", sortBy);
        if (order) queryParams.set("order", order);
        const queryString = queryParams.toString();

        let data: { products: Product[]; total: number };

        if (category && category !== "all") {
          data = await getProductsByCategory(category, queryString);
        } else {
          data = await getProducts(queryString);
        }

        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sortBy, order, page]);

  const setParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(key, value);
      if (key !== "page") next.set("page", "1");
      return next;
    });
  };

  const setSort = (newSortBy: string, newOrder: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sortBy", newSortBy);
      next.set("order", newOrder);
      next.set("page", "1");
      return next;
    });
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1,
  ).filter(
    (p) => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1),
  );

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-1 capitalize">
            {category === "all" ? "All Products" : category.replace(/-/g, " ")}
          </h1>
          <p className="text-[13px] text-stone-400">
            Showing {products.length} of {total} items
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setParam("category", cat)}
                className={`text-[12px] px-4 py-1.5 rounded-full border transition-colors capitalize whitespace-nowrap shrink-0 ${
                  category === cat
                    ? "bg-stone-900 border-stone-900 text-white"
                    : "bg-white border-[#E5E1DA] text-stone-500 hover:border-stone-400 hover:text-stone-700"
                }`}
              >
                {cat === "all" ? "All" : cat.replace(/-/g, " ")}
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <select
              value={sortBy && order ? `${sortBy}:${order}` : ""}
              onChange={(e) => {
                if (!e.target.value) return;
                const [sb, ord] = e.target.value.split(":");
                setSort(sb, ord);
              }}
              className="text-[13px] px-3 py-1.5 rounded-lg border border-[#E5E1DA] bg-white text-stone-600 w-full sm:w-40"
            >
              <option value="">Sort by</option>
              {SORT_OPTIONS.map((o) => (
                <option
                  key={`${o.sortBy}:${o.order}`}
                  value={`${o.sortBy}:${o.order}`}
                >
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#EEEBE6] h-56 sm:h-64 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex gap-1.5 justify-center">
            <button
              onClick={() => setParam("page", String(Math.max(1, page - 1)))}
              disabled={page === 1}
              className="w-9 h-9 rounded-lg border border-[#E5E1DA] bg-white text-stone-500 text-[13px] disabled:opacity-30"
            >
              ←
            </button>

            {visiblePages.map((p, i) => {
              const prev = visiblePages[i - 1];
              return (
                <>
                  {prev && p - prev > 1 && (
                    <span
                      key={`ellipsis-${p}`}
                      className="w-9 h-9 flex items-center justify-center text-stone-400 text-[13px]"
                    >
                      …
                    </span>
                  )}
                  <button
                    key={p}
                    onClick={() => setParam("page", String(p))}
                    className={`w-9 h-9 rounded-lg border text-[13px] transition-colors ${
                      p === page
                        ? "bg-stone-900 border-stone-900 text-white"
                        : "bg-white border-[#E5E1DA] text-stone-500 hover:border-stone-400"
                    }`}
                  >
                    {p}
                  </button>
                </>
              );
            })}

            <button
              onClick={() =>
                setParam("page", String(Math.min(totalPages, page + 1)))
              }
              disabled={page === totalPages}
              className="w-9 h-9 rounded-lg border border-[#E5E1DA] bg-white text-stone-500 text-[13px] disabled:opacity-30"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
