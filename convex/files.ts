import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: {
    name: v.string(),
    organizationId: v.string(),
  },
  async handler(ctx, args) {
    const identity = ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("You must be logged in to upload a file ⚠️");
    }

    await ctx.db.insert("files", {
      name: args.name,
      organizationId: args.organizationId,
    });
  },
});

export const getFiles = query({
  args: {
    organizationId: v.string(),
  },
  async handler(ctx, args) {
    const identity = ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    return ctx.db
      .query("files")
      .withIndex("by_organization_id", (q) =>
        q.eq("organizationId", args.organizationId),
      )
      .collect();
  },
});
