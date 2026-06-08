import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { expect, test } from "vitest";
import { RegistrationButton } from "./RegistrationButton";

function renderButton(props: { isRegistered: boolean; full?: boolean }) {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => <RegistrationButton activityId="a1" {...props} />,
      action: () => ({ ok: true, intent: props.isRegistered ? "unregister" : "register" }),
    },
  ]);

  render(<Stub initialEntries={["/"]} />);
}

test("shows 'Register' when the viewer is not registered", () => {
  renderButton({ isRegistered: false });
  expect(screen.getByRole("button").textContent).toBe("Register");
});

test("shows 'Deregister' when the viewer is registered", () => {
  renderButton({ isRegistered: true });
  expect(screen.getByRole("button").textContent).toBe("Deregister");
});

test("disables Register and explains why when the activity is full", () => {
  renderButton({ isRegistered: false, full: true });

  const button = screen.getByRole("button");
  expect(button.textContent).toBe("Register");
  expect(button.hasAttribute("disabled")).toBe(true);
  expect(screen.getByText(/full/i)).toBeTruthy();
});

test("still lets a registered member deregister from a full activity", () => {
  renderButton({ isRegistered: true, full: true });

  const button = screen.getByRole("button");
  expect(button.textContent).toBe("Deregister");
  expect(button.hasAttribute("disabled")).toBe(false);
});
