import { apiSdk } from "~/graphql/client.server";
import { getToken } from "~/sessions.server";

export type RegistrationActionResult =
  | { ok: true; intent: "register" | "unregister" }
  | { error: string };

/**
 * Shared route action for the register / deregister CTA. The form sends an
 * `intent`; we call the matching mutation. A successful action triggers the
 * route's loader to revalidate, so `viewerIsRegistered` (and the UI) refresh.
 */
export async function registrationAction(request: Request): Promise<RegistrationActionResult> {
  const token = await getToken(request);

  if (!token) {
    return { error: "Sign in first — set a token on the home page." };
  }

  const form = await request.formData();
  const activityId = String(form.get("activityId"));
  const intent = form.get("intent") === "unregister" ? "unregister" : "register";

  try {
    if (intent === "unregister") {
      await apiSdk(token).UnregisterFromActivity({ activityId });
      return { ok: true, intent: "unregister" };
    }

    await apiSdk(token).RegisterToActivity({ activityId });
    return { ok: true, intent: "register" };
  } catch {
    return {
      error:
        intent === "unregister"
          ? "Could not deregister from this activity."
          : "Could not register (already registered, or the activity is full).",
    };
  }
}
