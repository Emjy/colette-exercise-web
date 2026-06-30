import { Link } from "react-router";
import { ParticipantList } from "~/components/ParticipantList";
import { RegistrationButton } from "~/components/RegistrationButton";
import { SeatMeter } from "~/components/SeatMeter";
import { apiSdk } from "~/graphql/client.server";
import { registrationAction } from "~/lib/registration.server";
import { getToken } from "~/sessions.server";
import type { Route } from "./+types/activity";

export function meta({ loaderData }: Route.MetaArgs) {
  const title = loaderData?.activity?.title;
  return [{ title: title ? `${title} · Colette Club` : "Activity · Colette Club" }];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const token = await getToken(request);
  const { activity } = await apiSdk(token).Activity({ slug: params.slug });

  if (!activity) {
    throw new Response("Activity not found", { status: 404 });
  }

  return { activity, signedIn: Boolean(token) };
}

export async function action({ request }: Route.ActionArgs) {
  return registrationAction(request);
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

export default function Activity({ loaderData }: Route.ComponentProps) {
  const { activity, signedIn } = loaderData;
  const startDate = new Date(activity.startsAt);

  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <Link
        to="/activities"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-clay-ink"
      >
        <span aria-hidden="true">&larr;</span> All activities
      </Link>

      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">
            <time dateTime={activity.startsAt}>
              {startDate.toLocaleString("fr-FR", DATE_FORMAT)}
            </time>
          </p>
          {activity.viewerIsRegistered ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success ring-1 ring-success/20">
              &#10003; You&rsquo;re registered
            </span>
          ) : activity.viewerIsOnWaitingList ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-clay-soft px-2.5 py-1 text-xs font-semibold text-clay-ink ring-1 ring-clay/20">
              On the waiting list
            </span>
          ) : null}
        </div>

        <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {activity.title}
        </h1>
        <p className="mt-4 text-lg text-muted">
          Hosted by{" "}
          <span className="font-medium text-ink">{activity.creator?.name ?? "Unknown"}</span>
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
            About this activity
          </h2>
          {activity.description ? (
            <p className="mt-4 text-lg leading-relaxed text-ink">{activity.description}</p>
          ) : (
            <p className="mt-4 text-lg leading-relaxed text-muted">
              The host hasn&rsquo;t added a description yet.
            </p>
          )}

          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              Who&rsquo;s coming <span className="text-clay">({activity.participants.length})</span>
            </h2>
            <ParticipantList participants={activity.participants} />
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card bg-surface p-6 shadow-card ring-1 ring-line">
            <SeatMeter
              attendanceCount={activity.attendanceCount}
              maxAttendees={activity.maxAttendees}
            />
            <div className="mt-5">
              <RegistrationButton
                activityId={activity.id}
                isRegistered={activity.viewerIsRegistered}
                viewerIsOnWaitingList={activity.viewerIsOnWaitingList}
                full={activity.attendanceCount >= activity.maxAttendees}
              />
            </div>
            {signedIn ? null : (
              <p className="mt-4 text-xs leading-relaxed text-muted">
                <Link to="/" className="font-semibold text-clay-ink underline underline-offset-4">
                  Sign in
                </Link>{" "}
                to hold a spot.
              </p>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}
