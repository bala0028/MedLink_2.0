import React from 'react';
import { 
  Home, Calendar, MessageSquare, FileText, 
  Pill, CreditCard, Stethoscope, Bell, Settings, HelpCircle, Activity 
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

// Menu items.
const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Medical Records", url: "/records", icon: FileText },
  { title: "Prescriptions", url: "/prescriptions", icon: Pill },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Find Doctors", url: "/doctors", icon: Stethoscope },
]

const settingsItems = [
  { title: "Notifications", url: "#", icon: Bell },
  { title: "Settings", url: "#", icon: Settings },
  { title: "Support", url: "#", icon: HelpCircle },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-2">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-25 w-auto object-contain" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2 px-6">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-4">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    render={<a href={item.url} />}
                    tooltip={item.title} 
                    className="hover:bg-primary/10 hover:text-primary transition-all duration-200 py-5 rounded-xl flex items-center gap-3"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium text-[15px]">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto pb-4">
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2 px-6">Preferences</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-4">
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    render={<a href={item.url} />}
                    tooltip={item.title} 
                    className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 py-5 rounded-xl flex items-center gap-3"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium text-[15px]">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
