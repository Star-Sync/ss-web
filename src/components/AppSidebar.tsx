import {
    ChevronsUpDown,
    CogIcon,
    LayoutDashboard,
    LogOut,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/sidebar"
import Image from "next/image";
import {FaQuestionCircle} from "react-icons/fa";
import {useIsMobile} from "@/hooks/use-mobile";

const data = {
    user: {
        name: "Sathira Williams",
        email: "sathira.williams@gmail.com",
        avatar: "/favicon.png",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            isActive: true,
        },
    ],
}

export function AppSidebar() {

    const {state} = useSidebar()
    const isCollapsed = state === "collapsed"
    const isMobile = useIsMobile()
    return (

        <div>
            <Sidebar collapsible="icon">
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
                <SidebarContent  className="ml-1">
                    <SidebarGroup>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                <SidebarMenuItem key={item.title} asChild>
                                    <SidebarMenuButton href={item.url} active={item.isActive}>
                                        {item.title === "Dashboard" ? (
                                            <span className="icon"><LayoutDashboard /></span>
                                        ) : item.title === "Settings" ? (
                                            <span className="icon"><CogIcon /></span>
                                        ) : null}
                                        <span className="">{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className={`flex items-center justify-center ${isMobile || isCollapsed ? 'ml-2' : ''}`}>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={data.user.avatar}
                                                alt={data.user.name}
                                            />
                                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                              <span className="truncate font-semibold">
                                                {data.user.name}
                                              </span>
                                            <span className="truncate text-xs">
                                                {data.user.email}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4"/>
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
                                                <AvatarImage
                                                    src={data.user.avatar}
                                                    alt={data.user.name}
                                                />
                                                <AvatarFallback className="rounded-lg">
                                                    CN
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                  {data.user.name}
                                                </span>
                                                <span className="truncate text-xs">
                                                  {data.user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuGroup>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <FaQuestionCircle/>
                                            Help
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <CogIcon/>
                                            Settings
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <LogOut/>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </div>
    )
}
