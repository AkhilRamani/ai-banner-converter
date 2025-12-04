import { v } from "convex/values";
import { mutation, internalMutation } from "../_generated/server";
import { Id } from "../_generated/dataModel";

// Operation costs configuration
export const OPERATION_COSTS = {
    image_conversion: 1,
    video_generation: 10, // Future placeholder
} as const;

export type OperationType = keyof typeof OPERATION_COSTS;

/**
 * Internal helper to get user by userId
 * Throws if user not found
 */
export const getUserByUserId = async (ctx: any, userId: string) => {
    const user = await ctx.db
        .query("users")
        .withIndex("by_userId", (q: any) => q.eq("userId", userId))
        .first();

    if (!user) {
        throw new Error("User profile not found. Please refresh the page.");
    }

    return user;
};

/**
 * Check if user has enough credits for an operation
 * Returns user object if check passes, throws error otherwise
 */
export const checkCredits = async (
    ctx: any,
    userId: string,
    operationId: OperationType
) => {
    const user = await getUserByUserId(ctx, userId);
    const cost = OPERATION_COSTS[operationId];

    if (user.creditsRemaining < cost) {
        throw new Error(
            `Insufficient credits. You need ${cost} credits for this operation, ` +
            `but only have ${user.creditsRemaining} remaining. Upgrade your plan to get more credits.`
        );
    }

    return { user, cost };
};

/**
 * Deduct credits and log transaction
 * This is the main reusable function for any credit consumption
 * 
 * @param ctx - Convex context
 * @param userId - User ID
 * @param operationId - Operation type ID (e.g., "image_conversion")
 * @param customAmount - Optional override for operation cost
 * @returns New credit balance
 */
export const deductCredits = async (
    ctx: any,
    userId: string,
    operationId: OperationType,
    customAmount?: number
) => {
    const user = await getUserByUserId(ctx, userId);
    const cost = OPERATION_COSTS[operationId];
    const amount = customAmount ?? cost;

    // Check sufficient credits
    if (user.creditsRemaining < amount) {
        throw new Error(
            `Insufficient credits. You need ${amount} credits for this operation, ` +
            `but only have ${user.creditsRemaining} remaining.`
        );
    }

    const newBalance = user.creditsRemaining - amount;

    // Update user credits
    await ctx.db.patch(user._id, {
        creditsRemaining: newBalance,
        creditsUsed: user.creditsUsed + amount,
        updatedAt: Date.now(),
    });

    // Record transaction
    await ctx.db.insert("creditTransactions", {
        userId,
        type: "deduction",
        amount: -amount,
        operationId,
        createdAt: Date.now(),
    });

    return newBalance;
};

/**
 * Add credits (for refunds, bonuses, etc.)
 * 
 * @param ctx - Convex context
 * @param userId - User ID
 * @param amount - Credits to add (positive number)
 * @param type - Transaction type
 * @returns New credit balance
 */
export const addCredits = async (
    ctx: any,
    userId: string,
    amount: number,
    type: "refund" | "bonus" | "reset"
) => {
    if (amount <= 0) {
        throw new Error("Amount must be positive");
    }

    const user = await getUserByUserId(ctx, userId);
    const newBalance = user.creditsRemaining + amount;

    // Update user credits
    await ctx.db.patch(user._id, {
        creditsRemaining: newBalance,
        updatedAt: Date.now(),
    });

    // Record transaction
    await ctx.db.insert("creditTransactions", {
        userId,
        type,
        amount,
        createdAt: Date.now(),
    });

    return newBalance;
};

/**
 * Refund credits for a failed conversion
 * Refunds the standard cost of the operation
 */
export const refundConversion = async (
    ctx: any,
    userId: string,
    // We keep the arg for compatibility/logging, but don't use it for lookup anymore
    _conversionResultId: Id<"conversionResults">
) => {
    // We assume it was an image conversion. 
    // In the future if we have multiple types, we might need to look up the conversionResult to see the type.
    const refundAmount = OPERATION_COSTS.image_conversion;

    return await addCredits(
        ctx,
        userId,
        refundAmount,
        "refund"
    );
};
