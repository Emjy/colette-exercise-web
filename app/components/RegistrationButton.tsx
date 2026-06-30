import { useFetcher } from "react-router";
import { Button } from "./Button";

type ActionResult =
  | { ok: true; intent: "register" | "unregister" | "join-waiting-list" }
  | { error: string };

type RegistrationButtonProps = {
  activityId: string;
  isRegistered: boolean;
  viewerIsOnWaitingList?: boolean;
  full?: boolean;
};

/**
 * The register / deregister / join-waiting-list call-to-action.
 *
 * Priority order:
 * 1. Already registered → "Deregister" (secondary)
 * 2. On waiting list + activity full → status text, no action
 * 3. Activity full, not on waiting list → "Join waiting list" (primary)
 * 4. Spots available → "Register" (primary)
 *
 * After any successful action the route loader revalidates, so all derived
 * fields (viewerIsRegistered, viewerIsOnWaitingList, remainingSpots) refresh.
 */
export function RegistrationButton({
  activityId,
  isRegistered,
  viewerIsOnWaitingList = false,
  full = false,
}: RegistrationButtonProps) {
  const fetcher = useFetcher<ActionResult>();
  const submitting = fetcher.state !== "idle";
  const error = fetcher.data && "error" in fetcher.data ? fetcher.data.error : null;

  // When on waiting list and the activity is still full, there is nothing to
  // do — the member will be notified when a seat frees up.
  if (viewerIsOnWaitingList && !isRegistered && full) {
    return (
      <p className="text-sm text-muted" role="status">
        You&rsquo;re on the waiting list for this activity.
      </p>
    );
  }

  const canJoinWaitingList = full && !isRegistered && !viewerIsOnWaitingList;
  const intent = isRegistered
    ? "unregister"
    : canJoinWaitingList
      ? "join-waiting-list"
      : "register";

  const label = submitting
    ? isRegistered
      ? "Deregistering…"
      : canJoinWaitingList
        ? "Joining waiting list…"
        : "Registering…"
    : isRegistered
      ? "Deregister"
      : canJoinWaitingList
        ? "Join waiting list"
        : "Register";

  return (
    <div>
      <fetcher.Form method="post">
        <input type="hidden" name="activityId" value={activityId} />
        <input type="hidden" name="intent" value={intent} />
        <Button
          variant={isRegistered ? "secondary" : "primary"}
          disabled={submitting}
          aria-busy={submitting}
        >
          {label}
        </Button>
      </fetcher.Form>
      {error ? (
        <p className="mt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
