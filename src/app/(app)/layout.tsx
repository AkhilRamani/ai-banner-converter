"use client";

import { ImageConverterProvider } from "@/lib/hooks/use-image-converter-context";
import { NavbarTop } from "@/components/shared/navbar-top";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ImageConverterProvider>
      <div className="min-h-screen h-screen flex flex-col">
        <NavbarTop />

        <main className="pt-[4rem] relative flex-1 flex overflow-auto">{children}</main>
      </div>
    </ImageConverterProvider>
  );
}
