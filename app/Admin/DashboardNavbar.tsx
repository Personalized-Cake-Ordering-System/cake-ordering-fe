"use client";
import React, { useState, useEffect } from 'react';
import {
    Bell,
    Moon,
    Sun,
    LayoutGrid,
    Maximize2,
    ChevronDown,
    LogOut,
    Settings,
    User,
    Home,
    Users,
    Calendar,
    FileText,
    PieChart,
    Mail,
    Shield,
    HelpCircle,
    FolderOpen,
    TrendingUp,
    Bookmark,
    Database
} from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ButtonTest";
import { cn } from "@/lib/utils";

// Types
interface GridMenuItemProps {
    icon: React.ElementType;
    label: string;
    description: string;
    onClick: () => void;
}

interface NotificationItemProps {
    text: string;
    time: string;
    isUnread: boolean;
}

interface GridMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

interface MenuItem {
    icon: React.ElementType;
    label: string;
    description: string;
}

interface Notification {
    id: number;
    text: string;
    time: string;
    isUnread: boolean;
}

// GridMenuItem Component
const GridMenuItem: React.FC<GridMenuItemProps> = ({ icon: Icon, label, description, onClick }) => (
    <div
        onClick={onClick}
        className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors group"
    >
        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
            <Icon size={24} className="text-purple-600 dark:text-purple-300" />
        </div>
        <h3 className="mt-3 font-medium text-gray-900 dark:text-gray-100">
            {label}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-center">
            {description}
        </p>
    </div>
);

// NotificationItem Component
const NotificationItem: React.FC<NotificationItemProps> = ({ text, time, isUnread }) => (
    <DropdownMenuItem className={cn(
        "flex flex-col items-start py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 space-y-1",
        isUnread && "bg-purple-50 dark:bg-purple-900/20"
    )}>
        <span className="text-sm text-gray-900 dark:text-gray-100">{text}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
    </DropdownMenuItem>
);

// GridMenu Component
const GridMenu: React.FC<GridMenuProps> = ({ isOpen, onClose }) => {
    const menuItems: MenuItem[] = [
        { icon: Home, label: 'Dashboard', description: 'Overview & Analytics' },
        { icon: Users, label: 'Users', description: 'Manage Users & Roles' },
        { icon: Calendar, label: 'Calendar', description: 'Events & Schedules' },
        { icon: FileText, label: 'Documents', description: 'Files & Storage' },
        { icon: PieChart, label: 'Analytics', description: 'Reports & Insights' },
        { icon: Mail, label: 'Messages', description: 'Email & Chat' },
        { icon: Shield, label: 'Security', description: 'Privacy & Protection' },
        { icon: HelpCircle, label: 'Help', description: 'Support & Resources' },
        { icon: FolderOpen, label: 'Projects', description: 'Manage Projects' },
        { icon: TrendingUp, label: 'Performance', description: 'Track Metrics' },
        { icon: Bookmark, label: 'Bookmarks', description: 'Saved Items' },
        { icon: Database, label: 'Database', description: 'Data Management' }
    ];

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-6xl max-h-[80vh] overflow-y-auto m-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {menuItems.map((item, index) => (
                        <GridMenuItem
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            description={item.description}
                            onClick={() => {
                                console.log(`Navigating to ${item.label}`);
                                onClose();
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Main Navbar Component
const Navbar: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [isGridOpen, setIsGridOpen] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 1, text: "New message received", time: "5 minutes ago", isUnread: true },
        { id: 2, text: "Meeting in 30 minutes", time: "10 minutes ago", isUnread: true },
        { id: 3, text: "Task completed", time: "1 hour ago", isUnread: false },
        { id: 4, text: "New comment on your post", time: "2 hours ago", isUnread: false },
        { id: 5, text: "System update available", time: "4 hours ago", isUnread: false }
    ]);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleDarkMode = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsDarkMode(e.matches);
            if (e.matches) {
                document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = 'dark';
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.style.colorScheme = 'light';
            }
        };

        handleDarkMode(darkModeMediaQuery);
        darkModeMediaQuery.addEventListener('change', handleDarkMode);

        return () => darkModeMediaQuery.removeEventListener('change', handleDarkMode);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const unreadCount = notifications.filter(n => n.isUnread).length;

    return (
        <>
            <nav className="sticky top-0 z-40 border-b flex items-center justify-between px-6 py-3 shadow-sm transition-all duration-300 bg-white dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center space-x-4 w-1/3">
                    <div className="text-xl font-bold text-purple-600 hover:text-purple-700 dark:text-purple-300 dark:hover:text-purple-200 cursor-pointer transition-colors">
                        Simpli
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-100 transition-colors"
                        onClick={() => setIsGridOpen(true)}
                    >
                        <LayoutGrid size={20} />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-100 transition-colors"
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-100 transition-colors"
                        onClick={toggleFullscreen}
                    >
                        <Maximize2 size={20} />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-100 transition-colors relative"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 dark:bg-red-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                                        {unreadCount}
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 p-2 bg-white dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between items-center px-4 py-2 border-b dark:border-gray-700">
                                <span className="font-medium dark:text-gray-100">Notifications</span>
                                {unreadCount > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                                        onClick={() => {
                                            setNotifications(notifications.map(n => ({ ...n, isUnread: false })));
                                        }}
                                    >
                                        Mark all as read
                                    </Button>
                                )}
                            </div>
                            {notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    text={notification.text}
                                    time={notification.time}
                                    isUnread={notification.isUnread}
                                />
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center space-x-2 ml-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-100 p-2 rounded-lg transition-colors">
                                <img
                                    src="https://res.cloudinary.com/db3e8z5di/image/upload/v1739030755/img/xuc9usmqigsxfuqpawgm.png"
                                    alt="Profile"
                                    className="rounded-full w-8 h-8"
                                />
                                <div>
                                    <div className="font-semibold text-sm dark:text-gray-100">Simpli</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Admin</div>
                                </div>
                                <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 dark:border-gray-700">
                            <DropdownMenuItem className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-100">
                                <User size={16} />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-100">
                                <Settings size={16} />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="dark:border-gray-700" />
                            <DropdownMenuItem className="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                                <LogOut size={16} />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
            <GridMenu isOpen={isGridOpen} onClose={() => setIsGridOpen(false)} />
        </>
    );
};

export default Navbar;