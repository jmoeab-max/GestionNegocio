import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET must be set");
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });

export { getSession, commitSession, destroySession };
