import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { Doc, Id } from "../_generated/dataModel";
import { platformValidator, formatResultStatusValidator } from "../schema";
import { requireAuth, requireConversionOwnership } from "../auth";
import { r2 } from "../r2";

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

// Get conversion results with signed URLs for a specific conversion
export const getConversionResultsWithSignedUrls = query({
  args: { conversionId: v.id("conversions") },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    await requireConversionOwnership(ctx, args.conversionId);

    const results = await ctx.db
      .query("conversionResults")
      .filter((q) => q.eq(q.field("conversionId"), args.conversionId))
      .collect();

    // Generate signed URLs for all completed results in parallel
    const resultsWithUrls = await Promise.all(
      results.map(async (result) => {
        if (result.status === "completed") {
          try {
            // Reconstruct r2Key from userId and conversionResultId
            const r2Key = `${userId}/generations/${result._id}`;
            const signedUrl = await r2.getUrl(r2Key, { expiresIn: 3600 });
            return {
              ...result,
              signedUrl,
            };
          } catch (error) {
            console.error(`Failed to generate signed URL for ${result._id}:`, error);
            return result;
          }
        }
        return result;
      })
    );

    return resultsWithUrls;
  },
});

import { deductCredits } from "../lib/creditHelpers";

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

    // Create conversion result first (to get ID for transaction)
    const resultId = await ctx.db.insert("conversionResults", {
      conversionId: args.conversionId,
      platform: args.platform,
      format: args.format,
      status: "pending",
      updatedAt: now,
    });

    try {
      // Deduct credits using reusable helper
      await deductCredits(ctx, userId, "image_conversion");
    } catch (error) {
      // If credit deduction fails, delete the conversion result
      await ctx.db.delete(resultId);
      throw error;
    }

    return resultId;
  },
});

// Add a function to handle failed conversions with refunds
export const markConversionFailed = mutation({
  args: {
    formatId: v.id("conversionResults"),
    shouldRefund: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const formatResult = await ctx.db.get(args.formatId);

    if (!formatResult) {
      throw new Error("Format result not found");
    }

    await requireConversionOwnership(ctx, formatResult.conversionId);

    // Update status to failed
    await ctx.db.patch(args.formatId, {
      status: "failed",
      updatedAt: Date.now(),
    });

    // Optionally refund credits
    if (args.shouldRefund) {
      const { refundConversion } = await import("../lib/creditHelpers");
      await refundConversion(ctx, userId, args.formatId);
    }
  },
});

// Update conversion result status and details
export const updateConversionResult = mutation({
  args: {
    formatId: v.id("conversionResults"),
    status: v.optional(formatResultStatusValidator),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    deductCredit: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { formatId, deductCredit, ...updates } = args;
    // Get the format result to verify ownership
    const formatResult = await ctx.db.get(formatId);
    if (!formatResult) {
      throw new Error("Format result not found");
    }

    // Verify the user owns the conversion this format result belongs to
    const { userId } = await requireConversionOwnership(ctx, formatResult.conversionId);

    if (deductCredit) {
      await deductCredits(ctx, userId, "image_conversion");
    }

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

    const { userId } = await requireConversionOwnership(ctx, formatResult.conversionId);

    await ctx.db.delete(args.formatId);

    const objectKey = `${userId}/generations/${args.formatId}`;
    r2.deleteObject(ctx, objectKey);
  },
});
