import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { requireAuth } from "../auth";

// Get or create user profile (called on every auth)
export const getOrCreateUser = mutation({
    args: {},
    handler: async (ctx) => {
        const userId = await requireAuth(ctx);
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        // Check if user exists
        let user = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();

        if (!user) {
            // Create new user with Free plan
            const freePlan = await ctx.db
                .query("plans")
                .withIndex("by_planId", (q) => q.eq("planId", "free"))
                .first();

            const now = Date.now();

            const newUserId = await ctx.db.insert("users", {
                userId,
                creditsRemaining: freePlan?.creditsPerMonth ?? 5,
                creditsUsed: 0,
                plan: "free",
                planStartDate: now,
                billingCycle: "monthly",
                createdAt: now,
                updatedAt: now,
            });

            user = await ctx.db.get(newUserId);
        }

        return user;
    },
});

// Get current user's credits
export const getUserCredits = query({
    args: {},
    handler: async (ctx) => {
        const userId = await requireAuth(ctx);
        const user = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first();

        return {
            creditsRemaining: user?.creditsRemaining ?? 0,
            creditsUsed: user?.creditsUsed ?? 0,
            plan: user?.plan ?? "free",
        };
    },
});

// Admin function to manually add credits (bonus, refund, etc.)
export const adminAddCredits = mutation({
    args: {
        targetUserId: v.string(),
        amount: v.number(),
        reason: v.string(),
    },
    handler: async (ctx, args) => {
        // TODO: Add admin role check when you implement RBAC
        await requireAuth(ctx);

        const { addCredits } = await import("../lib/creditHelpers");
        return await addCredits(ctx, args.targetUserId, args.amount, "bonus");
    },
});
