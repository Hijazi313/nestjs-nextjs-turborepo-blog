import { NextResponse } from "next/server";
import { API_URL } from "../../../../../constants/api";
import { createSession } from "../../../../../lib/session";
import { redirect } from "next/navigation";

export async function GET(req: NextResponse) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("accessToken");
  const userId = searchParams.get("userId");
  const userName = searchParams.get("name");
  const avatar = searchParams.get("avatar");

  console.log({
    accessToken,
    userId,
    userName,
    avatar,
  });
  if (!accessToken || !userId || !userName || !avatar)
    throw new Error("Google auth failed");
  const res = await fetch(`${API_URL}/auth/verify-token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 401) {
    throw new Error("Jwt verification failed");
  }

  await createSession({
    user: {
      id: userId,
      name: userName,
      avatar: avatar ?? undefined,
    },
    accessToken,
  });

  redirect("/");
}
