// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import {
    FaThLarge,
    FaFileAlt,
    FaCalendarAlt,
    FaUserAlt,
    FaChevronLeft,
    FaChevronRight,
    FaCog,
} from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/router';

type SidebarProps = {
    isCollapsed: boolean;
    handleToggleSidebar: () => void;
};

const navigationLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: FaThLarge },
    { href: '/logs', label: 'Logs', icon: FaFileAlt },
    { href: '/scheduler', label: 'Scheduler', icon: FaCalendarAlt },
    { href: '/settings', label: 'Settings', icon: FaCog },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, handleToggleSidebar }) => {
    const router = useRouter();

    return (
        <div
            className={`relative h-screen bg-gray-950 flex flex-col justify-between transition-all duration-500 ease-in-out ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            {/* Collapse Button */}
            <button
                onClick={handleToggleSidebar}
                className="absolute top-4 -right-3 w-6 h-6 bg-gray-950 border border-gray-400 rounded-full flex items-center justify-center text-white focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-110"
                aria-label="Toggle sidebar"
                aria-expanded={!isCollapsed}
            >
                {isCollapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
            </button>

            {/* Top Section */}
            <div>
                <Logo isCollapsed={isCollapsed} />
                <nav className="mt-10">
                    <ul>
                        {navigationLinks.map((link) => (
                            <NavItem
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                icon={link.icon}
                                isActive={router.pathname === link.href}
                                isCollapsed={isCollapsed}
                            />
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Bottom Section */}
            <UserProfile isCollapsed={isCollapsed} />
        </div>
    );
};

type LogoProps = {
    isCollapsed: boolean;
};

const Logo: React.FC<LogoProps> = ({ isCollapsed }) => (
    <div className="p-4 flex items-center justify-center">
        <div
            className={`relative transition-all duration-700 ease-in-out overflow-hidden ${
                isCollapsed ? 'w-16 h-16' : 'w-52 h-28'
            }`}
        >
            <Image
                src={isCollapsed ? '/ss-logo-v1-alt.png' : '/ss-logo-v2-alt.png'}
                alt="Logo"
                layout="fill"
                objectFit="contain"
            />
        </div>
    </div>
);

type NavItemProps = {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    isActive: boolean;
    isCollapsed: boolean;
};

const NavItem: React.FC<NavItemProps> = ({
                                             href,
                                             label,
                                             icon: Icon,
                                             isActive,
                                             isCollapsed,
                                         }) => (
    <li className="mb-4">
        <Link
            href={href}
            className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out ${
                isCollapsed ? 'justify-center' : ''
            } ${
                isActive
                    ? 'font-bold text-blue-500 '
                    : 'text-white hover:text-blue-300'
            }`}
            title={label}
        >
            <Icon
                className={`${
                    isCollapsed ? '' : 'mr-3'
                } transition-colors duration-300 ease-in-out ${
                    isActive ? 'text-blue-500' : 'text-white group-hover:text-blue-400'
                }`}
            />
            {!isCollapsed && <span>{label}</span>}
        </Link>
    </li>
);

type UserProfileProps = {
    isCollapsed: boolean;
};

const UserProfile: React.FC<UserProfileProps> = ({ isCollapsed }) => (
    <div className="p-4 border-t border-gray-400">
        <div
            className={`flex items-center mb-4 transition-all duration-300 ease-in-out ${
                isCollapsed ? 'justify-center' : ''
            }`}
        >
            <FaUserAlt
                className={`${isCollapsed ? '' : 'mr-3'} transition-colors duration-300 ease-in-out`}
            />
            {!isCollapsed && <span className="font-semibold">Snoop Dogg</span>}
        </div>
    </div>
);

export default Sidebar;
