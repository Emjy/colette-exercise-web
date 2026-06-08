import { createCookieSessionStorage } from "react-router";

const storage = createCookieSessionStorage({
  cookie: {
    name: "exercise_session",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["exercise-dev-secret"],
    secure: false,
  },
});

export async function getToken(request: Request): Promise<string | undefined> {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  return typeof token === "string" ? token : undefined;
}

export async function commitToken(request: Request, token: string): Promise<string> {
  const session = await storage.getSession(request.headers.get("Cookie"));
  session.set("token", token);
  return storage.commitSession(session);
}

/** Clears the whole session — returns a Set-Cookie that expires the cookie. */
export async function destroyToken(request: Request): Promise<string> {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return storage.destroySession(session);
}
