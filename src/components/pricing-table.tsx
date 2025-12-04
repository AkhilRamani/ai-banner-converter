"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Check } from "lucide-react";

export function PricingTable() {
    const plans = useQuery(api.functions.plans.getPlans);
    const userCredits = useQuery(api.functions.users.getUserCredits);

    if (!plans || !userCredits) return null;

    // Sort plans by sortOrder
    const sortedPlans = [...plans].sort((a, b) => a.sortOrder - b.sortOrder);

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {sortedPlans.map((plan) => (
                <div
                    key={plan.planId}
                    className={`border rounded-lg p-6 flex flex-col ${userCredits.plan === plan.planId
                        ? "border-blue-500 shadow-lg relative overflow-hidden"
                        : "border-slate-200"
                        }`}
                >
                    {userCredits.plan === plan.planId && (
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                            Current Plan
                        </div>
                    )}

                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div className="mt-4">
                        <span className="text-4xl font-bold">
                            ${(plan.price / 100).toFixed(0)}
                        </span>
                        <span className="text-slate-600">/month</span>
                    </div>

                    <div className="mt-2 text-sm text-slate-500">
                        {plan.creditsPerMonth} credits per month
                    </div>

                    <ul className="mt-6 space-y-3 flex-grow">
                        {plan.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        className={`mt-8 w-full py-3 px-4 rounded-lg font-medium transition-colors ${userCredits.plan === plan.planId
                            ? "bg-slate-100 text-slate-400 cursor-default"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                        disabled={userCredits.plan === plan.planId}
                        onClick={() => {
                            if (userCredits.plan !== plan.planId) {
                                // TODO: Implement Stripe checkout
                                alert("Stripe integration coming soon!");
                            }
                        }}
                    >
                        {userCredits.plan === plan.planId ? "Current Plan" : "Upgrade"}
                    </button>
                </div>
            ))}
        </div>
    );
}
