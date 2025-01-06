import Image from 'next/image'
import Link from 'next/link'
import React, { JSX } from 'react'
import { FaKey, FaLock, FaMapMarkedAlt, FaSignOutAlt, FaUndoAlt, FaUser } from 'react-icons/fa'

type MenuItems = {
    icon: JSX.Element,
    label: string,
    href: string  // Added href for proper routing
}

type User = {
    avatarUrl: string,
    name: string,
    phone: string,
}

type ProfileProps = {
    user: User
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    const menuItems: MenuItems[] = [
        {
            icon: <FaLock className="mr-2"/>,
            label: "Order History",
            href: "/account/orders"
        },
        {
            icon: <FaUndoAlt className="mr-2"/>,
            label: "Return Orders",
            href: "/account/returns"
        },
        {
            icon: <FaUser className="mr-2"/>,
            label: "Account Info",
            href: "/account/info"
        },
        {
            icon: <FaKey className="mr-2"/>,
            label: "Change Password",
            href: "/account/password"
        },
        {
            icon: <FaMapMarkedAlt className="mr-2"/>,
            label: "Address",
            href: "/account/address"
        },
        {
            icon: <FaSignOutAlt className="mr-2"/>,
            label: "Logout",
            href: "/logout"
        }
    ]

    return (
        <div className="w-full">
            <div className="flex space-x-4 items-center border-b pb-3">
                <div className="relative w-12 h-12">
                    {user.avatarUrl ? (
                        <Image
                            src={user.avatarUrl}
                            alt={`${user.name}'s avatar`}
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <FaUser className="text-gray-400 text-xl" />
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
            </div>

            <div className="mt-4">
                <ul className="space-y-4">
                    {menuItems.map((item) => (
                        <li className="block" key={item.label}>
                            <Link 
                                href={item.href}
                                className="flex items-center text-gray-700 hover:text-[#102E6A] transition-colors duration-200"
                            >
                                {item.icon}
                                <span className="ms-2">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Profile