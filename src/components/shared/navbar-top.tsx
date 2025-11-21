"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Wand2, Wand, User, LogOut } from "lucide-react";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { DropdownMenuItemCustom } from "../ui/custom/dropdown-menu-custom";

export function NavbarTop() {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b- border-gray-200/80 bg-white/80- backdrop-blur-md">
      <div className="px-4 lg:px-6 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo/Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                <Wand className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">Loomix</h1>
              </div>
            </Link>
          </div>

          {/* Right Section - User Menu & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* User Menu (Desktop) */}
            <div className="hidden sm:block">
              {!user ? (
                <Link href="/api/sign-in">
                  <Button size="sm">Sign In</Button>
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-0.5 rounded-full cursor-pointer hover:bg-neutral-300">
                      <Avatar className="size-8">
                        {user.profilePictureUrl && <AvatarImage src={user.profilePictureUrl} alt="User" />}
                        <AvatarFallback className="text-xs text-primary bg-muted-foreground/20">
                          {user.firstName?.charAt(0)}
                          {user.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-64 mt-2 rounded-xl">
                    <DropdownMenuItemCustom asChild>
                      <Link href="/home" className="flex items-center gap-2">
                        <Wand2 className="w-4 h-4" />
                        Convert
                      </Link>
                    </DropdownMenuItemCustom>
                    <DropdownMenuItemCustom asChild>
                      <Link href="/profile" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </DropdownMenuItemCustom>
                    <DropdownMenuItemCustom onClick={async () => await signOut()}>
                      <LogOut className="w-4 h-4" />
                      Logout
                    </DropdownMenuItemCustom>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
