'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import MenuTabs from './MenuTabs';
import { FaSearch, FaUser } from 'react-icons/fa';
import WishlistLink from './WishlistLink';
import Profile from './Profile';

const Header = () => {
    const pathname = usePathname();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isLoggedIn] = useState(true);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
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

    if (!isMounted) {
        return null; // Return null on server-side to prevent hydration mismatch
    }

    return (
        <div className="shadow-md sticky top-0 z-50 bg-white">
            <div className="container mx-auto flex px-4 items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link href="/">
                        <div className="ml-0 md:ml-8">
                            <img src="/shopino-logo2.png" alt="Shopino Logo" />
                        </div>
                    </Link>

                    <div className="flex items-center space-x-8 py-4">
                        <Link
                            href="/"
                            className="relative px-2 py-1 font-semibold text-lg text-[#36302A] md:ml-16"
                        >
                            Home
                            {isActive('/') && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#36302A]"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{
                                        duration: 0.3,
                                        ease: 'easeInOut'
                                    }}
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
                            className="relative px-2 py-1 font-semibold text-lg text-[#36302A] md:ml-16"
                        >
                            Offers
                            {isActive('/offers') && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#36302A]"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{
                                        duration: 0.3,
                                        ease: 'easeInOut'
                                    }}
                                />
                            )}
                        </Link>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-12 pr-4 py-2 w-full md:w-64 lg:w-80 rounded-full bg-gray-200 focus:bg-gray-100 focus:ring-1 focus:ring-[#36302A] focus:outline-none shadow-sm transition-all duration-300"
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                    <WishlistLink />

                    <div 
                        ref={dropdownRef}
                        className="relative me-4 py-4"
                    >
                        <div 
                            className="flex items-center space-x-2"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <FaUser className="text-xl cursor-pointer hover:text-[#102E6A] transition-colors duration-200"/>
                        </div>
                        <div 
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={`absolute top-14 right-[-10px] w-64 p-6 bg-white rounded-lg shadow-lg transition-all duration-200 ease-in-out ${
                                isUserDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                            }`}
                        > 
                            {!isLoggedIn ? (
                                <div className="flex flex-col space-y-4">
                                    <Link 
                                        href="/register"
                                        className="py-2.5 px-4 bg-[#102E6A] text-white rounded-full text-center font-medium hover:bg-[#1a4182] transition-colors duration-200 shadow-sm"
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
                            ):<Profile user={{name:"Niket",phone:"7719417720",avatarUrl:"/profile-image.jpg"}}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;