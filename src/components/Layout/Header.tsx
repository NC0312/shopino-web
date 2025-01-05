'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import MenuTabs from './MenuTabs';

const Header = () => {
    const pathname = usePathname();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const isActive = (path: string): boolean => pathname === path;

    return (
        <div className='shadow-md sticky top-0 z-50 bg-white'>
            <div className='container mx-auto flex px-4 items-center justify-between'>
                <div className='flex items-center space-x-8'>
                    <Link href="/">
                        <div className='ml-0 md:ml-8'>
                            <img src="/shopino-logo2.png" alt="Shopino Logo" />
                        </div>
                    </Link>

                    <div className='flex items-center space-x-8 py-4 '>
                        <Link
                            href="/"
                            className='relative px-2 py-1 font-semibold text-lg text-[#36302A] md:ml-16'
                        >
                            Home
                            {isActive('/') && (
                                <motion.div
                                    className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#36302A]'
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
                            className='relative py-4'
                            onMouseEnter={() => setIsMenuVisible(true)}
                            onMouseLeave={() => setIsMenuVisible(false)}
                        >
                            <button className='text-[#36302A] font-semibold text-lg flex items-center gap-2'>
                                Categories <MdOutlineKeyboardArrowDown className='text-xl'/>
                            </button>
                            <AnimatePresence>
                                {isMenuVisible && (
                                    <motion.div 
                                        className='absolute top-16 w-[800px] bg-white rounded shadow-md'
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
                            className='relative px-2 py-1 font-semibold text-lg text-[#36302A] md:ml-16'
                        >
                            Offers
                            {isActive('/offers') && (
                                <motion.div
                                    className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#36302A]'
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
            </div>
        </div>
    );
};

export default Header;

