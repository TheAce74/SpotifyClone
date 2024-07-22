import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import MobileHeaderMenu from "@/components/ui/MobileHeaderMenu";
import { ReactNode } from "react";
import userEvent from "@testing-library/user-event";

const eventSetup = (component: ReactNode) => {
  return { user: userEvent.setup(), ...render(component) };
};

afterEach(() => {
  cleanup();
});

describe("Open menu button", () => {
  it("should be mounted", () => {
    render(<MobileHeaderMenu />);
    const openButton = screen.getByLabelText("open menu");

    expect(openButton).toBeDefined();
  });

  it("should open the menu", async () => {
    const { user } = eventSetup(<MobileHeaderMenu />);
    const openButton = screen.getByLabelText("open menu");
    const nav = screen.getByRole("navigation");

    await user.click(openButton);
    expect(openButton.ariaExpanded).toBe("true");
    expect(nav.classList).toContain("translate-x-0");
  });
});

describe("Close menu button", () => {
  it("should be visually hidden on mount, but still be in the DOM", () => {
    render(<MobileHeaderMenu />);
    const nav = screen.getByRole("navigation");
    const closeButton = screen.getByLabelText("close menu");

    expect(nav.classList).toContain("opacity-0");
    expect(closeButton).toBeDefined();
  });

  it("should close the menu", async () => {
    const { user } = eventSetup(<MobileHeaderMenu />);
    const openButton = screen.getByLabelText("open menu");
    const nav = screen.getByRole("navigation");
    const closeButton = screen.getByLabelText("close menu");

    await user.click(openButton);
    await user.click(closeButton);
    expect(openButton.ariaExpanded).toBe("false");
    expect(nav.classList).toContain("translate-x-full");
  });
});
