import { internalMutation } from "../_generated/server";

export const resetMonthlyCredits = internalMutation({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();

        for (const user of users) {
            const plan = await ctx.db
                .query("plans")
                .withIndex("by_planId", (q) => q.eq("planId", user.plan))
                .first();

            if (!plan) continue;

            const newBalance = plan.creditsPerMonth;

            // Reset credits
            await ctx.db.patch(user._id, {
                creditsRemaining: newBalance,
                creditsUsed: 0,
                updatedAt: Date.now(),
            });

            // Record transaction
            await ctx.db.insert("creditTransactions", {
                userId: user.userId,
                type: "reset",
                amount: newBalance,
                createdAt: Date.now(),
            });
        }
    },
});
