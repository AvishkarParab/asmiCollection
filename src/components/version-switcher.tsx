"use client";

import * as React from "react";
import { Shirt } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function BrandDetails() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-white text-blue-600 flex aspect-square size-8 items-center justify-center rounded-lg">
            <Shirt className="size-4 " />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Asmi Collection</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
