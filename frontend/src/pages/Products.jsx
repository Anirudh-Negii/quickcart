import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { ClockLoader } from "react-spinners";
import { X, Plus } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Products() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function fetchProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data.data.products);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function uploadImage(file) {
    const response = await api.get("/imagekit/auth");

    const { token, expire, signature, publicKey } = response.data;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("publicKey", publicKey);
    formData.append("signature", signature);
    formData.append("expire", expire);
    formData.append("token", token);

    const uploadResponse = await fetch(
      "https://upload.imagekit.io/api/v1/files/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    if (!uploadResponse.ok) {
      throw new Error("Image upload failed");
    }

    const uploadData = await uploadResponse.json();

    return uploadData.url;
  }

  async function onSubmit(data) {
    try {
      const imageFile = data.image?.[0];

      if (!imageFile) {
        toast.error("Please select an image");
        return;
      }

      const imageUrl = await uploadImage(imageFile);

      await api.post("/products", {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        image: imageUrl,
      });

      toast.success("Product created successfully");

      reset();
      setShowAddProduct(false);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#1c1c1c]">
        <ClockLoader color="#f97316" size={60} />
        <p className="text-xl text-gray-400">Loading products...</p>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#1c1c1c] px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-medium uppercase text-orange-500">
                Products
              </h1>

              <p className="mt-2 text-gray-400">
                Browse our collection of products.
              </p>
            </div>

            {user && (
              <button
                onClick={() => setShowAddProduct(true)}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-medium text-white transition-colors hover:bg-orange-600"
              >
                <Plus className="h-5 w-5" />
                Add Product
              </button>
            )}
          </div>

          {products.length === 0 ? (
            <div className="flex min-h-96 items-center justify-center rounded-2xl border border-neutral-800 bg-[#242424]">
              <p className="text-lg text-gray-400">No products available.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-[#242424] transition-transform hover:-translate-y-1"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-5">
                    <h2 className="mb-2 text-xl font-semibold text-white">
                      {product.name}
                    </h2>

                    <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-400">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-orange-500">
                        ₹ {product.price.toLocaleString("en-IN")}
                      </p>

                      <p className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {showAddProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 px-6 py-10">
          <div className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-[#242424] p-8">
            <button
              type="button"
              onClick={() => {
                setShowAddProduct(false);
                reset();
              }}
              className="absolute right-4 top-4 cursor-pointer text-gray-400 transition-colors hover:text-white"
              aria-label="Close add product modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-orange-500">
                Products
              </p>

              <h2 className="text-2xl font-bold text-white">Add Product</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Product Name
                </label>

                <input
                  type="text"
                  placeholder="Enter product name"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  className="w-full rounded-lg border border-neutral-700 bg-[#1c1c1c] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-orange-500"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Description
                </label>

                <textarea
                  rows="4"
                  placeholder="Enter product description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full resize-none rounded-lg border border-neutral-700 bg-[#1c1c1c] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-orange-500"
                />

                {errors.description && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter price"
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 0,
                        message: "Price cannot be negative",
                      },
                    })}
                    className="w-full rounded-lg border border-neutral-700 bg-[#1c1c1c] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-orange-500"
                  />

                  {errors.price && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Stock
                  </label>

                  <input
                    type="number"
                    min="0"
                    placeholder="Enter stock"
                    {...register("stock", {
                      required: "Stock is required",
                      min: {
                        value: 0,
                        message: "Stock cannot be negative",
                      },
                    })}
                    className="w-full rounded-lg border border-neutral-700 bg-[#1c1c1c] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-orange-500"
                  />

                  {errors.stock && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: "Product image is required",
                  })}
                  className="w-full cursor-pointer rounded-lg border border-neutral-700 bg-[#1c1c1c] px-4 py-3 text-sm text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-orange-600"
                />

                {errors.image && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.image.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer rounded-lg bg-orange-500 px-5 py-3 font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating Product..." : "Create Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
