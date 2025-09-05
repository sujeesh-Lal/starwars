import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header component", () => {
  it("renders Characters and Favorites links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText("Characters")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
  });

  it("prevents default navigation when on / for Characters link", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>,
    );

    const link = screen.getByText("Characters");

    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    link.dispatchEvent(clickEvent);

    expect(clickEvent.defaultPrevented).toBe(true);
  });

  it("does not prevent navigation on other routes", () => {
    render(
      <MemoryRouter initialEntries={["/favorites"]}>
        <Header />
      </MemoryRouter>,
    );

    const charactersLink = screen.getByText("Characters");
    const clickEvent = { preventDefault: jest.fn() } as any;

    fireEvent.click(charactersLink, clickEvent);

    expect(clickEvent.preventDefault).not.toHaveBeenCalled();
  });
});
