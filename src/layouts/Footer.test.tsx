import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  it("renders footer with correct text", () => {
    render(<Footer />);

    const paragraph = screen.getByTestId("footer-p");
    expect(paragraph).toBeInTheDocument();

    expect(paragraph).toHaveTextContent("Footer © 2025");
  });

  it("renders footer element", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });
});
