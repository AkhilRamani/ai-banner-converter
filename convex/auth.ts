/**
 * Shared authentication utilities for Convex functions
 */

/**
 * Helper function to get authenticated user ID
 * @param ctx - Convex context object
 * @returns Promise<string> - The authenticated user's ID
 * @throws Error if user is not authenticated
 */
export const requireAuth = async (ctx: any): Promise<string> => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");
  return identity.subject;
};

/**
 * Helper function to verify conversion ownership
 * @param ctx - Convex context object
 * @param conversionId - The ID of the conversion to verify ownership for
 * @returns Promise<Doc<"conversions">> - The conversion document if user owns it
 * @throws Error if user is not authenticated or doesn't own the conversion
 */
export const requireConversionOwnership = async (ctx: any, conversionId: any): Promise<{ userId: string }> => {
  const userId = await requireAuth(ctx);
  const conversion = await ctx.db.get(conversionId);
  if (!conversion || conversion.userId !== userId) {
    throw new Error("Access denied");
  }
  return { userId };
};
