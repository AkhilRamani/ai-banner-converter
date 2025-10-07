import { v } from "convex/values";

import { query } from "../_generated/server";
import { requireAuth } from "../auth";
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

    return args.limit ? results.slice(0, args.limit) : results;
  },
});
