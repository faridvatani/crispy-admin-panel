"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import {
  Bell,
  Home,
  LineChart,
  Mail,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Button } from "../button/button";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: <Package className="h-4 w-4" />,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: <LineChart className="h-4 w-4" />,
  },
  {
    label: "Contact Us",
    href: "/dashboard/contact",
    icon: <Mail className="h-4 w-4" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>Crispy Panel</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((navItem: NavItem, index: number) => (
              <Link
                key={index}
                href={navItem.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary ${
                  pathname === navItem.href ? "bg-muted text-primary" : ""
                }`}
              >
                {navItem.icon}
                {navItem.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
