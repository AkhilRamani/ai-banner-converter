import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  conversions: defineTable({
    id: v.string(),
    originalImageUrl: v.string(),
    originalFileName: v.string(),
    originalFileSize: v.number(),
    errorMessage: v.optional(v.string()),
    userId: v.optional(v.string()), // For future multi-user support
  }).index("by_user", ["userId"]),

  formatResults: defineTable({
    id: v.string(),
    conversionId: v.id("conversions"),
    platform: v.string(), // e.g., 'instagram', 'facebook', 'twitter'
    format: v.string(), // e.g., '1080x1080', '1200x630'
    status: v.union(v.literal("pending"), v.literal("processing"), v.literal("completed"), v.literal("failed")),
    r2Key: v.optional(v.string()), // Path in R2 storage
    r2Url: v.optional(v.string()), // Public URL for the converted image
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    version: v.number(), // For retry functionality
    errorMessage: v.optional(v.string()),
  })
    .index("by_conversion", ["conversionId"])
    .index("by_status", ["status"])
    .index("by_conversion_and_format", ["conversionId", "platform", "format"])
    .searchIndex("search_format", {
      searchField: "format",
      filterFields: ["platform", "status"],
    }),
});
