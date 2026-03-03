import { User, Settings, Layout, LogOut } from "lucide-react";
import { logoutUser } from "@/lib/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Layout,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: User,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroupLabel className="my-4">
          <Image src="/logo.png" alt="Logo" width={42} height={42} />
          <h1 className="text-lg md:text-xl font-semibold text-black dark:text-slate-100 ml-2">
            Pulse Board
          </h1>
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="my-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="my-4">
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-lg text-[#030229] dark:text-slate-200 font-medium">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white dark:bg-zinc-950">
        <Button
          className="bg-purple hover:bg-purple/80 cursor-pointer"
          onClick={logoutUser}
        >
          Logout <LogOut />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
