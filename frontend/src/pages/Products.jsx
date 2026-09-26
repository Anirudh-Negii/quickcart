import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { ClockLoader } from "react-spinners";
import { X, Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Products() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

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

  function openAddProduct() {
    setEditingProduct(null);
    reset({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: null,
    });
    setShowAddProduct(true);
  }

  function closeProductModal() {
    setShowAddProduct(false);
    setEditingProduct(null);

    reset({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: null,
    });
  }

  function openEditProduct(product) {
    setShowAddProduct(false);
    setEditingProduct(product);

    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  }

  async function onSubmit(data) {
    try {
      const imageFile = data.image?.[0];

      if (editingProduct) {
        let imageUrl = editingProduct.image;

        if (imageFile) {
          imageUrl = await uploadImage(imageFile);
        }

        await api.put(`/products/${editingProduct._id}`, {
          name: data.name,
          description: data.description,
          price: Number(data.price),
          stock: Number(data.stock),
          image: imageUrl,
        });

        toast.success("Product updated successfully");
      } else {
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
      }

      closeProductModal();
      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (editingProduct
            ? "Failed to update product"
            : "Failed to create product"),
      );
    }
  }

  async function handleDelete() {
    if (!deletingProduct) {
      return;
    }

    try {
      setDeleting(true);

      await api.delete(`/products/${deletingProduct._id}`);

      toast.success("Product deleted successfully");

      setDeletingProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      setDeleting(false);
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
                onClick={openAddProduct}
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
                <div
                  key={product._id}
                  className="overflow-hidden rounded-xl border border-neutral-800 bg-[#242424] transition-transform hover:-translate-y-1"
                >
                  <Link
                    to={`/products/${product._id}`}
                    className="block cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-56 w-full object-cover"
                    />

                    <div className="p-5 pb-3">
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

                  {user && (
                    <div className="flex gap-3 px-5 pb-5">
                      <button
                        onClick={() => openEditProduct(product)}
                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-700 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-orange-500 hover:text-orange-500"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>

                      <button
                        onClick={() => setDeletingProduct(product)}
                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-700 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-red-500 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add / Edit Product Modal */}
      {(showAddProduct || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 px-6 py-10">
          <div className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-[#242424] p-8">
            <button
              type="button"
              onClick={closeProductModal}
              className="absolute right-4 top-4 cursor-pointer text-gray-400 transition-colors hover:text-white"
              aria-label="Close product modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-orange-500">
                Products
              </p>

              <h2 className="text-2xl font-bold text-white">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
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
                  {editingProduct && (
                    <span className="ml-2 text-xs text-gray-500">Optional</span>
                  )}
                </label>

                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: editingProduct
                      ? false
                      : "Product image is required",
                  })}
                  className="w-full cursor-pointer rounded-lg border border-neutral-700 bg-[#1c1c1c] px-4 py-3 text-sm text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-orange-600"
                />

                {editingProduct && (
                  <p className="mt-2 text-xs text-gray-500">
                    Leave empty to keep the current image.
                  </p>
                )}

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
                {isSubmitting
                  ? editingProduct
                    ? "Updating Product..."
                    : "Creating Product..."
                  : editingProduct
                    ? "Update Product"
                    : "Create Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
          <div className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-[#242424] p-8">
            <button
              type="button"
              onClick={() => setDeletingProduct(null)}
              className="absolute right-4 top-4 cursor-pointer text-gray-400 transition-colors hover:text-white"
              aria-label="Close delete modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-red-400">
                Delete Product
              </p>

              <h2 className="text-2xl font-bold text-white">
                Delete this product?
              </h2>

              <p className="mt-3 leading-6 text-gray-400">
                Are you sure you want to delete{" "}
                <span className="font-medium text-white">
                  {deletingProduct.name}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeletingProduct(null)}
                disabled={deleting}
                className="flex-1 cursor-pointer rounded-lg border border-neutral-700 px-5 py-3 font-medium text-gray-300 transition-colors hover:border-neutral-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 cursor-pointer rounded-lg bg-red-500 px-5 py-3 font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
