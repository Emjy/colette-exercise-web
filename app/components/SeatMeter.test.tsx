import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SeatMeter } from "./SeatMeter";

test("shows remaining spots and the seat count when not full", () => {
  render(<SeatMeter attendanceCount={3} maxAttendees={10} />);

  expect(screen.getByText("7 spots left")).toBeTruthy();
  expect(screen.getByText("3/10 seats")).toBeTruthy();
});

test("uses the singular 'spot' when one seat remains", () => {
  render(<SeatMeter attendanceCount={9} maxAttendees={10} />);

  expect(screen.getByText("1 spot left")).toBeTruthy();
});

test("shows 'Fully booked' and a maxed-out progressbar when full", () => {
  render(<SeatMeter attendanceCount={5} maxAttendees={5} />);

  expect(screen.getByText("Fully booked")).toBeTruthy();

  const bar = screen.getByRole("progressbar");
  expect(bar.getAttribute("aria-valuenow")).toBe("5");
  expect(bar.getAttribute("aria-valuemax")).toBe("5");
});
