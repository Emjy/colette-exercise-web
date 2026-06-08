import { Link } from "react-router";

/** Shown to guests: registering needs a signed-in viewer. */
export function SignInNotice() {
  return (
    <div className="mt-6 rounded-card border border-warning/25 bg-warning-soft px-4 py-3 text-sm text-warning">
      You&rsquo;re browsing as a guest.{" "}
      <Link to="/" className="font-semibold underline underline-offset-4 hover:text-clay-ink">
        Sign in
      </Link>{" "}
      to register for an activity.
    </div>
  );
}
