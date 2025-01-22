"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  Menu,
  X,
  Search,
  User,
  ShoppingCart,
  Sparkles,
  ShoppingBag,
  Tag,
  Heart,
  Package,
  HeadphonesIcon,
  ArrowRight,
  LogOut,
} from "lucide-react";
import MenuTabs from "./MenuTabs";
import WishlistLink from "./WishlistLink";
import Profile from "./Profile";
import Image from "next/image";

type User = {
  username: string;
  phone: string;
  email?: string;
  _id?: string;
};

interface NavbarProps {
  isActive: (path: string) => boolean;
}

const Header = () => {
  const pathname = usePathname();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const isDevelopment = process.env.NEXT_PUBLIC_ENV === "development";

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(
          "Checking auth with token:",
          token ? "Present" : "Not found"
        );

        if (!token) {
          setIsLoggedIn(false);
          return;
        }

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

        if (data.success && data.user) {
          setIsLoggedIn(true);
          setUser(data.user);
        } else {
          console.log("Auth check failed:", data.message);
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
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
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsUserDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsUserDropdownOpen(false);
    }, 300);
  };

  const isActive = (path: string): boolean => pathname === path;

  if (!isMounted) return null;

 

  return (
    <header
      className={`shadow-md sticky top-0 z-50 ${isDevelopment ? "bg-slate-600" : "bg-white"
        }`}
    >
      <div className="md:container mx-auto">
        <div className="flex items-center justify-between px-4 py-2 lg:py-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#1D2564] focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/">
            <div className="relative w-32 h-16 md:w-48 md:h-14 md:ml-7">
              <Image
                src="/shopino-logo2.png"
                alt="Shopino Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="relative px-2 py-1 font-semibold text-lg text-[#1D2564]"
            >
              Home
              {isActive("/") && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1D2564]"
                  layoutId="navunderline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
            <div ref={menuRef} className="relative py-4">
              <button
                onClick={() => setIsMenuVisible(!isMenuVisible)}
                className="text-[#1D2564] font-semibold text-lg flex items-center gap-2"
              >
                Categories <MdOutlineKeyboardArrowDown className="text-xl" />
              </button>
              <AnimatePresence>
                {isMenuVisible && (
                  <motion.div
                    className="absolute top-16 left-[-100px] w-[800px] bg-white rounded shadow-md"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MenuTabs />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              href="/offers"
              className="relative px-2 py-1 font-semibold text-lg text-[#1D2564]"
            >
              Offers
              {isActive("/offers") && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1D2564]"
                  layoutId="navunderline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-12 pr-4 py-2 w-64 lg:w-80 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#1D2564] focus:outline-none transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>

            <WishlistLink />

            {/* User Menu */}
            <div ref={dropdownRef} className="relative py-4">
              <button
                className="flex items-center text-[#1D2564] hover:text-[#102E6A] transition-colors duration-200"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label="User menu"
              >
                <User className="h-5 w-5" />
              </button>

              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="absolute top-14 right-0 w-64 p-6 bg-white rounded-lg shadow-lg"
                  >
                    <Profile />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="bg-[#1D2564] p-2.5 rounded-full hover:bg-[#102E6A] transition-colors duration-200"
            >
              <ShoppingCart className="text-white h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 text-[#1D2564]"
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </button>
            <Link
              href="/cart"
              className="bg-[#1D2564] p-2 rounded-full hover:bg-[#102E6A]"
            >
              <ShoppingCart className="text-white h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            >
              <motion.nav
                className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl flex flex-col"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <Link href="/" className="flex items-center">
                    <span className="text-xl font-semibold text-[#1D2564]">
                      Shopino
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[#1D2564] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* User Section */}
                <div className="border-b p-4 bg-gray-50">
                  {isLoggedIn ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-[#1D2564]/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-[#1D2564]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#1D2564]">
                            Welcome back
                          </h3>
                          <p className="text-sm text-gray-600">
                            {user?.username}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Link
                          href="/account/orders"
                          className="flex-1 text-center py-2 bg-[#1D2564] text-white rounded-lg text-sm hover:bg-[#102E6A] transition-colors"
                        >
                          My Orders
                        </Link>
                        <Link
                          href="/account"
                          className="flex-1 text-center py-2 border border-[#1D2564] text-[#1D2564] rounded-lg text-sm hover:bg-gray-50 transition-colors"
                        >
                          Account
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-gray-600">
                        Sign in for a better experience
                      </p>
                      <div className="flex space-x-3">
                        <Link
                          href="/login"
                          className="flex-1 text-center py-2 bg-[#1D2564] text-white rounded-lg text-sm hover:bg-[#102E6A] transition-colors"
                        >
                          Sign In
                        </Link>
                        {/* <Link
                          href="/register"
                          className="flex-1 text-center py-2 border border-[#1D2564] text-[#1D2564] rounded-lg text-sm hover:bg-gray-50 transition-colors"
                        >
                          Register
                        </Link> */}
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Navigation */}
                <div className="flex-1 overflow-y-auto">
                  {/* Featured Categories */}
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      SHOP BY CATEGORY
                    </h3>
                    <div className="space-y-1">
                      {[
                        {
                          name: "New Arrivals",
                          icon: <Sparkles className="h-5 w-5" />,
                          href: "/new-arrivals",
                        },
                        {
                          name: "Men",
                          icon: <User className="h-5 w-5" />,
                          href: "/men",
                        },
                        {
                          name: "Women",
                          icon: <User className="h-5 w-5" />,
                          href: "/women",
                        },
                        {
                          name: "Kids",
                          icon: <User className="h-5 w-5" />,
                          href: "/kids",
                        },
                        {
                          name: "Accessories",
                          icon: <ShoppingBag className="h-5 w-5" />,
                          href: "/accessories",
                        },
                      ].map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 ${isActive(item.href)
                            ? "bg-gray-50 text-[#1D2564] font-medium"
                            : ""
                            }`}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="p-4 border-t">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      QUICK LINKS
                    </h3>
                    <div className="space-y-1">
                      {[
                        {
                          name: "Offers",
                          icon: <Tag className="h-5 w-5" />,
                          href: "/offers",
                        },
                        {
                          name: "Wishlist",
                          icon: <Heart className="h-5 w-5" />,
                          href: "/wishlist",
                        },
                        {
                          name: "Track Order",
                          icon: <Package className="h-5 w-5" />,
                          href: "/track-order",
                        },
                        {
                          name: "Customer Support",
                          icon: <HeadphonesIcon className="h-5 w-5" />,
                          href: "/support",
                        },
                      ].map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Promotional Banner */}
                  <div className="p-4 border-t">
                    <div className="bg-[#1D2564] text-white p-4 rounded-lg">
                      <h4 className="font-medium mb-1">Special Offer</h4>
                      <p className="text-sm text-white/80 mb-3">
                        Get 20% off on your first order!
                      </p>
                      <Link
                        href="/offers"
                        className="inline-flex items-center text-sm text-white hover:underline"
                      >
                        Shop Now
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                {isLoggedIn && (
                  <div className="border-t p-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-white p-4 shadow-md md:hidden"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-12 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#1D2564] focus:outline-none"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
