import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Button } from "./Button";

test("renders its children and defaults to type=submit", () => {
  render(<Button>Save</Button>);

  const button = screen.getByRole("button", { name: "Save" });
  expect(button.getAttribute("type")).toBe("submit");
});

test("applies the secondary variant styles", () => {
  render(<Button variant="secondary">Deregister</Button>);

  expect(screen.getByRole("button").className).toContain("bg-surface");
});
