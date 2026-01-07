"use client";

import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DashboardTrial } from "./dashboard-trial";


const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
    }
]

const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade",
    },
]


export const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar>   
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <Image src="logo.svg" height={36} width={36} alt="Elevate AI" />
                    <p className="text-2xl font-semibold text-white">Elevate AI</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-100 text-[#5D6B68]" />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>   
                            {firstSection.map(item => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        "h-10 flex items-center gap-2 rounded-md px-2",
                                        "text-sidebar-foreground/80",
                                        "border border-transparent",
                                        "hover:text-sidebar-accent-foreground",
                                        "hover:border-sidebar-border/40",
                                        "hover:bg-gradient-to-r hover:from-sidebar-accent/40 hover:via-sidebar/30 hover:to-sidebar/10",
                                        "active:bg-sidebar-accent/50 active:text-sidebar-accent-foreground",
                                        "transition-colors",
                                        pathname === item.href && "text-sidebar-accent-foreground bg-gradient-to-r from-sidebar-accent/20 via-transparent to-transparent border-transparent"
                                    )}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                    <Separator className="opcaity-100 text-[#5D6B68" />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>   
                            {secondSection.map(item => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild className={cn(
                                        "h-10 flex items-center gap-2 rounded-md px-2",
                                        "text-sidebar-foreground/80",
                                        "border border-transparent",
                                        "hover:text-sidebar-accent-foreground",
                                        "hover:border-sidebar-border/40",
                                        "hover:bg-gradient-to-r hover:from-sidebar-accent/40 hover:via-sidebar/30 hover:to-sidebar/10",
                                        "active:bg-sidebar-accent/50 active:text-sidebar-accent-foreground",
                                        "transition-colors",
                                        pathname === item.href && "text-sidebar-accent-foreground bg-gradient-to-r from-sidebar-accent/20 via-transparent to-transparent border-transparent"
                                    )}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-white">
                <DashboardTrial />
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    );
}