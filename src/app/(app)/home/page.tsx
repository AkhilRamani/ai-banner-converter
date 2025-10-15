"use client";

import { HomePage } from "@/components/pages/home/home.page";
import { Authenticated } from "convex/react";

export default function Page() {
  return (
    <Authenticated>
      <div className="w-full h-full">
        <HomePage />
      </div>
    </Authenticated>
  );
}
