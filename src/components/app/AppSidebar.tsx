"use client";

// External Libraries
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaQuestionCircle } from "react-icons/fa";
import { useRouter } from "next/router";

// Icons
import { ChevronsUpDown, CogIcon, LayoutDashboard, LogOut, Antenna} from "lucide-react";

// Custom Hooks
import { useIsMobile } from "@/hooks/use-mobile";

// UI Components
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

// Types
interface User {
    name: string;
    email: string;
    avatar: string;
    role: string;
}

interface NavItem {
    title: string;
    url: string;
    isActive: boolean;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Data {
    user: User;
    navMain: NavItem[];
}

// Data
const data: Data = {
    user: {
        name: "Sathira Williams",
        email: "sathira.williams@gmail.com",
        avatar: "/logo/ss-logo-favicon.png",
        role: "CSA Admin",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            isActive: true,
            icon: LayoutDashboard,
        },
        {
            title: "Calendar",
            url: "/app/calendar",
            isActive: false,
            icon: Antenna,
        },
        {
            title: "Settings",
            url: "/settings",
            isActive: false,
            icon: CogIcon,
        },
    ],
};

// Logo Component
interface LogoProps {
    isCollapsed: boolean;
    isMobile: boolean;
}

const Logo: React.FC<LogoProps> = ({ isCollapsed, isMobile }) => {
    return (
        <SidebarHeader className="mt-3 -ml-1 flex items-center justify-center transition-all duration-300">
            {!isCollapsed || isMobile ? (
                <Image
                    src="/logo/ss-logo-full.png"
                    alt="Wide Logo"
                    width={128}
                    height={64}
                    className="mt-4 transition-all duration-300"
                />
            ) : (
                <Image
                    src="/logo/favicon.png"
                    alt="Square Logo"
                    width={30}
                    height={30}
                    className="transition-all duration-300"
                />
            )}
        </SidebarHeader>
    );
};

// Navigation Menu Component
interface NavigationMenuProps {
    navMain: NavItem[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ navMain }) => {
    const router = useRouter();
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";
    const isMobile = useIsMobile();
    const { asPath } = useRouter();
    const [activeNav, setActiveNav] = useState(navMain);

    useEffect(() => {
        // Update the active state based on the current path
        setActiveNav(
            navMain.map((item) => ({
                ...item,
                isActive: asPath === item.url,
            }))
        );
    }, [asPath, navMain]);

    return (
        <SidebarGroup>
            <SidebarMenu>
                {activeNav.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                onClick={() => router.push(item.url)}
                                isActive={item.isActive}
                                tooltip={isCollapsed && !isMobile ? item.title : undefined}
                                className={`flex items-center gap-2 ${
                                    item.isActive ? "bg-blue-500 text-white" : ""
                                } transition-colors duration-200`}
                            >
                                {IconComponent && (
                                    <IconComponent className="w-10 h-10" />
                                )}
                                {(!isCollapsed || isMobile) && <span>{item.title}</span>}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
};

// User Dropdown Menu Component
interface UserDropdownMenuProps {
    user: User;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ user }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-lg">
                            {user.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user.name}</span>
                        <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="rounded-lg">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{user.name}</span>
                            <span className="truncate text-xs">{user.role}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <FaQuestionCircle className="mr-2 h-4 w-4" />
                        Help
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

// Main AppSidebar Component
export const AppSidebar: React.FC = () => {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";
    const isMobile = useIsMobile();

    return (
        <Sidebar collapsible="icon" className="flex flex-col overflow-hidden">
            <Logo isCollapsed={isCollapsed} isMobile={isMobile} />
            <SidebarContent className="ml-1 flex-1 overflow-y-auto">
                <NavigationMenu navMain={data.navMain} />
            </SidebarContent>
            <SidebarFooter
                className={`flex items-center justify-center ${
                    isMobile || isCollapsed ? "ml-2" : ""
                }`}
            >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserDropdownMenu user={data.user} />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
