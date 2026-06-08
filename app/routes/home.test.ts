import { beforeEach, expect, test, vi } from "vitest";

const { getToken, commitToken, destroyToken } = vi.hoisted(() => ({
  getToken: vi.fn(),
  commitToken: vi.fn(),
  destroyToken: vi.fn(),
}));

vi.mock("~/sessions.server", () => ({ getToken, commitToken, destroyToken }));

import { action } from "./home";

function post(fields: Record<string, string>) {
  return new Request("http://test/", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(fields).toString(),
  });
}

function call(request: Request) {
  return action({ request } as unknown as Parameters<typeof action>[0]);
}

beforeEach(() => {
  vi.clearAllMocks();
});

test("'browse as a guest' destroys the session and redirects to activities", async () => {
  destroyToken.mockResolvedValue("exercise_session=; Max-Age=0");

  const res = (await call(post({ intent: "guest" }))) as Response;

  expect(destroyToken).toHaveBeenCalled();
  expect(commitToken).not.toHaveBeenCalled();
  expect(res.status).toBe(302);
  expect(res.headers.get("Location")).toBe("/activities");
  expect(res.headers.get("Set-Cookie")).toContain("Max-Age=0");
});

test("a token commits the session and redirects to activities", async () => {
  commitToken.mockResolvedValue("exercise_session=abc");

  const res = (await call(post({ token: "user-1" }))) as Response;

  expect(commitToken).toHaveBeenCalledWith(expect.any(Request), "user-1");
  expect(res.status).toBe(302);
  expect(res.headers.get("Location")).toBe("/activities");
});

test("an empty token returns an error and does not touch the session", async () => {
  const res = await call(post({ token: "   " }));

  expect(res).toEqual({ error: "Enter a seeded user id." });
  expect(commitToken).not.toHaveBeenCalled();
});
