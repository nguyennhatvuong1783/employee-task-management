"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ListTodo, MessageCircle, UserRoundCog } from "lucide-react";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

const items = [
  {
    title: "Manage Employee",
    url: "/dashboard/employee",
    icon: UserRoundCog,
  },
  {
    title: "Manage Task",
    url: "/dashboard/task",
    icon: ListTodo,
  },
  {
    title: "Message",
    url: "/dashboard/message",
    icon: MessageCircle,
  },
];
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar:
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
};

interface AppSidebarProps {
  setbreadcrumbPage: (page: string) => void;
}

export function AppSidebar({ setbreadcrumbPage, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={items} setbreadcrumbPage={setbreadcrumbPage} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
