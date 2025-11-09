import { LogOut, User, Wand, Wand2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuItemCustom } from "@/components/ui/custom/dropdown-menu-custom";

export const LandingNavbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95- backdrop-blur-sm-">
      <div className="max-w-7xl- mx-auto px-2 lg:px-4">
        <div className="relative flex items-center justify-between h-16">
          <Link href="#" className="flex items-center gap-3 hover:bg-neutral-200/50 backdrop-blur-xl px-2 pr-6 py-2 rounded-xl transition-colors">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <Wand className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-neutral-900">Loomix</span>
          </Link>

          <nav className="absolute items-center hidden gap-6 md:flex left-1/2 -translate-x-1/2 bg-neutral-200/40 backdrop-blur-md px-6 py-3 rounded-xl">
            <Link href="#features" className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
              Features
            </Link>
            <Link href="/home" className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
              Convert
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
              Pricing
            </Link>
          </nav>

          <div className="hidden- flex items-center gap-2 bg-neutral-200/50- backdrop-blur-xl px-2 py-2 rounded-xl">
            {!user ? (
              <>
                <Link href="/api/sign-in">
                  <ButtonCustom variant="outline" size="sm">
                    Sign In
                  </ButtonCustom>
                </Link>
                <Link href="/api/sign-up">
                  <ButtonCustom variant="main" size="sm">
                    Get Started
                  </ButtonCustom>
                </Link>
              </>
            ) : (
              <>
                <Link href="/home" className="mr-1">
                  <ButtonCustom variant="outline" size="sm">
                    Dashboard
                  </ButtonCustom>
                </Link>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
