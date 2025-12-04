import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Reusable validators
export const platformValidator = v.union(
  v.literal("instagram"),
  v.literal("facebook"),
  v.literal("linkedin"),
  v.literal("x"),
  v.literal("google"),
  v.literal("youtube"),
  v.literal("email"),
  v.literal("website"),
  v.literal("pinterest")
);

export const formatResultStatusValidator = v.union(v.literal("pending"), v.literal("processing"), v.literal("completed"), v.literal("failed"));

export default defineSchema({
  conversions: defineTable({
    userId: v.string(), // Required for authentication
    fileName: v.string(),
    fileSize: v.number(),
    isUploadPending: v.boolean(),
    name: v.string(),
    updatedAt: v.number(),
  }).index("by_user", { fields: ["userId"] }),

  conversionResults: defineTable({
    conversionId: v.id("conversions"),
    platform: platformValidator,
    format: v.string(),
    status: formatResultStatusValidator,
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    updatedAt: v.number(),
  })
    .index("by_conversion", { fields: ["conversionId"] })
    .index("by_status", { fields: ["status"] }),

  // User profiles with subscription info
  users: defineTable({
    userId: v.string(), // WorkOS user ID

    // Credits
    creditsRemaining: v.number(), // Current available credits
    creditsUsed: v.number(), // Total credits used this billing period

    // Subscription
    plan: v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise")),
    planStartDate: v.number(), // Timestamp when current plan started
    billingCycle: v.union(v.literal("monthly"), v.literal("annual"), v.literal("lifetime")),

    // Metadata
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"]),

  // Plan definitions (can be modified without code changes)
  plans: defineTable({
    planId: v.string(), // "free", "pro", "enterprise"
    type: v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise")), // For UI logic
    name: v.string(), // Display name
    creditsPerMonth: v.number(), // Monthly credit allocation
    price: v.number(), // Price in cents (for future Stripe integration)
    features: v.array(v.string()), // List of feature descriptions
    isActive: v.boolean(), // Can new users subscribe?
    sortOrder: v.number(), // Display order
  })
    .index("by_planId", ["planId"])
    .index("by_active", ["isActive"]),

  // Credit usage history (for analytics and debugging)
  creditTransactions: defineTable({
    userId: v.string(),
    type: v.union(
      v.literal("deduction"), // Credit used
      v.literal("refund"), // Credit refunded
      v.literal("reset"), // Monthly reset
      v.literal("bonus") // Manual bonus credit
    ),
    amount: v.number(), // Positive for refund/reset/bonus, negative for deduction


    createdAt: v.number(),

    // Link to operation type for analytics
    operationId: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_type", ["type"])
    .index("by_operation", ["operationId"]),
});
