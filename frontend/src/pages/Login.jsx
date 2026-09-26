import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  async function onSubmit(data) {
    setServerError("");

    try {
      const response = await api.post("/auth/login", data);
      const { accessToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (error) {
      setServerError(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1c1c1c] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>

          <p className="mt-2 text-gray-400">
            Login to your <span className="text-orange-500">QuickCart</span>{" "}account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-neutral-800 bg-[#242424] p-8"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full rounded-lg border border-neutral-700 bg-[#1c1c1c] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-orange-500"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full rounded-lg border border-neutral-700 bg-[#1c1c1c] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-orange-500"
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {serverError && (
            <p className="mt-5 text-center text-sm text-red-400">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full cursor-pointer rounded-lg bg-orange-500 px-5 py-3 font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="cursor-pointer text-orange-500 transition-colors hover:text-orange-400"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
