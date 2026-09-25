import { useEffect, useState } from "react";
import api from "../api/axios";
import { ClockLoader } from "react-spinners";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data.data.products);
    } catch (error) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#1c1c1c]">
        <ClockLoader color="#f97316" size={60} />
        <p className="text-xl text-gray-400">Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#1c1c1c]">
        <p className="text-red-400">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1c1c1c] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-orange-500">
            Our Store
          </p>
          <h1 className="text-4xl font-bold text-white">All Products</h1>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-400">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-xl border border-neutral-800 bg-[#242424]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="mb-2 text-lg font-semibold text-white">
                    {product.name}
                  </h2>
                  <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-400">
                    {product.description}
                  </p>
                  <p className="text-lg font-semibold text-orange-500">
                    ₹ {product.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
export default Products;
