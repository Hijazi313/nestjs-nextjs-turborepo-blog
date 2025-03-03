import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export type SessionUser = {
  id?: string;
  name?: string;
  avatar?: string;
};
export type Session = {
  user: SessionUser;
  accessToken: string;
};
const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

export const createSession = async (payload: Session) => {
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(encodedKey);

  const expiredAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
};

export const getSession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;
  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (err) {
    console.error("Failed to verify session", err);
    redirect("/auth/signin");
  }
};

export const deleteSession = async () => {
  (await cookies()).delete("session");
};
