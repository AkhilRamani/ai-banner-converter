import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { platformValidator, formatResultStatusValidator } from "./schema";
import { requireAuth, requireConversionOwnership } from "./auth";

// Create a new format conversion
export const createFormatConversion = mutation({
  args: {
    conversionId: v.id("conversions"),
    platform: platformValidator,
    format: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const now = Date.now();

    return await ctx.db.insert("formatResults", {
      conversionId: args.conversionId,
      platform: args.platform,
      format: args.format,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Get format conversions for a specific conversion
export const getFormatConversions = query({
  args: { conversionId: v.id("conversions") },
  handler: async (ctx, args) => {
    await requireConversionOwnership(ctx, args.conversionId);

    return await ctx.db
      .query("formatResults")
      .filter((q) => q.eq(q.field("conversionId"), args.conversionId))
      .collect();
  },
});

// Update format conversion status and details
export const updateFormatConversion = mutation({
  args: {
    formatId: v.id("formatResults"),
    status: v.optional(formatResultStatusValidator),
    r2Key: v.optional(v.string()),
    r2Url: v.optional(v.string()),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { formatId, ...updates } = args;
    // Get the format result to verify ownership
    const formatResult = await ctx.db.get(formatId);
    if (!formatResult) {
      throw new Error("Format result not found");
    }

    // Verify the user owns the conversion this format result belongs to
    await requireConversionOwnership(ctx, formatResult.conversionId);

    await ctx.db.patch(formatId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete a format conversion
export const deleteFormatConversion = mutation({
  args: {
    formatId: v.id("formatResults"),
  },
  handler: async (ctx, args) => {
    // Get the format result to verify ownership
    const formatResult = await ctx.db.get(args.formatId);
    if (!formatResult) {
      throw new Error("Format result not found");
    }

    // Verify the user owns the conversion this format result belongs to
    await requireConversionOwnership(ctx, formatResult.conversionId);

    await ctx.db.delete(args.formatId);
  },
});
