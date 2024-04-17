import { NextRequest, NextResponse } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

// If you use `request` you don't need the type
export async function POST(req: NextRequest) {
  // Get the user ID from the session
  const { userId } = getAuth(req);

  if (!userId) return NextResponse.redirect(new URL("auth/sign-in", req.url));

  const requestData = (await req.json()) as {
    firstName: string;
    lastName: string;
  };

  if (!userId) return NextResponse.redirect("/sign-in");

  const updatedUser = await clerkClient.users.updateUser(userId, requestData);

  return NextResponse.json({ updatedUser });
}