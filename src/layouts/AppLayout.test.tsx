import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppLayout from "./AppLayout";

jest.mock("@layouts/Header", () => () => <div data-testid="header">Header</div>);
jest.mock("@layouts/Footer", () => () => <div data-testid="footer">Footer</div>);

describe("AppLayout", () => {
  it("renders Header, Footer, and Outlet", () => {
    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
