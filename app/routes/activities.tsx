import { Link } from "react-router";
import { ActivityCard } from "~/components/ActivityCard";
import { RegistrationButton } from "~/components/RegistrationButton";
import { SignInNotice } from "~/components/SignInNotice";
import { apiSdk } from "~/graphql/client.server";
import { registrationAction } from "~/lib/registration.server";
import { getToken } from "~/sessions.server";
import type { Route } from "./+types/activities";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Activities · Colette Club" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getToken(request);
  const { activities } = await apiSdk(token).Activities();

  return { activities, signedIn: Boolean(token) };
}

export async function action({ request }: Route.ActionArgs) {
  return registrationAction(request);
}

export default function Activities({ loaderData }: Route.ComponentProps) {
  const { activities, signedIn } = loaderData;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">
          What&rsquo;s on
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Upcoming activities
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Pull up a chair. Join a pottery wheel, an evening flow, or a morning on the ridge — spots
          are limited, so claim yours.
        </p>
      </header>

      {signedIn ? null : <SignInNotice />}

      {activities.length === 0 ? (
        <p className="mt-10 rounded-card border border-dashed border-line bg-surface/60 px-6 py-16 text-center text-muted">
          No activities are open right now. Check back soon.
        </p>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {activities.map((activity, index) => (
            <li
              key={activity.id}
              className="animate-rise"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <ActivityCard
                title={activity.title}
                startsAt={activity.startsAt}
                attendanceCount={activity.attendanceCount}
                maxAttendees={activity.maxAttendees}
                creatorName={activity.creator?.name ?? "Unknown"}
                registered={activity.viewerIsRegistered}
                footer={
                  <div className="flex items-center justify-between gap-3">
                    <RegistrationButton
                      activityId={activity.id}
                      isRegistered={activity.viewerIsRegistered}
                      viewerIsOnWaitingList={activity.viewerIsOnWaitingList}
                      full={activity.attendanceCount >= activity.maxAttendees}
                    />
                    <Link
                      to={`/activities/${activity.slug}`}
                      className="shrink-0 text-sm font-medium text-clay-ink underline-offset-4 hover:underline"
                    >
                      Details &rarr;
                    </Link>
                  </div>
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
