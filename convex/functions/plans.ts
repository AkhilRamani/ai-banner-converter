import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

// Get all available plans
export const getPlans = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("plans")
            .withIndex("by_active", (q) => q.eq("isActive", true))
            .collect();
    },
});

// Seed initial plans (run once)
export const seedPlans = mutation({
    args: {},
    handler: async (ctx) => {
        const existingPlans = await ctx.db.query("plans").collect();
        if (existingPlans.length > 0) {
            // Optional: Update existing plans if needed, or just return
            // For now, we'll assume we want to re-seed or update if empty.
            // If you want to force update, you'd need a different logic.
            return { message: "Plans already seeded" };
        }

        const plans = [
            {
                planId: "free",
                type: "free",
                name: "Free",
                creditsPerMonth: 5,
                price: 0,
                features: [
                    "5 conversions per month",
                    "All platform formats",
                    "AI-powered resizing",
                    "Community support"
                ],
                isActive: true,
                sortOrder: 1,
            },
            {
                planId: "pro",
                type: "pro",
                name: "Pro",
                creditsPerMonth: 50,
                price: 1900, // $19.00
                features: [
                    "50 conversions per month",
                    "All platform formats",
                    "AI-powered resizing",
                    "Priority support",
                    "Batch processing"
                ],
                isActive: true,
                sortOrder: 2,
            },
            {
                planId: "enterprise",
                type: "enterprise",
                name: "Enterprise",
                creditsPerMonth: 500,
                price: 9900, // $99.00
                features: [
                    "500 conversions per month",
                    "All platform formats",
                    "AI-powered resizing",
                    "Dedicated support",
                    "Batch processing",
                    "API access",
                    "Custom integrations"
                ],
                isActive: true,
                sortOrder: 3,
            },
        ];

        for (const plan of plans) {
            // @ts-ignore - type checking might fail until schema is updated in generated files
            await ctx.db.insert("plans", plan);
        }

        return { message: "Plans seeded successfully" };
    },
});
