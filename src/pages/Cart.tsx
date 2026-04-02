import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const subtotal = totalPrice;
  const shipping = subtotal > 40 ? 0 : 0.10;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F7F4]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#EEEBE6] flex items-center justify-center mb-6">
            <ShoppingBag size={32} className="text-stone-400" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-[14px] text-stone-400 mb-8 max-w-xs">
            Looks like you haven't added anything yet. Explore our collection to
            get started.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-white text-[13px] font-medium hover:bg-stone-700 transition-colors"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-stone-400 hover:text-stone-700 transition-colors mb-3"
          >
            <ArrowLeft size={13} />
            Continue Shopping
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
            Your Cart
          </h1>
          <p className="text-[13px] text-stone-400 mt-0.5">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {cart && cart.length > 0 && cart.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-xl border border-[#EEEBE6] p-4 flex gap-4"
              >
                {/* Product Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg bg-[#F9F7F4] border border-[#EEEBE6] overflow-hidden">
                  <img
                    src={item.images && item.images.length > 0 ? item.images[0] : ""}
                    alt={item.title}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[13px] sm:text-[14px] font-medium text-stone-800 line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-stone-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 border border-[#E5E1DA] rounded-lg bg-[#F9F7F4] px-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-[13px] font-medium text-stone-800 w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-[14px] sm:text-[15px] font-semibold text-stone-900">
                      $ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-[#EEEBE6] p-5 sticky top-20">
              <h2 className="font-serif text-lg font-medium text-stone-900 mb-4">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 text-[13px]">
                <div className="flex justify-between text-stone-500">
                  <span>
                    Subtotal ({cart.length}{" "}
                    {cart.length === 1 ? "item" : "items"})
                  </span>
                  <span className="text-stone-700 font-medium">
                    $ {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-stone-500">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-medium">Free</span>
                  ) : (
                    <span className="text-stone-700 font-medium">
                      $ {shipping.toFixed(2)}
                    </span>
                  )}
                </div>

                {shipping > 0 && (
                  <p className="text-[11px] text-stone-400 bg-[#F9F7F4] rounded-lg px-3 py-2 leading-relaxed">
                    Add $ {(999 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}

                <div className="border-t border-[#EEEBE6] pt-3 flex justify-between">
                  <span className="font-semibold text-stone-900 text-[14px]">
                    Total
                  </span>
                  <span className="font-bold text-stone-900 text-[15px]">
                    $ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full mt-5 py-3 rounded-xl bg-stone-900 text-white text-[13px] font-medium hover:bg-stone-700 transition-colors">
                Proceed to Checkout
              </button>

              <p className="text-center text-[11px] text-stone-400 mt-3">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;