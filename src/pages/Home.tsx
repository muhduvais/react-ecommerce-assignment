import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product } from "../types";
import { getProducts, getProductsByCategory } from "../services/productService";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data: Product[];

        if (category) {
          data = await getProductsByCategory(category);
        } else {
          data = await getProducts();
        }

        if (sort === "price-asc") {
          data = [...data].sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc") {
          data = [...data].sort((a, b) => b.price - a.price);
        } else if (sort === "z-a") {
          data = [...data].sort((a, b) => b.title.localeCompare(a.title));
        } else if (sort === "a-z") {
          data = [...data].sort((a, b) => a.title.localeCompare(b.title));
        }

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [category, sort]);

  const handleCategoryChange = (category: string) => {
    setSearchParams({ category });
  };

  const clearFilter = () => {
    setSearchParams({});
  };

  return (
    <>
      <div>Home Page</div>
      <button onClick={() => handleCategoryChange("electronics")}>
        Electronics
      </button>
      <button onClick={clearFilter}>All</button>
    </>
  );
}
export default Home;
