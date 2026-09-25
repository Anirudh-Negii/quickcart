import { Link } from "react-router";

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Immersive sound with a comfortable wireless design.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track your day with a modern and stylish smartwatch.",
    price: 3999,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    description: "A responsive keyboard built for work and everyday use.",
    price: 3299,
    image: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVjaGFuaWNhbCUyMEtleWJvYXJkfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    description: "Smooth and precise control with a clean ergonomic design.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1660491083562-d91a64d6ea9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2lyZWxlc3MlMjBtb3VzZXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

function FeaturedProducts() {
  return (
    <section className="bg-[#1c1c1c] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-orange-500">
              Shop now
            </p>

            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
          </div>

          <Link
            to="/products"
            className="cursor-pointer rounded-lg bg-orange-500 px-5 py-2.5 font-medium text-white transition-colors hover:bg-orange-600"
          >
            Show All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-xl border border-neutral-800 bg-[#242424]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {product.name}
                </h3>

                <p className="mb-4 text-sm leading-6 text-gray-400">
                  {product.description}
                </p>

                <p className="text-lg font-semibold text-orange-500">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
