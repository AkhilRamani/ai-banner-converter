// convex/r2.ts
import { R2 } from "@convex-dev/r2";
import { components } from "./_generated/api";
import { mutation } from "./_generated/server";
import { requireAuth } from "./auth";
import { v } from "convex/values";

export const r2 = new R2(components.r2);

export const generateUploadUrl = mutation({
  args: {
    fileName: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);

    const conversion = await ctx.db.insert("conversions", {
      userId: userId,
      fileName: args.fileName,
      fileSize: 0, // Will be updated when file is uploaded
      isUploadPending: true,
      updatedAt: Date.now(),
    });

    // Create key with pattern: userId/uploads/conversionId
    const key = `${userId}/uploads/${conversion}`;
    const uploadData = await r2.generateUploadUrl(key);

    // Return both upload data and conversion ID for client use
    return {
      ...uploadData,
      conversionId: conversion,
    };
  },
});

export const generateGenerationUploadUrl = mutation({
  args: {
    conversionResultId: v.id("conversionResults"),
    fileName: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);

    // Verify the conversion result belongs to the user
    const conversionResult = await ctx.db.get(args.conversionResultId);
    if (!conversionResult) {
      throw new Error("Conversion result not found");
    }

    const conversion = await ctx.db.get(conversionResult.conversionId);
    if (!conversion || conversion.userId !== userId) {
      throw new Error("Access denied");
    }

    // Create key with pattern: userId/generations/conversionResultId
    const key = `${userId}/generations/${args.conversionResultId}`;
    const uploadData = await r2.generateUploadUrl(key);

    return {
      ...uploadData,
      key,
    };
  },
});

export const getUrl = mutation({
  args: {
    key: v.string(),
    expiresIn: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);

    // Extract userId from the key to verify ownership
    const keyParts = args.key.split("/");
    if (keyParts.length < 2) {
      throw new Error("Invalid key format");
    }

    const keyUserId = keyParts[0];
    if (keyUserId !== userId) {
      throw new Error("Access denied");
    }

    return await r2.getUrl(args.key, { expiresIn: args.expiresIn });
  },
});

export const getSignedUrl = mutation({
  args: {
    key: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);

    // Generate signed URL for accessing the file
    const signedUrl = await r2.getUrl(args.key, { expiresIn: 3600 });

    return {
      signedUrl: signedUrl,
    };
  },
});

export const { syncMetadata } = r2.clientApi({
  checkUpload: async (ctx, bucket) => {
    // Validate that the user can upload to this bucket
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error("User not authenticated");
    }
  },
  onUpload: async (ctx, bucket, key) => {
    // Extract userId from the key pattern: userId/uploads/conversionId
    const keyParts = key.split("/");
    if (keyParts.length < 3 || keyParts[1] !== "uploads") {
      throw new Error(`Invalid key format: ${key}. Expected pattern: userId/uploads/conversionId`);
    }

    const userId = keyParts[0];
    const conversionId = keyParts[2];

    await ctx.db.patch(conversionId as any, {
      isUploadPending: false,
      updatedAt: Date.now(),
    });
  },
});
