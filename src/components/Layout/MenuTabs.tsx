'use client';
import Link from 'next/link';
import React, { useState } from 'react'
type TabName = 'Men' | 'Women' | 'Kids'
type TabData = {
    [key in TabName]: {
        clothing: String[];
        shoes: String[];
        accessories: String[];
        image: String;
    }
}

const tabData: TabData = {
    Men: { image: "/men-cover.webp", clothing: ["Hoodies & SweatShirts"], shoes: ["Running"], accessories: ["Bags & Backpacks"] },
    Women: { image: "/women-cover.jpg", clothing: ["Tops", "Jeans"], shoes: ["Heels", "Flats"], accessories: ["Handbags"] },
    Kids: { image: "/kids-cover.webp", clothing: ["T-Shirts"], shoes: ["Sneakers"], accessories: ["Hats"] }
}

const MenuTabs = () => {
    const [activeTab, setActiveTab] = useState<TabName>('Men');
    const renderContent = () => {
        const data = tabData[activeTab];
        return (
            <div className='flex justify-between py-3 w-full'>
                <div className='flex justify-between space-x-8 p-4 w-full'>
                    <div className='w-1/2'>
                        <img src={typeof data?.image === 'string' ? data.image : undefined} alt="category" className='rounded-lg w-full object-fill h-[320px]' />
                    </div>
                    <div className='flex justify-between space-x-8 w-full'>
                        <div className='w-1/3'>
                            <h2 className='font-bold mb-4'>Shoes</h2>
                            <ul className='space-y-2'>
                                {
                                    data?.shoes?.map((item, index) => (
                                        <li key={index}>
                                            <Link href={`/products?category=${item?.toLowerCase()}`}>{item}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
    return (
        <div className='w-full'>
            <nav className='flex justify-center space-x-8 py-4 border-b'>
                {
                    (['Men', 'Women', 'Kids'] as TabName[]).map((tab) => {
                        return (<button key={tab} onClick={() => setActiveTab(tab)} className={`text-black ${activeTab === tab ? 'text-[#0D2365] border-b-2 border-[#0D2365]' : ''}`}>{tab}</button>)
                    })
                }
            </nav>
            {renderContent()}
        </div>
    )
}

export default MenuTabs
