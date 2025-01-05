'use client';

import Link from 'next/link';
import React, { useState } from 'react'
import { motion } from 'framer-motion';

type TabName = 'Men' | 'Women' | 'Kids'
type CategoryType = 'clothing' | 'shoes' | 'accessories'
type TabData = {
    [key in TabName]: {
        [key in CategoryType]: string[];
    } & {
        image: string;
    }
}

const tabData: TabData = {
    Men: { image: "/men-cover.webp", clothing: ["Hoodies","Sweatshirts"], shoes: ["Running"], accessories: ["Bags & Backpacks"] },
    Women: { image: "/women-cover.jpg", clothing: ["Tops", "Jeans"], shoes: ["Heels", "Flats"], accessories: ["Handbags"] },
    Kids: { image: "/kids-cover.webp", clothing: ["T-Shirts"], shoes: ["Sneakers"], accessories: ["Hats"] }
}

const MenuTabs = () => {
    const [activeTab, setActiveTab] = useState<TabName>('Men');

    const renderContent = () => {
        const data = tabData[activeTab];
        return (
            <div className='flex justify-between py-6 w-full bg-gray-50 rounded-b-lg shadow-inner'>
                <div className='flex justify-between space-x-8 p-6 w-full max-w-7xl mx-auto'>
                    <div className='w-1/2'>
                        <img 
                            src={data.image}
                            alt={`${activeTab} category`} 
                            className='rounded-lg w-full object-cover h-[400px] shadow-md transition-transform duration-300 hover:scale-105' 
                        />
                    </div>
                    <div className='flex justify-between space-x-12 w-1/2'>
                        {(['clothing', 'shoes', 'accessories'] as const).map((category) => (
                            <div key={category} className='w-1/3'>
                                <h2 className='font-bold mb-4 text-lg text-gray-800 border-b pb-2'>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                                <ul className='space-y-2'>
                                    {data[category].map((item, index) => (
                                        <li key={index}>
                                            <Link 
                                                href={`/products?category=${item.toLowerCase()}`}
                                                className='text-gray-600 hover:text-blue-600 transition-colors duration-200'
                                            >
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full bg-white shadow-lg rounded-lg overflow-hidden'>
            <nav className='flex justify-center space-x-8 py-4 bg-gray-100'>
                {(['Men', 'Women', 'Kids'] as const).map((tab) => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)} 
                        className={`text-lg font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                            activeTab === tab 
                                ? 'text-white bg-[#102E6A] shadow-md' 
                                : 'text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {renderContent()}
            </motion.div>
        </div>
    )
}

export default MenuTabs

