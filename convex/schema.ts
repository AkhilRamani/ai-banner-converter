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
});
