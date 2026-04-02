import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { ShoppingCart, ArrowLeft, Tag } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await getProductById(Number(id));
          setProduct(data);
          setSelectedImage(0);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F7F4]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="h-4 w-32 bg-[#EEEBE6] rounded-full animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-[#EEEBE6] h-72 sm:h-96 animate-pulse" />
            <div className="flex flex-col gap-4">
              <div className="h-6 w-3/4 bg-[#EEEBE6] rounded-full animate-pulse" />
              <div className="h-4 w-1/3 bg-[#EEEBE6] rounded-full animate-pulse" />
              <div className="h-20 bg-[#EEEBE6] rounded-xl animate-pulse mt-2" />
              <div className="h-10 bg-[#EEEBE6] rounded-xl animate-pulse mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9F7F4]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="font-serif text-2xl text-stone-900 mb-2">Product not found</p>
          <p className="text-[13px] text-stone-400 mb-6">This product may no longer be available.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-white text-[13px] font-medium hover:bg-stone-700 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-stone-400 hover:text-stone-700 transition-colors mb-6"
        >
          <ArrowLeft size={13} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* Image Section */}
          <div className="flex flex-col gap-3">
            {/* Main Image */}
            <div className="bg-white rounded-xl border border-[#EEEBE6] overflow-hidden flex items-center justify-center h-72 sm:h-96 p-6">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain transition-opacity duration-200"
              />
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`shrink-0 w-16 h-16 rounded-lg border overflow-hidden bg-white transition-all ${
                      selectedImage === i
                        ? "border-stone-900 ring-1 ring-stone-900"
                        : "border-[#E5E1DA] hover:border-stone-400"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            {/* Category badge */}
            {product.category && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#7C6A52] bg-[#F0EBE3] px-3 py-1 rounded-full self-start mb-3 capitalize">
                <Tag size={10} />
                {product.category.replace(/-/g, " ")}
              </span>
            )}

            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 leading-snug mb-3">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl sm:text-3xl font-bold text-stone-900">
                ₹ {product.price.toFixed(2)}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-[#EEEBE6] my-4" />

            {/* Description */}
            <p className="text-[13px] sm:text-[14px] text-stone-500 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-[14px] font-medium transition-all ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-stone-900 text-white hover:bg-stone-700"
              }`}
            >
              <ShoppingCart size={15} />
              {added ? "Added to Cart!" : "Add to Cart"}
            </button>

            {/* Trust badges */}
            <div className="mt-4 flex flex-wrap gap-3">
              {["Free returns", "Secure checkout", "Quality guaranteed"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="text-[11px] text-stone-400 flex items-center gap-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-stone-300 inline-block" />
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;