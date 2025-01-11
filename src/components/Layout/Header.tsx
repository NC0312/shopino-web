'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Menu, X, Search, User, ShoppingCart, Heart } from 'lucide-react';
import MenuTabs from './MenuTabs';
import WishlistLink from './WishlistLink';
import Profile from './Profile';
import Image from 'next/image';

const Header = () => {
  const pathname = usePathname();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isLoggedIn] = useState(true);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
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

  const mobileMenuVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
  };

  const searchOverlayVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <header className="shadow-md sticky top-0 z-50 bg-white">
      <div className="md:container mx-auto">
        <div className="flex items-center justify-between px-4 py-2 md:py-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#36302A] focus:outline-none"
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
            <div className="relative w-24 h-8 md:w-32 md:h-10">
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
              className="relative px-2 py-1 font-semibold text-lg text-[#36302A]"
            >
              Home
              {isActive('/') && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#36302A]"
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
              <button className="text-[#36302A] font-semibold text-lg flex items-center gap-2">
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
              className="relative px-2 py-1 font-semibold text-lg text-[#36302A]"
            >
              Offers
              {isActive('/offers') && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#36302A]"
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
                className="pl-12 pr-4 py-2 w-64 lg:w-80 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#36302A] focus:outline-none transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            </div>

            <WishlistLink />

            {/* User Menu */}
            <div ref={dropdownRef} className="relative py-4">
              <button
                className="flex items-center text-[#575553] hover:text-[#102E6A] transition-colors duration-200"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label="User menu"
              >
                <User className="h-5 w-5" />
              </button>

              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`absolute top-14 right-0 w-64 p-6 bg-white rounded-lg shadow-lg transition-all duration-200 ease-in-out ${
                  isUserDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                {!isLoggedIn ? (
                  <div className="flex flex-col space-y-4">
                    <Link
                      href="/register"
                      className="py-2.5 px-4 bg-[#102E6A] text-white rounded-full text-center font-medium hover:bg-[#1a4182] transition-colors duration-200"
                    >
                      Register Account
                    </Link>
                    <div className="flex items-center">
                      <div className="flex-1 h-px bg-gray-200"></div>
                      <span className="px-4 text-sm text-gray-500">or</span>
                      <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                    <Link
                      href="/login"
                      className="text-center py-2 px-4 border border-[#102E6A] text-[#102E6A] rounded-full hover:bg-gray-50 transition-colors duration-200"
                    >
                      Sign In
                    </Link>
                  </div>
                ) : (
                  <Profile
                    user={{
                      name: "Niket",
                      phone: "7719417720",
                      avatarUrl: "/profile-image.jpg",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="bg-[#36302A] p-2.5 rounded-full hover:bg-[#102E6A] transition-colors duration-200"
            >
              <ShoppingCart className="text-white h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 text-[#36302A]"
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </button>
            <Link
              href="/cart"
              className="bg-[#36302A] p-2 rounded-full hover:bg-[#102E6A]"
            >
              <ShoppingCart className="text-white h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              className="absolute inset-x-0 top-full bg-white px-4 py-3 shadow-lg"
              variants={searchOverlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#36302A] focus:outline-none"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.nav
                className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl flex flex-col"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <Link href="/" className="relative w-24 h-8">
                      <Image
                        src="/shopino-logo2.png"
                        alt="Shopino Logo"
                        fill
                        className="object-contain"
                      />
                    </Link>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-[#36302A]"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {isLoggedIn ? (
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src="/profile-image.jpg"
                            alt="Profile"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#36302A]">Niket</h3>
                          <p className="text-sm text-gray-500">7719417720</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 mb-6">
                        <Link
                          href="/login"
                          className="block w-full py-2 px-4 text-center bg-[#102E6A] text-white rounded-full"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          className="block w-full py-2 px-4 text-center border border-[#102E6A] text-[#102E6A] rounded-full"
                        >
                          Register
                        </Link>
                      </div>
                    )}

                    <Link
                      href="/"
                      className={`block py-3 px-4 rounded-lg text-lg ${
                        isActive('/') ? 'bg-gray-100 text-[#102E6A] font-semibold' : 'text-[#36302A]'
                      }`}
                    >
                      Home
                    </Link>
                    <Link
                      href="/categories"
                      className={`block py-3 px-4 rounded-lg text-lg ${
                        isActive('/categories') ? 'bg-gray-100 text-[#102E6A] font-semibold' : 'text-[#36302A]'
                      }`}
                    >
                      Categories
                    </Link>
                    <Link
                      href="/offers"
                      className={`block py-3 px-4 rounded-lg text-lg ${
                        isActive('/offers') ? 'bg-gray-100 text-[#102E6A] font-semibold' : 'text-[#36302A]'
                      }`}
                    >
                      Offers
                    </Link>
                    
                    <div className="my-4 border-t border-gray-200"></div>
                    
                    <Link
                      href="/wishlist"
                      className="flex items-center py-3 px-4 rounded-lg text-lg text-[#36302A]"
                    >
                      <Heart className="h-5 w-5 mr-3" />
                      Wishlist
                    </Link>
                    
                    <Link
                      href="/orders"
                      className="flex items-center py-3 px-4 rounded-lg text-lg text-[#36302A]"
                    >
                      <ShoppingCart className="h-5 w-5 mr-3" />
                      My Orders
                    </Link>
                  </div>
                </div>

                <div className="p-4 border-t">
                  {isLoggedIn && (
                    <button
                      onClick={() => {
                        // Handle logout
                        console.log('Logout clicked');
                      }}
                      className="w-full py-3 px-4 text-center text-red-600 rounded-lg hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;