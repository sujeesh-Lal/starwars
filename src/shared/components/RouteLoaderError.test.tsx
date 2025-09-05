import { render, screen } from "@testing-library/react";
import RouteLoaderError from "@shared/components/RouteLoaderError";

// Mock react-router-dom hooks
const mockedUseRouteError = jest.fn();
const mockedIsRouteErrorResponse = jest.fn();

jest.mock("react-router-dom", () => ({
  useRouteError: () => mockedUseRouteError(),
  isRouteErrorResponse: (error: any) => mockedIsRouteErrorResponse(error),
}));

describe("RouteLoaderError component", () => {
  beforeEach(() => {
    mockedUseRouteError.mockReset();
    mockedIsRouteErrorResponse.mockReset();
  });

  it("renders route error response correctly", () => {
    // Mock a route error response
    const error = { status: 404, statusText: "Not Found", data: "Page not found" };
    mockedUseRouteError.mockReturnValue(error);
    mockedIsRouteErrorResponse.mockReturnValue(true);

    render(<RouteLoaderError />);

    expect(screen.getByTestId("rle-error-status")).toHaveTextContent("Error 404 - Page not found");
    expect(screen.getByTestId("rle-status-test")).toHaveTextContent("Not Found");
  });

  it("renders unexpected error correctly", () => {
    const error = new Error("Something went wrong");
    mockedUseRouteError.mockReturnValue(error);
    mockedIsRouteErrorResponse.mockReturnValue(false);

    render(<RouteLoaderError />);

    expect(screen.getByTestId("rle-unexpected-error")).toHaveTextContent("Unexpected Error");
    expect(screen.getByTestId("rle-p-error")).toHaveTextContent("Something went wrong");
  });
});
