import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ActivityCard } from "./ActivityCard";

const baseProps = {
  title: "Open Pottery",
  startsAt: "2026-06-11T09:00:00Z",
  attendanceCount: 3,
  maxAttendees: 10,
  creatorName: "Olivia",
};

test("ActivityCard shows the title, host and seat count", () => {
  render(<ActivityCard {...baseProps} />);

  expect(screen.getByText("Open Pottery")).toBeTruthy();
  expect(screen.getByText(/3\/10 seats/)).toBeTruthy();
  expect(screen.getByText(/Olivia/)).toBeTruthy();
});

test("shows the start time including the hour and minutes", () => {
  render(<ActivityCard {...baseProps} />);

  // Locale/timezone vary, but an "HH:MM" time must be present (not just the date).
  expect(screen.getByText(/\d{1,2}:\d{2}/)).toBeTruthy();
});

test("shows the 'registered' badge when the viewer is registered", () => {
  render(<ActivityCard {...baseProps} registered />);

  expect(screen.getByText(/You.?re registered/i)).toBeTruthy();
});

test("omits the 'registered' badge when the viewer is not registered", () => {
  render(<ActivityCard {...baseProps} />);

  expect(screen.queryByText(/registered/i)).toBeNull();
});
