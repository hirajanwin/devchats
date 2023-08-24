"use client"

import React, { FC } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/themeToggle'
import Signout from '@/components/routes/Signout'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { usePathname } from "next/navigation"
import { Icon, Icons } from '@/components/icon'

interface SideBarProps { }

const SideBar: FC<SideBarProps> = ({ }) => {
    const pathname = usePathname()

    const sidebarNavigation = [
        { name: 'chats', href: '/chats', icon: "chats" },
        { name: 'people', href: '/friends', icon: "people" },
        { name: 'request', href: '/notifications', icon: "bell" },
        { name: 'settings', href: '/settings', icon: "settings" },
    ] as {
        name: string,
        href: string,
        icon: Icon,
    }[];

    return (
        <nav aria-label="Sidebar" className="flex flex-col justify-between border-r p-3">
            <div className="flex flex-col space-y-3">
                {sidebarNavigation.map((navigation) => {
                    const Icon = Icons[navigation.icon];
                    return (
                        <Link
                            key={navigation.name}
                            href={navigation.href}
                        >
                            <div
                                className={cn(
                                    buttonVariants({
                                        size: "icon",
                                        variant: "ghost",
                                    }),
                                    pathname === navigation.href
                                        ? "bg-muted"
                                        : "text-muted-foreground",
                                )}
                            >
                                <Icon className="h-5 w-5" aria-hidden="true" />
                                <span className="sr-only">{navigation.name}</span>
                            </div>
                        </Link>
                    )
                })}
                <ThemeToggle />
            </div>
            <Signout />
        </nav>
    )
}

export default SideBar
