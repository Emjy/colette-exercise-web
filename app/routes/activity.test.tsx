import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { expect, test } from "vitest";
import Activity from "./activity";

const activity = {
  id: "a1",
  title: "Open Pottery",
  slug: "open-pottery",
  description: "Throw a bowl on the wheel.",
  startsAt: "2099-06-11T09:00:00Z",
  maxAttendees: 10,
  attendanceCount: 2,
  viewerIsRegistered: true,
  creator: { id: "u0", name: "Olivia" },
  participants: [
    { id: "u1", name: "Alice" },
    { id: "u2", name: "Bob" },
  ],
};

function renderDetail() {
  const Stub = createRoutesStub([
    {
      path: "/activities/:slug",
      Component: Activity,
      loader: () => ({ activity, signedIn: true }),
      action: () => ({ ok: true, intent: "unregister" }),
    },
  ]);

  render(<Stub initialEntries={["/activities/open-pottery"]} />);
}

test("shows the description and the list of registered participants", async () => {
  renderDetail();

  expect(await screen.findByRole("heading", { name: "Open Pottery", level: 1 })).toBeTruthy();
  expect(screen.getByText("Throw a bowl on the wheel.")).toBeTruthy();
  expect(screen.getByText("Alice")).toBeTruthy();
  expect(screen.getByText("Bob")).toBeTruthy();
});

test("flips the CTA to Deregister and shows the badge when the viewer is registered", async () => {
  renderDetail();

  expect(await screen.findByRole("button", { name: "Deregister" })).toBeTruthy();
  expect(screen.getByText(/You.?re registered/i)).toBeTruthy();
});
