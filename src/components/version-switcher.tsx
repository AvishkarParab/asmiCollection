"use client";

import * as React from "react";
import { Shirt } from "lucide-react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function BrandDetails() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex p-4">
          <div className="bg-blue-950 text-primary">
            <Shirt className="size-4 " />
          </div>
          <div className="flex flex-col gap-2 mx-2 leading-none">
            <span className="font-semibold">Asmi Collection</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
