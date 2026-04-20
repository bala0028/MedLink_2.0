import React from 'react';
import { User, Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur px-6 shadow-sm">
      <div className="flex flex-1 items-center gap-4 md:gap-8">
        <form className="relative flex-1 md:grow-0 sm:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search doctors, specialties..."
            className="w-full rounded-full bg-background pl-9 md:w-[300px] lg:w-[400px] border-muted-foreground/20 focus-visible:ring-primary/50"
          />
        </form>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative group rounded-full">
          <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <div className="flex items-center gap-2 cursor-pointer p-1 pr-2 rounded-full hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
          <Avatar className="h-8 w-8 ring-2 ring-primary/20">
            <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start leading-none gap-1 mr-2">
            <span className="text-sm font-medium">Dr. Jane Doe</span>
            <span className="text-xs text-muted-foreground">Doctor</span>
          </div>
        </div>
      </div>
    </header>
  );
}
