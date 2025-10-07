import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { platformValidator, formatResultStatusValidator } from "./schema";
import { requireAuth, requireConversionOwnership } from "./auth";

// Create a new conversion result
export const createConversionResult = mutation({
  args: {
    conversionId: v.id("conversions"),
    platform: platformValidator,
    format: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const now = Date.now();

    return await ctx.db.insert("conversionResults", {
      conversionId: args.conversionId,
      platform: args.platform,
      format: args.format,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Get conversion results for a specific conversion
export const getConversionResults = query({
  args: { conversionId: v.id("conversions") },
  handler: async (ctx, args) => {
    await requireConversionOwnership(ctx, args.conversionId);

    return await ctx.db
      .query("conversionResults")
      .filter((q) => q.eq(q.field("conversionId"), args.conversionId))
      .collect();
  },
});

// Update conversion result status and details
export const updateConversionResult = mutation({
  args: {
    formatId: v.id("conversionResults"),
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

// Delete a conversion result
export const deleteConversionResult = mutation({
  args: {
    formatId: v.id("conversionResults"),
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
