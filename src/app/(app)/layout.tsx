"use client";

import { NavbarTop } from "@/components/shared/navbar-top";
import { CreditProvider } from "@/providers/credit-provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <CreditProvider>
      <div className="min-h-screen h-screen flex flex-col">
        <NavbarTop />

        <main className="pt-[4rem] relative flex-1 flex overflow-auto">{children}</main>
      </div>
    </CreditProvider>
  );
}
