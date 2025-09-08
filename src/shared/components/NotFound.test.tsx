import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // provides router context for useNavigate
import NotFound from "@shared/components/NotFound";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("NotFound component", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it("renders 404 text and Go Home button", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("nf-404")).toHaveTextContent("404");
    expect(screen.getByTestId("nf-page-not-foud")).toHaveTextContent("Page Not Found");
    expect(screen.getByRole("button", { name: /Go Home/i })).toBeInTheDocument();
  });

  it("navigates to home when Go Home button is clicked", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", { name: /Go Home/i });
    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });
});
