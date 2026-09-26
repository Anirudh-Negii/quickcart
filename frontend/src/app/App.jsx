import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { ClockLoader } from "react-spinners";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PublicRoute from "../components/PublicRoute";
import { Toaster } from "react-hot-toast";
import NotFound from "../pages/NotFound";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#242424",
            color: "#fff",
            border: "1px solid #404040",
          },
          success: {
            iconTheme: {
              primary: "#f97316",
              secondary: "#fff",
            },
          },
        }}
      />

      <Navbar />

      <Suspense
        fallback={
          <main className="flex min-h-screen items-center justify-center bg-[#1c1c1c]">
            <ClockLoader color="#f97316" size={60} />
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
