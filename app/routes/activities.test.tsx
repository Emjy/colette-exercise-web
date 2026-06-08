import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { expect, test } from "vitest";
import Activities from "./activities";

const activity = {
  id: "a1",
  title: "Open Pottery",
  slug: "open-pottery",
  startsAt: "2099-06-11T09:00:00Z",
  maxAttendees: 10,
  attendanceCount: 2,
  viewerIsRegistered: false,
  creator: { id: "u0", name: "Olivia" },
};

function renderList(data: { activities: unknown[]; signedIn: boolean }) {
  const Stub = createRoutesStub([
    {
      path: "/activities",
      Component: Activities,
      loader: () => data,
      action: () => ({ ok: true, intent: "register" }),
    },
  ]);

  render(<Stub initialEntries={["/activities"]} />);
}

test("renders a card with a Register CTA for each activity", async () => {
  renderList({ activities: [activity], signedIn: true });

  expect(await screen.findByRole("heading", { name: "Open Pottery" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "Register" })).toBeTruthy();
});

test("shows the guest notice and an empty state when signed out with no activities", async () => {
  renderList({ activities: [], signedIn: false });

  expect(await screen.findByText(/browsing as a guest/i)).toBeTruthy();
  expect(screen.getByText(/No activities are open/i)).toBeTruthy();
});
