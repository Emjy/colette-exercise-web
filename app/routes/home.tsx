import { Form, redirect } from "react-router";
import { Button } from "~/components/Button";
import { commitToken, destroyToken, getToken } from "~/sessions.server";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [{ title: "Colette Club" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  return { token: await getToken(request) };
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();

  // "Browse as a guest" — wipe the session entirely, then go to the list.
  if (form.get("intent") === "guest") {
    return redirect("/activities", {
      headers: { "Set-Cookie": await destroyToken(request) },
    });
  }

  const token = String(form.get("token") ?? "").trim();

  if (token === "") {
    return { error: "Enter a seeded user id." };
  }

  return redirect("/activities", {
    headers: { "Set-Cookie": await commitToken(request, token) },
  });
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 sm:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">Welcome</p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
        Step inside the club
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        Colette is a small place to gather around the things you love. Sign in with a seeded user id
        &mdash; your bearer token for this exercise &mdash; and start registering for activities.
      </p>

      <Form method="post" className="mt-8">
        <label htmlFor="token" className="block text-sm font-medium text-ink">
          User id
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="token"
            name="token"
            defaultValue={loaderData.token ?? ""}
            placeholder="paste a seeded user id"
            autoComplete="off"
            className="flex-1 rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-ink shadow-sm transition-colors placeholder:text-muted/70 hover:border-clay/40"
          />
          <Button type="submit" className="shrink-0">
            Enter the club
          </Button>
        </div>
      </Form>

      {actionData?.error ? (
        <p className="mt-3 text-sm text-danger" role="alert">
          {actionData.error}
        </p>
      ) : null}

      <Form method="post" className="mt-8">
        <input type="hidden" name="intent" value="guest" />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-ink underline-offset-4 hover:underline"
        >
          Or browse as a guest &rarr;
        </button>
      </Form>
    </div>
  );
}
