import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600&family=Hanken+Grotesk:wght@400;500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/activities" className="group inline-flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">
            Colette
          </span>
          <span className="size-1.5 translate-y-[-2px] rounded-full bg-clay transition-transform group-hover:scale-150" />
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted">
            Club
          </span>
        </Link>
        <Link
          to="/"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-clay-soft hover:text-clay-ink"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mx-auto mt-16 w-full max-w-5xl px-6 py-10">
      <p className="border-t border-line/70 pt-6 text-xs text-muted">
        Colette Club — a small place for people to gather around the things they love.
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Something went sideways";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Not found" : "Error";
    details =
      error.status === 404
        ? "We couldn't find what you were looking for."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto grid min-h-dvh max-w-2xl place-items-center px-6">
      <div className="w-full text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-clay">Colette Club</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">{message}</h1>
        <p className="mt-3 text-muted">{details}</p>
        <Link
          to="/activities"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-clay-strong"
        >
          Back to activities
        </Link>
        {stack && (
          <pre className="mt-8 overflow-x-auto rounded-card border border-line bg-surface p-4 text-left text-xs text-muted">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
