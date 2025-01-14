"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Package,
  RefreshCcw,
  Settings,
  MapPin,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { motion } from "framer-motion";

type MenuItems = {
  icon: React.ReactElement;
  label: string;
  href: string;
  onClick?: () => Promise<void>;
  className?: string;
};

type User = {
  username: string;
  phone: string;
  email?: string;
  _id?: string;
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token || !storedUser) {
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }

        // Verify token with backend
        const response = await fetch(
          "https://shopinobackend.onrender.com/api/check-auth",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          // If token is valid, use the stored user data
          setIsLoggedIn(true);
          setUser(JSON.parse(storedUser));
        } else {
          // If token is invalid, clear storage
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://shopinobackend.onrender.com/api/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Clear all auth data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Menu items for authenticated users
  const authenticatedMenuItems: MenuItems[] = [
    {
      icon: <Package className="h-4 w-4" />,
      label: "Order History",
      href: "/account/orders",
    },
    {
      icon: <RefreshCcw className="h-4 w-4" />,
      label: "Return Orders",
      href: "/account/returns",
    },
    {
      icon: <User className="h-4 w-4" />,
      label: "Account Info",
      href: "/account/info",
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Change Password",
      href: "/account/password",
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: "Address",
      href: "/account/address",
    },
    {
      icon: <LogOut className="h-4 w-4" />,
      label: "Logout",
      href: "#",
      onClick: handleLogout,
      className: "text-red-600 hover:text-red-700",
    },
  ];

  const unauthenticatedMenuItems: MenuItems[] = [
    {
      icon: <LogIn className="h-4 w-4" />,
      label: "Sign In",
      href: "/login",
    },
    {
      icon: <UserPlus className="h-4 w-4" />,
      label: "Create Account",
      href: "/login",
    },
  ];

  const menuItems = isLoggedIn
    ? authenticatedMenuItems
    : unauthenticatedMenuItems;

  if (isLoading) {
    return (
      <div className="w-full h-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1D2564]" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* User Profile Section */}
      {isLoggedIn && user && (
        <div className="flex space-x-4 items-center border-b border-gray-200 pb-4">
          <div className="w-10 h-10 rounded-full bg-[#1D2564]/10 flex items-center justify-center">
            <span className="text-[#1D2564] text-lg font-semibold">
              {user.username ? user.username.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
          <div>
            <h2 className="text-lg text-[#1D2564] font-semibold">
              {user.username}
            </h2>
            <p className="text-sm text-gray-500">{user.phone || user.email}</p>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className={`${isLoggedIn ? "mt-4" : "mt-0"} space-y-3`}>
        {menuItems.map((item) => (
          <motion.div
            key={item.label}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className={`flex items-center w-full px-2 py-1.5 text-gray-700 hover:text-[#1D2564] transition-colors duration-200 ${
                  item.className || ""
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center px-2 py-1.5 text-gray-700 hover:text-[#1D2564] transition-colors duration-200 ${
                  item.className || ""
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      {/* Additional information for non-authenticated users */}
      {!isLoggedIn && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Sign in to access your account features and track your orders
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
