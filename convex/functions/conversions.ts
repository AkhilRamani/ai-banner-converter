import { v } from "convex/values";

import { query, mutation } from "../_generated/server";
import { requireAuth, requireConversionOwnership } from "../auth";
import { r2 } from "../r2";

// Get a specific conversion by ID
export const getConversion = query({
  args: { conversionId: v.id("conversions") },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);

    const conversion = await ctx.db.get(args.conversionId);

    if (!conversion || conversion.userId !== userId) {
      throw new Error("Access denied");
    }

    // Generate proper signed URL for downloading the image
    const key = `${userId}/uploads/${args.conversionId}`;

    // Use the R2 client API to generate a signed download URL
    const signedUrl = await r2.getUrl(key, { expiresIn: 3600 });

    return {
      ...conversion,
      signedUrl: signedUrl,
    };
  },
});

// Get current user's conversions (Authentication Required)
export const getConversions = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);

    const results = await ctx.db
      .query("conversions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // Generate signed URLs for each conversion's uploaded image
    const conversionsWithSignedUrls = await Promise.all(
      results.map(async (conversion) => {
        const key = `${userId}/uploads/${conversion._id}`;
        const signedUrl = await r2.getUrl(key, { expiresIn: 3600 });

        return {
          ...conversion,
          signedUrl: signedUrl,
        };
      })
    );

    return args.limit ? conversionsWithSignedUrls.slice(0, args.limit) : conversionsWithSignedUrls;
  },
});

export const deleteConversion = mutation({
  args: { conversionId: v.id("conversions") },
  handler: async (ctx, { conversionId }) => {
    const { userId } = await requireConversionOwnership(ctx, conversionId);

    // Get all conversionResults for this conversion
    const results = await ctx.db
      .query("conversionResults")
      .withIndex("by_conversion", (q) => q.eq("conversionId", conversionId))
      .collect();

    // Delete each conversionResult and its associated R2 object in parallel
    const deleteResultPromises = results.map(async (result) => {
      const r2Key = `${userId}/generations/${result._id}`;
      try {
        await r2.deleteObject(ctx, r2Key);
      } catch (error) {
        console.error(`Failed to delete R2 object for conversionResult ${result._id}:`, error);
      }
      await ctx.db.delete(result._id);
    });

    await Promise.all(deleteResultPromises);

    // Delete the main conversion image in R2 and the conversion record in parallel
    const mainR2Key = `${userId}/uploads/${conversionId}`;
    try {
      await r2.deleteObject(ctx, mainR2Key);
    } catch (error) {
      console.error(`Failed to delete main R2 object for conversion ${conversionId}:`, error);
    }
    await ctx.db.delete(conversionId);
  },
});
