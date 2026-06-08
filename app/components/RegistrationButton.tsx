import { useFetcher } from "react-router";
import { Button } from "./Button";

type ActionResult = { ok: true; intent: "register" | "unregister" } | { error: string };

type RegistrationButtonProps = {
  activityId: string;
  isRegistered: boolean;
  full?: boolean;
};

/**
 * The register / deregister call-to-action. The label and the mutation it posts
 * both follow `isRegistered`; after the action runs, the route loader revalidates
 * and `isRegistered` flips — so the button and the card badge update on their own.
 *
 * A full activity blocks new registrations (with a hint), but a member who is
 * already in can always leave.
 */
export function RegistrationButton({
  activityId,
  isRegistered,
  full = false,
}: RegistrationButtonProps) {
  const fetcher = useFetcher<ActionResult>();
  const intent = isRegistered ? "unregister" : "register";
  const submitting = fetcher.state !== "idle";
  const error = fetcher.data && "error" in fetcher.data ? fetcher.data.error : null;

  const blockedByCapacity = full && !isRegistered;
  const hintId = `registration-hint-${activityId}`;

  const label = submitting
    ? isRegistered
      ? "Deregistering…"
      : "Registering…"
    : isRegistered
      ? "Deregister"
      : "Register";

  return (
    <div>
      <fetcher.Form method="post">
        <input type="hidden" name="activityId" value={activityId} />
        <input type="hidden" name="intent" value={intent} />
        <Button
          variant={isRegistered ? "secondary" : "primary"}
          disabled={submitting || blockedByCapacity}
          aria-busy={submitting}
          aria-describedby={blockedByCapacity ? hintId : undefined}
        >
          {label}
        </Button>
      </fetcher.Form>
      {blockedByCapacity ? (
        <p id={hintId} className="mt-2 text-sm text-muted">
          This activity is full — there are no spots left to register.
        </p>
      ) : null}
      {error ? (
        <p className="mt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
