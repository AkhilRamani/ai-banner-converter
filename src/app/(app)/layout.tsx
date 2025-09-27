"use client";

import { ImageConverterProvider } from "@/lib/hooks/use-image-converter-context";
import { NavbarTop } from "@/components/shared/navbar-top";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ImageConverterProvider>
      <div className="min-h-screen">
        <NavbarTop />

        <main className="pt-[4rem] relative">
          <div className="flex flex-col h-full min-h-[90vh]">{children}</div>
        </main>
      </div>
    </ImageConverterProvider>
  );
}
