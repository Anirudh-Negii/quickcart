import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, loading } = useAuth();
  const navLinkClass = ({ isActive }) =>
    `cursor-pointer transition-colors ${
      isActive ? "text-orange-500" : "text-gray-300 hover:text-orange-500"
    }`;
  const firstName = user.name.split(" ")[0].charAt(0).toUpperCase() + user.name.split(" ")[0].slice(1).toLowerCase();

  return (
    <nav className="border-b border-neutral-800 bg-[#242424]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="cursor-pointer text-2xl font-bold text-orange-500"
        >
          QuickCart
        </NavLink>

        <div className="flex items-center gap-6">
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          {!loading &&
            (user ? (
              <span className="font-medium text-white">{firstName}</span>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>

                <NavLink to="/register" className={navLinkClass}>
                  Register
                </NavLink>
              </>
            ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
