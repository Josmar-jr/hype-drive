import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError("You must be logged in to upload a file");
  }

  return await ctx.storage.generateUploadUrl();
});

export async function hasAccessToOrganization(
  ctx: QueryCtx | MutationCtx,
  organizationId: string,
) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_token_identifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier),
    )
    .first();

  if (!user) {
    return null;
  }

  const hasAccess =
    user.organizationIds.includes(organizationId) ||
    user.tokenIdentifier.includes(organizationId);

  if (!hasAccess) {
    return null;
  }

  return { user };
}

export const createFile = mutation({
  args: {
    name: v.string(),
    organizationId: v.string(),
    fileId: v.id("_storage"),
  },
  async handler(ctx, args) {
    const hasAccess = await hasAccessToOrganization(ctx, args.organizationId);

    if (!hasAccess) {
      throw new ConvexError("you do not have access to this org");
    }

    await ctx.db.insert("files", {
      name: args.name,
      organizationId: args.organizationId,
      fileId: args.fileId,
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
