import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      quantity: 1,
    });
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col">
      <img
        src={product.images[0]}
        alt={product.title}
        className="h-40 object-contain mb-4"
      />

      <h2 className="text-sm font-semibold line-clamp-2">{product.title}</h2>

      <p className="text-lg font-bold mt-2">₹ {product.price}</p>

      <button
        onClick={handleAdd}
        className="mt-auto bg-black text-white py-2 rounded hover:opacity-80 flex gap-x-2 items-center justify-center cursor-pointer"
      >
        <span>Add to Cart</span>
        <ShoppingCart size={"15px"} />
      </button>
    </div>
  );
};

export default ProductCard;
