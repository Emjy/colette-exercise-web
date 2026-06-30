import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { expect, test } from "vitest";
import { RegistrationButton } from "./RegistrationButton";

function renderButton(props: {
  isRegistered: boolean;
  viewerIsOnWaitingList?: boolean;
  full?: boolean;
}) {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => <RegistrationButton activityId="a1" {...props} />,
      action: () => ({
        ok: true,
        intent: props.isRegistered
          ? "unregister"
          : props.full && !props.viewerIsOnWaitingList
            ? "join-waiting-list"
            : "register",
      }),
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

test("shows 'Join waiting list' and keeps the button active when the activity is full", () => {
  renderButton({ isRegistered: false, viewerIsOnWaitingList: false, full: true });

  const button = screen.getByRole("button");
  expect(button.textContent).toBe("Join waiting list");
  expect(button.hasAttribute("disabled")).toBe(false);
});

test("shows a status message with no button when the viewer is already on the waiting list", () => {
  renderButton({ isRegistered: false, viewerIsOnWaitingList: true, full: true });

  expect(screen.queryByRole("button")).toBeNull();
  expect(screen.getByRole("status").textContent).toContain("waiting list");
});

test("still lets a registered member deregister from a full activity", () => {
  renderButton({ isRegistered: true, full: true });

  const button = screen.getByRole("button");
  expect(button.textContent).toBe("Deregister");
  expect(button.hasAttribute("disabled")).toBe(false);
});
