'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// Types remain the same as before...
type TabName = 'Men' | 'Women' | 'Kids';
type CategoryType = 'clothing' | 'shoes' | 'accessories';

interface CategoryItem {
  name: string;
  href: string;
  featured?: boolean;
}

interface TabCategory {
  title: string;
  items: CategoryItem[];
}

interface TabContent {
  image: string;
  altText: string;
  categories: Record<CategoryType, TabCategory>;
}

type TabData = Record<TabName, TabContent>;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

const imageVariants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    scale: 1.2, 
    opacity: 0,
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

// Tab data remains the same as before...
const tabData: TabData = {
  Men: {
    image: "/men-cover.webp",
    altText: "Men's Fashion Collection",
    categories: {
      clothing: {
        title: "Clothing",
        items: [
          { name: "Hoodies", href: "/products/men/hoodies", featured: true },
          { name: "Sweatshirts", href: "/products/men/sweatshirts" },
          { name: "T-Shirts", href: "/products/men/t-shirts" },
          { name: "Jackets", href: "/products/men/jackets" },
          { name: "Pants", href: "/products/men/pants" }
        ]
      },
      shoes: {
        title: "Shoes",
        items: [
          { name: "Running", href: "/products/men/running-shoes", featured: true },
          { name: "Sneakers", href: "/products/men/sneakers" },
          { name: "Boots", href: "/products/men/boots" }
        ]
      },
      accessories: {
        title: "Accessories",
        items: [
          { name: "Bags & Backpacks", href: "/products/men/bags", featured: true },
          { name: "Watches", href: "/products/men/watches" },
          { name: "Belts", href: "/products/men/belts" }
        ]
      }
    }
  },
  // Women and Kids data remain the same...
  Women: {
    image: "/women-cover.jpg",
    altText: "Women's Fashion Collection",
    categories: {
      clothing: {
        title: "Clothing",
        items: [
          { name: "Tops", href: "/products/women/tops", featured: true },
          { name: "Jeans", href: "/products/women/jeans", featured: true },
          { name: "Dresses", href: "/products/women/dresses" },
          { name: "Skirts", href: "/products/women/skirts" }
        ]
      },
      shoes: {
        title: "Shoes",
        items: [
          { name: "Heels", href: "/products/women/heels", featured: true },
          { name: "Flats", href: "/products/women/flats", featured: true },
          { name: "Boots", href: "/products/women/boots" }
        ]
      },
      accessories: {
        title: "Accessories",
        items: [
          { name: "Handbags", href: "/products/women/handbags", featured: true },
          { name: "Jewelry", href: "/products/women/jewelry" },
          { name: "Scarves", href: "/products/women/scarves" }
        ]
      }
    }
  },
  Kids: {
    image: "/kids-cover.webp",
    altText: "Kids' Fashion Collection",
    categories: {
      clothing: {
        title: "Clothing",
        items: [
          { name: "T-Shirts", href: "/products/kids/t-shirts", featured: true },
          { name: "Pants", href: "/products/kids/pants" },
          { name: "Dresses", href: "/products/kids/dresses" }
        ]
      },
      shoes: {
        title: "Shoes",
        items: [
          { name: "Sneakers", href: "/products/kids/sneakers", featured: true },
          { name: "Sports Shoes", href: "/products/kids/sports-shoes" },
        ]
      },
      accessories: {
        title: "Accessories",
        items: [
          { name: "Hats", href: "/products/kids/hats", featured: true },
          { name: "Backpacks", href: "/products/kids/backpacks" }
        ]
      }
    }
  }
};

const MenuTabs = () => {
  const [activeTab, setActiveTab] = useState<TabName>('Men');
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleTabChange = useCallback((tab: TabName) => {
    setActiveTab(tab);
    setIsImageLoading(true);
  }, []);

  const renderCategorySection = (category: CategoryType, categoryData: TabCategory) => (
    <motion.div
      key={category}
      variants={itemVariants}
      className="flex-1"
    >
      <motion.h2 
        className="font-bold mb-4 text-lg text-[#1D2564] border-b border-gray-200 pb-2"
        layout
      >
        {categoryData.title}
      </motion.h2>
      <motion.ul className="space-y-3">
        {categoryData.items.map((item, index) => (
          <motion.li 
            key={item.name}
            variants={itemVariants}
            custom={index}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href={item.href}
              className={`group flex items-center text-md ${
                item.featured 
                  ? 'text-[#102E6A] font-medium'
                  : 'text-gray-600 hover:text-[#102E6A]'
              } transition-colors duration-200`}
            >
              <motion.span
                whileHover={{ x: 3 }}
                className="relative"
              >
                {item.name}
                {item.featured && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#102E6A]"
                    layoutId={`underline-${category}`}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.span>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-2"
              >
                <ChevronRight 
                  className={`h-4 w-4 transform transition-transform duration-200 ${
                    item.featured ? 'text-[#102E6A]' : 'text-gray-400'
                  }`}
                />
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden z-[100]">
      <LayoutGroup>
        <nav className="flex justify-center space-x-8 py-4 bg-gray-50 border-b border-gray-200">
          {Object.keys(tabData).map((tab) => (
            <motion.button 
              key={tab}
              onClick={() => handleTabChange(tab as TabName)}
              className={`relative text-lg font-semibold px-6 py-2.5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#102E6A] overflow-hidden ${
                activeTab === tab 
                  ? 'text-white'
                  : 'text-[#1D2564] hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-selected={activeTab === tab}
              role="tab"
            >
              {activeTab === tab && (
                <motion.div
                  className="absolute inset-0 bg-[#1D2564] rounded-full z-0"
                  layoutId="activeTab"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </motion.button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex justify-between py-6 w-full bg-gray-50 rounded-b-lg"
          >
            <div className="flex justify-between space-x-8 p-6 w-full max-w-7xl mx-auto">
              <motion.div 
                className="w-1/2 relative overflow-hidden rounded-lg shadow-lg"
                whileHover="hover"
              >
                <motion.div
                  variants={imageVariants}
                  className="relative h-[400px]"
                >
                  <Image 
                    src={tabData[activeTab].image}
                    alt={tabData[activeTab].altText}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      isImageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoadingComplete={() => setIsImageLoading(false)}
                    priority
                  />
                  {isImageLoading && (
                    <motion.div 
                      className="absolute inset-0 bg-gray-200"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        transition: {
                          repeat: Infinity,
                          duration: 1.5
                        }
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex justify-between space-x-8 w-1/2"
                variants={containerVariants}
              >
                {(['clothing', 'shoes', 'accessories'] as const).map((category) => (
                  renderCategorySection(category, tabData[activeTab].categories[category])
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};

export default MenuTabs;