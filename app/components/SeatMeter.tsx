type SeatMeterProps = {
  attendanceCount: number;
  maxAttendees: number;
};

/** Accessible seat-availability bar shared by the activity card and detail page. */
export function SeatMeter({ attendanceCount, maxAttendees }: SeatMeterProps) {
  const remaining = Math.max(maxAttendees - attendanceCount, 0);
  const full = remaining === 0;
  const fillPct =
    maxAttendees > 0 ? Math.min(Math.round((attendanceCount / maxAttendees) * 100), 100) : 0;

  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-ink">
          {full ? "Fully booked" : `${remaining} ${remaining === 1 ? "spot" : "spots"} left`}
        </span>
        <span className="text-muted">
          {attendanceCount}/{maxAttendees} seats
        </span>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={attendanceCount}
        aria-valuemin={0}
        aria-valuemax={maxAttendees}
        aria-label={`${attendanceCount} of ${maxAttendees} seats taken`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${full ? "bg-clay-strong" : "bg-clay"}`}
          style={{ width: `${fillPct}%` }}
        />
      </div>
    </div>
  );
}
