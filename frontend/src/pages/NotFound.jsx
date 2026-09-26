import { Link } from "react-router";

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1c1c1c] px-6">
      <div className="max-w-lg text-center">
        <p className="mb-3 text-7xl font-bold text-orange-500">404</p>

        <h1 className="mb-4 text-3xl font-bold text-white">Page not found</h1>

        <p className="mb-8 text-lg leading-7 text-gray-400">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600"
          >
            Back to Home
          </Link>

          <Link
            to="/products"
            className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-neutral-700 px-6 py-3 font-medium text-gray-300 transition-colors hover:border-orange-500 hover:text-orange-500"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
