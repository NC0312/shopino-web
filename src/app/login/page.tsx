"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Phone,
  Loader2,
  ShoppingBag,
  Package,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const loadingToast = toast.loading(
      isLogin ? "Signing in..." : "Creating your account..."
    );

    try {
      const response = await fetch(
        isLogin
          ? "https://shopinobackend.onrender.com/api/login"
          : "https://shopinobackend.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(
            isLogin
              ? {
                  email: formData.email.trim(),
                  password: formData.password,
                }
              : {
                  username: formData.name?.trim(),
                  email: formData.email.trim(),
                  password: formData.password,
                  phone: formData.phone.replace(/\D/g, ""),
                }
          ),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      // Store token and user data
      if (data.token) {
        localStorage.setItem("token", data.token);
        // Store user data
        const userData = {
          _id: data.userId,
          username: data.data?.username || formData.name,
          email: data.data?.email || formData.email,
          phone: data.data?.phone || formData.phone,
        };
        localStorage.setItem("user", JSON.stringify(userData));
      }

      toast.dismiss(loadingToast);
      toast.success(
        isLogin
          ? "Welcome back to Shopino!"
          : "Account created successfully! Welcome to Shopino!",
        {
          description: isLogin
            ? "You've been successfully signed in."
            : "Your account has been created and you're now signed in.",
        }
      );

      router.push("/");
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error instanceof Error ? error.message : "Please try again.";

      toast.error("Authentication Failed", {
        description: errorMessage,
      });

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "phone") {
        const digits = value.replace(/\D/g, "").slice(0, 10);
        const formattedValue =
          digits.length > 0
            ? digits.length <= 5
              ? digits
              : `${digits.slice(0, 5)}-${digits.slice(5)}`
            : "";

        setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    // Show mode switch toast
    toast.info(isLogin ? "Switch to Sign Up" : "Switch to Sign In", {
      description: isLogin
        ? "Create a new account to start shopping!"
        : "Welcome back! Sign in to your account.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-0">
      {/* Add Sonner Toaster component */}
      <Toaster position="bottom-right" expand={false} richColors closeButton />
      <div className="flex min-h-screen items-center justify-center">
        {/* Main Container */}
        <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">
          {/* Left Section - Interactive Shopping Animation */}
          <div className="relative hidden md:flex flex-col items-center justify-center bg-[#1D2564] p-12 overflow-hidden">
            {/* Animated Shopping Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ShoppingBag className="w-12 h-12 text-white opacity-20" />
                </motion.div>
              </div>
              <div className="absolute top-2/3 right-1/4">
                <motion.div
                  animate={{
                    y: [0, -30, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <Package className="w-16 h-16 text-white opacity-20" />
                </motion.div>
              </div>
              {/* Additional floating elements */}
              {[...Array(20)].map((_, i) => {
                // Create deterministic patterns using index
                const row = Math.floor(i / 5); // 4 rows
                const col = i % 5; // 5 columns

                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                    style={{
                      top: `${15 + row * 25}%`,
                      left: `${10 + col * 20}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 2 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                );
              })}
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h1 className="text-4xl font-bold text-white mb-6">
                  Welcome to Shopino
                </h1>
                <p className="text-blue-100 text-lg max-w-md">
                  {isLogin
                    ? "Your favorite online shopping destination awaits!"
                    : "Join millions of happy shoppers today!"}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                  {isLogin ? "Sign In" : "Create Account"}
                </h2>

                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {!isLogin && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-[#1D2564] mb-2">
                              Full Name
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Enter your name"
                                required
                              />
                              <User
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#1D2564] mb-2">
                              Phone Number
                            </label>
                            <div className="relative">
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="XXXXX-XXXXX"
                                required
                              />
                              <Phone
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                              />
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className="block text-sm font-medium text-[#1D2564] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Enter your email"
                        required
                      />
                      <Mail
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1D2564] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400
                                 hover:text-[#242f7e] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-[#1D2564] text-white py-3 rounded-xl font-medium
                             hover:bg-[#242f7e] transform transition-all
                             ${
                               isLoading
                                 ? "opacity-70 cursor-not-allowed"
                                 : "hover:shadow-lg"
                             }`}
                    whileHover={{ scale: isLoading ? 1 : 1.01 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>
                          {isLogin ? "Signing In..." : "Creating Account..."}
                        </span>
                      </div>
                    ) : (
                      <span>{isLogin ? "Sign In" : "Create Account"}</span>
                    )}
                  </motion.button>

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={toggleAuthMode}
                      className="text-[#1D2564] hover:text-[#242f7e] font-medium transition-colors"
                    >
                      {isLogin
                        ? "Need an account? Sign Up"
                        : "Already have an account? Sign In"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
