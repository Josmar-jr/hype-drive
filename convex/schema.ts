import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  files: defineTable({
    name: v.string(),
    organizationId: v.string(),
    fileId: v.id("_storage"),
  }).index("by_organization_id", ["organizationId"]),
  users: defineTable({
    tokenIdentifier: v.string(),
    organizationIds: v.array(v.string()),
  }).index("by_token_identifier", ["tokenIdentifier"]),
});
