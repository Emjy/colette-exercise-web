import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { expect, test } from "vitest";
import { SignInNotice } from "./SignInNotice";

test("renders a guest notice that links to the sign-in page", () => {
  const Stub = createRoutesStub([{ path: "/", Component: () => <SignInNotice /> }]);
  render(<Stub initialEntries={["/"]} />);

  expect(screen.getByText(/browsing as a guest/i)).toBeTruthy();

  const link = screen.getByRole("link", { name: /sign in/i });
  expect(link.getAttribute("href")).toBe("/");
});
