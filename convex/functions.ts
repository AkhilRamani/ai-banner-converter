import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Image Upload Function
export const uploadImage = mutation({
  args: {
    originalImageUrl: v.string(),
    originalFileName: v.string(),
    originalFileSize: v.number(),
  },
  handler: async (ctx, args) => {
    const id = crypto.randomUUID();

    return await ctx.db.insert("conversions", {
      id,
      originalImageUrl: args.originalImageUrl,
      originalFileName: args.originalFileName,
      originalFileSize: args.originalFileSize,
    });
  },
});

// Get all conversions for a user (or all if no user filter)
export const getConversions = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.userId) {
      return await ctx.db
        .query("conversions")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .collect();
    }
    return await ctx.db.query("conversions").collect();
  },
});

// Get a specific conversion by ID
export const getConversion = query({
  args: { conversionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversions")
      .filter((q) => q.eq(q.field("id"), args.conversionId))
      .first();
  },
});

// Create a new format conversion
export const createFormatConversion = mutation({
  args: {
    conversionId: v.string(),
    platform: v.string(),
    format: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the latest version for this conversion and format
    const existingFormats = await ctx.db
      .query("formatResults")
      .filter((q) =>
        q.and(q.eq(q.field("conversionId"), args.conversionId as any), q.eq(q.field("platform"), args.platform), q.eq(q.field("format"), args.format))
      )
      .collect();

    const nextVersion = existingFormats.length > 0 ? Math.max(...existingFormats.map((f) => f.version)) + 1 : 1;

    const id = crypto.randomUUID();

    return await ctx.db.insert("formatResults", {
      id,
      conversionId: args.conversionId as any,
      platform: args.platform,
      format: args.format,
      status: "pending",
      version: nextVersion,
    });
  },
});

// Get format conversions for a specific conversion
export const getFormatConversions = query({
  args: { conversionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("formatResults")
      .filter((q) => q.eq(q.field("conversionId"), args.conversionId as any))
      .collect();
  },
});

// Update format conversion status and details
export const updateFormatConversion = mutation({
  args: {
    formatId: v.string(),
    status: v.optional(v.union(v.literal("pending"), v.literal("processing"), v.literal("completed"), v.literal("failed"))),
    r2Key: v.optional(v.string()),
    r2Url: v.optional(v.string()),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    errorMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { formatId, ...updates } = args;

    await ctx.db.patch(formatId as any, updates);
  },
});

// Delete a format conversion
export const deleteFormatConversion = mutation({
  args: {
    formatId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.formatId as any);
  },
});

// Get format conversions by status
export const getFormatConversionsByStatus = query({
  args: {
    status: v.union(v.literal("pending"), v.literal("processing"), v.literal("completed"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("formatResults")
      .filter((q) => q.eq(q.field("status"), args.status))
      .collect();
  },
});
