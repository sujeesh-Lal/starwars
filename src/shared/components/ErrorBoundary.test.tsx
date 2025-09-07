import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  it("renders children when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Normal Child</div>
      </ErrorBoundary>,
    );

    expect(screen.getByTestId("child")).toHaveTextContent("Normal Child");
  });

  it("renders fallback UI when child throws an error", () => {
    const ProblemChild = () => {
      throw new Error("Test error!");
    };

    render(
      <ErrorBoundary fallback={<div data-testid="fallback">Fallback UI</div>}>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(screen.getByTestId("fallback")).toHaveTextContent("Fallback UI");
  });

  it("renders default fallback UI when no fallback prop is provided", () => {
    const ProblemChild = () => {
      throw new Error("Another error!");
    };

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(screen.getByTestId("error-main-h2").textContent).toBe("Something went wrong");
    expect(screen.getByText(/another error/i)).toBeInTheDocument();
  });
});
