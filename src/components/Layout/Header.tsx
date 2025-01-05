'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    const pathname = usePathname();

    const isActive = (path: string): boolean => pathname === path;

    return (
        <div className='shadow-md sticky top-0 z-50'>
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
                        <div className='relative group py-4'>
                            <button></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;