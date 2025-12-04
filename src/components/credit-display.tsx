"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function CreditDisplay() {
    const credits = useQuery(api.functions.users.getUserCredits);

    if (!credits) return null;

    const { creditsRemaining, plan } = credits;
    const isLow = creditsRemaining < 2;

    return (
        <div className={cn(
            "group flex items-center p-1 pl-3 rounded-lg border transition-[border-color,box-shadow] duration-300",
            "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md",
            "hover:shadow-sm hover:border-neutral-300"
        )}>
            {isLow && <AlertCircle className="size-4 text-yellow-600 absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 bg-yellow-50 rounded-full" />}
            <div className="flex items-center gap-2">
                <p className="text-xs font-medium tracking-wide opacity-70">CREDITS</p>
                <span className={cn(
                    "text-base font-semibold",
                    "text-neutral-600"
                )}>
                    {creditsRemaining}
                </span>
            </div>

            <div className="h-4 w-[1px] bg-zinc-200 ml-2 mr-1" />

            <Badge
                variant="secondary"
                className={cn(
                    "h-6 px-2.5 text-[10px] font-medium tracking-wide uppercase border-0",
                    "bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200"
                )}
            >
                {plan}
            </Badge>
        </div>
    );
}
