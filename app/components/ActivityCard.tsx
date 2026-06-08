import type { ReactNode } from "react";
import { SeatMeter } from "./SeatMeter";

type ActivityCardProps = {
  title: string;
  startsAt: string;
  attendanceCount: number;
  maxAttendees: number;
  creatorName: string;
  registered?: boolean;
  footer?: ReactNode;
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-3.5">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 .04 1.4l-7.5 8a1 1 0 0 1-1.45.02l-4-4a1 1 0 1 1 1.42-1.42l3.27 3.27 6.82-7.27a1 1 0 0 1 1.4-.04Z"
      />
    </svg>
  );
}

export function ActivityCard({
  title,
  startsAt,
  attendanceCount,
  maxAttendees,
  creatorName,
  registered = false,
  footer,
}: ActivityCardProps) {
  const startDate = new Date(startsAt);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-surface p-6 shadow-card ring-1 ring-line transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-ink">
          <time dateTime={startsAt}>{startDate.toLocaleString(undefined, DATE_FORMAT)}</time>
        </p>
        {registered ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success ring-1 ring-success/20">
            <CheckIcon />
            You&rsquo;re registered
          </span>
        ) : null}
      </div>

      <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink">{title}</h2>
      <p className="mt-1 text-sm text-muted">Hosted by {creatorName}</p>

      <div className="mt-5">
        <SeatMeter attendanceCount={attendanceCount} maxAttendees={maxAttendees} />
      </div>

      {footer ? <div className="mt-auto pt-6">{footer}</div> : null}
    </article>
  );
}
