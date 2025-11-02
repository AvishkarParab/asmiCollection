"use client";
import * as React from "react";
import Link from "next/link";
import { BrandDetails } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const data = [
  {
    title: "Home",
    url: "/home",
    isActive: true,
  },
  {
    title: "Employee",
    url: "/employee",
    isActive: false,
  },
  {
    title: "Signout",
    url: "/login",
    isActive: false,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname: string = usePathname()
    .split("/")
    .filter((path) => path)[0];

  data.forEach((item) => {
    item.isActive = false;
    if (item.url.slice(1) === pathname) {
      item.isActive = true;
    }
  });

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-blue-950 text-primary">
        <BrandDetails />
      </SidebarHeader>
      <SidebarContent className="bg-primary text-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.url}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
