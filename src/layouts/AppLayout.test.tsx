import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppLayout from "./AppLayout";

// Mock Header and Footer components for testing
jest.mock("@layouts/Header", () => () => <div data-testid="header">Header</div>);
jest.mock("@layouts/Footer", () => () => <div data-testid="footer">Footer</div>);

describe("AppLayout", () => {
  it("renders Header, Footer, and Outlet", () => {
    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>,
    );

    // Check Header
    expect(screen.getByTestId("header")).toBeInTheDocument();

    // Check Footer
    expect(screen.getByTestId("footer")).toBeInTheDocument();

    // Check Outlet container (since Outlet renders nested routes, it may be empty in this test)
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
