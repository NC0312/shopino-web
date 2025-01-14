"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import MenuTabs from "./MenuTabs";
import WishlistLink from "./WishlistLink";
import Profile from "./Profile";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    <header className="shadow-md sticky top-0 z-50 bg-white">
      <div className="md:container mx-auto">
        <div className="flex items-center justify-between px-4 py-2 md:py-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#1D2564] focus:outline-none"
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
          <nav className="hidden md:flex items-center space-x-8">
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

            <div
              className="relative py-4"
              onMouseEnter={() => setIsMenuVisible(true)}
              onMouseLeave={() => setIsMenuVisible(false)}
            >
              <button className="text-[#1D2564] font-semibold text-lg flex items-center gap-2">
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

        {/* Mobile Menu */}
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
                <div className="p-4 border-b">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[#1D2564] ml-auto block"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <Link
                    href="/"
                    className={`block py-3 px-4 rounded-lg text-lg ${
                      isActive("/")
                        ? "bg-gray-100 text-[#102E6A] font-semibold"
                        : "text-[#1D2564]"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/categories"
                    className={`block py-3 px-4 rounded-lg text-lg ${
                      isActive("/categories")
                        ? "bg-gray-100 text-[#102E6A] font-semibold"
                        : "text-[#1D2564]"
                    }`}
                  >
                    Categories
                  </Link>
                  <Link
                    href="/offers"
                    className={`block py-3 px-4 rounded-lg text-lg ${
                      isActive("/offers")
                        ? "bg-gray-100 text-[#102E6A] font-semibold"
                        : "text-[#1D2564]"
                    }`}
                  >
                    Offers
                  </Link>
                </div>
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
