import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const password = watch("password");

  async function onSubmit(data) {
    setServerError("");

    try {
      await api.post("/auth/register", data);
      navigate("/login");
    } catch (error) {
      setServerError(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1c1c1c] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-2 text-gray-400">
            Join <span className="text-orange-500">QuickCart</span> and start shopping.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-neutral-800 bg-[#242424] p-8"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name must not exceed 50 characters",
                  },
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
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
                    message:
                      "Password must contain uppercase, lowercase and special character",
                  },
                })}
                className="w-full rounded-lg border border-neutral-700 bg-[#1c1c1c] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-orange-500"
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full rounded-lg border border-neutral-700 bg-[#1c1c1c] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-orange-500"
              />

              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword.message}
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
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="cursor-pointer text-orange-500 transition-colors hover:text-orange-400"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Register;
