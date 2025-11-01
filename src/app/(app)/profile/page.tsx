"use client";

import { ProfilePage } from "@/components/pages/profile/profile.page";
import { Authenticated } from "convex/react";

export default function Page() {
  return (
    <Authenticated>
      <div className="w-full h-full">
        <ProfilePage />
      </div>
    </Authenticated>
  );
}
