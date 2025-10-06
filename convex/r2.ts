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
