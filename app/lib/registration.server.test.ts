import { beforeEach, expect, test, vi } from "vitest";

const { getToken, RegisterToActivity, UnregisterFromActivity } = vi.hoisted(() => ({
  getToken: vi.fn(),
  RegisterToActivity: vi.fn(),
  UnregisterFromActivity: vi.fn(),
}));

vi.mock("~/sessions.server", () => ({ getToken }));
vi.mock("~/graphql/client.server", () => ({
  apiSdk: () => ({ RegisterToActivity, UnregisterFromActivity }),
}));

import { registrationAction } from "./registration.server";

function post(fields: Record<string, string>) {
  return new Request("http://test/activities", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(fields).toString(),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  getToken.mockResolvedValue("user-1");
});

test("calls RegisterToActivity for the register intent", async () => {
  RegisterToActivity.mockResolvedValue({});

  const result = await registrationAction(post({ activityId: "a1", intent: "register" }));

  expect(RegisterToActivity).toHaveBeenCalledWith({ activityId: "a1" });
  expect(UnregisterFromActivity).not.toHaveBeenCalled();
  expect(result).toEqual({ ok: true, intent: "register" });
});

test("calls UnregisterFromActivity for the unregister intent", async () => {
  UnregisterFromActivity.mockResolvedValue({});

  const result = await registrationAction(post({ activityId: "a1", intent: "unregister" }));

  expect(UnregisterFromActivity).toHaveBeenCalledWith({ activityId: "a1" });
  expect(RegisterToActivity).not.toHaveBeenCalled();
  expect(result).toEqual({ ok: true, intent: "unregister" });
});

test("requires a signed-in viewer", async () => {
  getToken.mockResolvedValue(undefined);

  const result = await registrationAction(post({ activityId: "a1", intent: "register" }));

  expect(result).toMatchObject({ error: expect.any(String) });
  expect(RegisterToActivity).not.toHaveBeenCalled();
});

test("returns an error message when the mutation throws", async () => {
  RegisterToActivity.mockRejectedValue(new Error("full"));

  const result = await registrationAction(post({ activityId: "a1", intent: "register" }));

  expect(result).toMatchObject({ error: expect.any(String) });
});
