"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { login, isLoading, error, user } = useAuth();

  // Redirect based on user role after login
  useEffect(() => {
    if (user && !isLoading) {
      console.log(
        "[AdminLogin] User detected:",
        user,
        "role:",
        user.role,
        "pathname:",
        pathname
      ); // Debug

      // Only redirect from login page
      if (pathname === "/login") {
        if (user.role === "content_editor") {
          console.log("[AdminLogin] Redirecting content_editor to /cms/perks"); // Debug
          router.push("/cms/perks");
        } else {
          console.log("[AdminLogin] Redirecting to /dashboard"); // Debug
          router.push("/dashboard");
        }
      }
    }
  }, [user, isLoading, pathname, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      // Redirection is handled in useEffect after user state updates
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center">
              <span className="text-[#1a3d35] font-bold text-2xl">P</span>
            </div>
            <span className="text-2xl font-bold text-[#1a3d35]">PerkPal</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#1a3d35] mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to access your exclusive perks
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-[#1a3d35] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-yellow-400 transition"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-[#1a3d35] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-yellow-400 transition"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                  disabled={isLoading}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[#1a3d35] hover:text-yellow-400 font-medium transition"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 text-[#1a3d35] py-3 rounded-lg font-semibold hover:bg-yellow-500 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4"></div>
          </form>
        </div>
      </div>
      {/* Right Side - Visual Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1a3d35] to-[#2a4d45] items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <div className="mb-8"></div>

          {/* Stats */}

          {/* Testimonial */}
        </div>
      </div>
    </div>
  );
}
