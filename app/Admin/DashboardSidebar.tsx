"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    ShoppingCart,
    LineChart,
    Users,
    Settings,
    CreditCard,
    Package,
    ChevronRight,
    Globe,
    LogOut
} from 'lucide-react';

const sidebarItems = [
    {
        icon: LayoutDashboard,
        label: 'Dashboards',
        href: '/dashboard',
        subItems: [
            { label: 'Sales', href: '/dashboard/sales' },
            { label: 'Analytics', href: '/dashboard/analytics' },
            { label: 'Ecommerce', href: '/dashboard/ecommerce' }
        ]
    },
    {
        icon: ShoppingCart,
        label: 'Orders',
        href: '/orders'
    },
    {
        icon: LineChart,
        label: 'Sales',
        href: '/sales',
        subItems: [
            { label: 'Overview', href: '/sales/overview' },
            { label: 'Reports', href: '/sales/reports' }
        ]
    },
    {
        icon: Users,
        label: 'CRM',
        href: '/crm'
    },
    {
        icon: CreditCard,
        label: 'Crypto',
        href: '/crypto'
    },
    {
        icon: Package,
        label: 'NFT',
        href: '/nft'
    },
    {
        icon: Settings,
        label: 'Settings',
        href: '/settings'
    }
];

const Sidebar = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleMenu = (label: string) => {
        setOpenMenu(openMenu === label ? null : label);
    };

    return (
        <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-900 border-r dark:border-gray-700 h-screen fixed left-0 top-0 transition-all duration-300 shadow-sm`}>
            {/* Logo Section */}
            <div className="h-20 flex items-center justify-center border-b dark:border-gray-700">
                <div className="flex items-center space-x-3 px-4">
                    <div className="flex-shrink-0">
                        <img
                            src="https://res.cloudinary.com/db3e8z5di/image/upload/v1739030755/img/xuc9usmqigsxfuqpawgm.png"
                            alt="Logo"
                            className="w-8 h-8 rounded-lg object-cover"
                        />
                    </div>
                    {!isCollapsed && (
                        <div className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            Simpli
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="py-4 flex flex-col h-[calc(100vh-5rem)] justify-between">
                <nav className={`px-4 space-y-1 ${isCollapsed ? 'px-2' : 'px-4'}`}>
                    {sidebarItems.map((item) => (
                        <div key={item.label} className="mb-1">
                            <div
                                onClick={() => !isCollapsed && item.subItems && toggleMenu(item.label)}
                                className={`
                                    flex items-center justify-between p-2 rounded-lg cursor-pointer
                                    transition-colors duration-200
                                    hover:bg-purple-50 dark:hover:bg-gray-800
                                    ${openMenu === item.label ? 'bg-purple-50 dark:bg-gray-800' : ''}
                                    group
                                `}
                            >
                                <Link href={item.href} className="flex items-center space-x-3 w-full">
                                    <div className={`
                                        p-2 rounded-lg transition-colors duration-200
                                        group-hover:bg-purple-100 dark:group-hover:bg-gray-700
                                        ${openMenu === item.label ? 'bg-purple-100 dark:bg-gray-700' : ''}
                                    `}>
                                        <item.icon size={20} className="text-gray-600 dark:text-gray-300" />
                                    </div>
                                    {!isCollapsed && (
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                                {!isCollapsed && item.subItems && (
                                    <ChevronRight
                                        size={16}
                                        className={`
                                            transform transition-transform duration-200 text-gray-400
                                            ${openMenu === item.label ? 'rotate-90' : ''}
                                        `}
                                    />
                                )}
                            </div>
                            {!isCollapsed && item.subItems && openMenu === item.label && (
                                <div className="pl-12 mt-1 space-y-1">
                                    {item.subItems.map((subItem) => (
                                        <Link
                                            key={subItem.label}
                                            href={subItem.href}
                                            className="
                                                block py-2 px-3 text-sm text-gray-600 dark:text-gray-400
                                                hover:bg-purple-50 dark:hover:bg-gray-800
                                                rounded-lg transition-colors duration-200
                                            "
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className="px-4 py-4 border-t dark:border-gray-700">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`
                            w-full flex items-center space-x-3 p-2 rounded-lg
                            hover:bg-red-50 dark:hover:bg-gray-800
                            text-red-600 dark:text-red-400
                            transition-colors duration-200
                        `}
                    >
                        <div className="p-2 rounded-lg">
                            <LogOut size={20} />
                        </div>
                        {!isCollapsed && (
                            <span className="text-sm font-medium">Logout</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;