import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ClockLoader } from "react-spinners";
import api from "../api/axios";
import { ArrowLeft } from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchProduct() {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.data.product);
    } catch (error) {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#1c1c1c]">
        <ClockLoader color="#f97316" size={60} />
        <p className="text-xl text-gray-400">Loading product...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#1c1c1c] px-6 text-center">
        <div className="max-w-md">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-orange-500">
            Product Unavailable
          </p>

          <h1 className="mb-4 text-4xl font-bold text-white">
            Product not found
          </h1>

          <p className="mb-8 text-lg leading-7 text-gray-400">
            We couldn't find the product you're looking for. It may have been
            removed, or the link you followed may no longer be valid.
          </p>

          <Link
            to="/products"
            className="inline-flex cursor-pointer items-center rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1c1c1c] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/products"
          className="mb-8 flex cursor-pointer items-center gap-1 text-gray-400 transition-colors hover:text-orange-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid overflow-hidden rounded-2xl border border-neutral-800 bg-[#242424] md:grid-cols-2">
          <div className="h-full">
            <img
              src={product.image}
              alt={product.name}
              className="h-full min-h-96 w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-8 md:p-10">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-orange-500">
              Product Details
            </p>

            <h1 className="mb-5 text-4xl font-bold text-white">
              {product.name}
            </h1>

            <p className="mb-8 leading-7 text-gray-400">
              {product.description}
            </p>

            <p className="mb-4 text-3xl font-bold text-orange-500">
              ₹ {product.price.toLocaleString("en-IN")}
            </p>

            <p className="mb-8 text-gray-400">
              Stock:{" "}
              <span className="font-medium text-white">{product.stock}</span>
            </p>

            <Link
              to="/products"
              className="w-fit cursor-pointer rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
