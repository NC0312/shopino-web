'use client';

import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';

const WishlistLink = () => {
  return (
    <Link href={'/wishlist'} className="relative group">
      <FaHeart
        className="text-2xl text-[#36302A] group-hover:text-red-500 transition-all duration-300"
      />
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
        Wishlist
      </div>
    </Link> 
  );
};

export default WishlistLink;

