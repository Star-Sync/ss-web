"use client"

// External Libraries
import React from "react";
import Image from "next/image";
import { FaQuestionCircle } from "react-icons/fa";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";

// Icons
import {
    ChevronsUpDown,
    CogIcon,
    LayoutDashboard,
    LogOut,
} from "lucide-react";

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

// Data
const data = {
    user: {
        name: "Sathira Williams",
        email: "sathira.williams@gmail.com",
        avatar: "/ss-logo-favicon.png",
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
            title: "Settings",
            url: "/settings",
            isActive: false,
            icon: CogIcon,
        },
    ],
};

// Logo Component
function Logo({ isCollapsed, isMobile }) {
    return (
        <SidebarHeader className="mt-3 ml-1 flex items-center justify-center transition-all duration-300">
            {!isCollapsed || isMobile ? (
                <Image
                    src="/ss-logo-full.png"
                    alt="Wide Logo"
                    width={128}
                    height={64}
                    className="transition-all duration-300 mt-4"
                />
            ) : (
                <Image
                    src="/favicon.png"
                    alt="Square Logo"
                    width={30}
                    height={30}
                    className="transition-all duration-300"
                />
            )}
        </SidebarHeader>
    );
}

// Navigation Menu Component
function NavigationMenu({ navMain }) {
    const router = useRouter();
    return (
        <SidebarGroup>
            <SidebarMenu>
                {navMain.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <SidebarMenuItem key={item.title} asChild onClick={() => router.push(item.url)}>
                            <SidebarMenuButton href={item.url} active={item.isActive}>
                                {IconComponent && (
                                    <span className="icon">
                                        <IconComponent />
                                    </span>
                                )}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

// User Dropdown Menu Component
function UserDropdownMenu({ user }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user.name}</span>
                        <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
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
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
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
                        <FaQuestionCircle />
                        Help
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// Main AppSidebar Component
export function AppSidebar() {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";
    const isMobile = useIsMobile();

    return (
        <Sidebar collapsible="icon">
            <Logo isCollapsed={isCollapsed} isMobile={isMobile} />
            <SidebarContent className="ml-1">
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
}
