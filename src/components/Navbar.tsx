import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between px-8 h-15 bg-[#F9F7F4] border-b border-[#E5E1DA]">
      <Link to={"/"}>
        <span className="font-serif text-xl font-medium tracking-tight text-stone-900">
          shop<span className="text-[#7C6A52]">.</span>
        </span>
      </Link>

      <ul className="flex gap-8 list-none">
        {[
          { label: "Home", to: "/" },
          { label: "Cart", to: "/cart" },
        ].map(({ label, to }) => (
          <li key={to}>
            <Link
              to={to}
              className={`text-[15px] tracking-wide transition-colors ${
                pathname === to
                  ? "text-stone-900 font-medium"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to="/cart"
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900 text-white text-[13px] font-medium"
      >
        <ShoppingCart size={"15px"} />
      </Link>
    </nav>
  );
}

export default Navbar;
