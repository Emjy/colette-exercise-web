import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ParticipantList } from "./ParticipantList";

test("lists each registered participant by name", () => {
  render(
    <ParticipantList
      participants={[
        { id: "1", name: "Alice Smith" },
        { id: "2", name: "Bob" },
      ]}
    />,
  );

  expect(screen.getByText("Alice Smith")).toBeTruthy();
  expect(screen.getByText("Bob")).toBeTruthy();
});

test("shows an empty-state message when no one has registered", () => {
  render(<ParticipantList participants={[]} />);

  expect(screen.getByText(/No one has registered yet/i)).toBeTruthy();
});
