"use client";

import * as React from "react";
import Image from "next/image";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function BrandDetails() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex">
          <div className="bg-blue-950 text-primary">
            <Image
              src="/asmicollection_logo.png"
              alt="My Logo"
              width={500}
              height={500}
              className="size-12 rounded"
            />
          </div>
          <div className="flex flex-col gap-2 mx-2 justify-center leading-none">
            <span className="font-semibold">Asmi Collection</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
