type Participant = { id: string; name: string };

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

/** The registered members for an activity, shown as avatar chips. */
export function ParticipantList({ participants }: { participants: Participant[] }) {
  if (participants.length === 0) {
    return <p className="mt-4 text-sm text-muted">No one has registered yet — be the first.</p>;
  }

  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {participants.map((participant) => (
        <li
          key={participant.id}
          className="inline-flex items-center gap-2 rounded-full bg-clay-soft py-1.5 pl-1.5 pr-3.5 text-sm font-medium text-clay-ink"
        >
          <span
            aria-hidden="true"
            className="grid size-6 place-items-center rounded-full bg-clay text-[0.6rem] font-bold text-white"
          >
            {initials(participant.name)}
          </span>
          {participant.name}
        </li>
      ))}
    </ul>
  );
}
