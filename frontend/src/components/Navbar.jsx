import { useState } from "react";
import { NavLink } from "react-router";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

function Navbar() {
  const { user, setUser, loading } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `cursor-pointer transition-colors ${
      isActive ? "text-orange-500" : "text-gray-300 hover:text-orange-500"
    }`;

  const firstName = user
    ? user.name.split(" ")[0].charAt(0).toUpperCase() +
      user.name.split(" ")[0].slice(1).toLowerCase()
    : "";

  async function handleLogout() {
    try {
      await api.post("/auth/logout");

      localStorage.removeItem("accessToken");
      setUser(null);

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  }

  return (
    <>
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
                <>
                  <button
                    onClick={() => setShowProfile(true)}
                    className="cursor-pointer font-medium text-white transition-colors hover:text-orange-500"
                  >
                    {firstName}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="cursor-pointer text-gray-300 transition-colors hover:text-orange-500"
                  >
                    Logout
                  </button>
                </>
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

      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
          <div className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-[#242424] p-8">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute right-4 top-4 cursor-pointer text-gray-400 transition-colors hover:text-red-500"
              aria-label="Close profile"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-orange-500">
                Your Profile
              </p>

              <h2 className="text-2xl font-bold text-white">
                Account Information
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-1 text-sm text-gray-500">Full Name</p>
                <p className="text-lg font-medium text-white">{user.name}</p>
              </div>

              <div>
                <p className="mb-1 text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium text-white">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
