import { useState } from "react";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
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

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="border rounded-lg p-4 shadow-sm flex flex-col cursor-pointer hover:shadow-md transition-shadow"
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className="h-40 object-contain mb-4"
      />

      <h2 className="text-sm font-semibold line-clamp-2">{product.title}</h2>

      <p className="text-lg font-bold mt-2">$ {product.price}</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAdd();
        }}
        disabled={added}
        className={`mt-auto py-2 rounded flex gap-x-2 items-center justify-center cursor-pointer transition-all duration-300 ${
          added 
            ? "bg-emerald-600 text-white" 
            : "bg-black text-white hover:opacity-80"
        }`}
      >
        {added ? <Check size={15} /> : <ShoppingCart size={15} />}
        <span>{added ? "Added!" : "Add to Cart"}</span>
      </button>
    </div>
  );
};

export default ProductCard;