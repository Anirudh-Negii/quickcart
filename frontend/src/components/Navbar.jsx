import { NavLink } from "react-router";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `cursor-pointer transition-colors ${
      isActive ? "text-orange-500" : "text-gray-300 hover:text-orange-500"
    }`;

  return (
    <nav className="border-b border-neutral-800 bg-[#242424]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="cursor-pointer text-2xl font-bold text-orange-500"
        >
          QuickCart
        </NavLink>

        <div className="flex items-center gap-10">
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>

          <NavLink to="/register" className={navLinkClass}>
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
