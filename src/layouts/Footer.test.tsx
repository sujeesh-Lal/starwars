import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  it("renders footer with correct text", () => {
    render(<Footer />);

    // Check that the paragraph exists
    const paragraph = screen.getByTestId("footer-p");
    expect(paragraph).toBeInTheDocument();

    // Check the content
    expect(paragraph).toHaveTextContent("Footer © 2025");
  });

  it("renders footer element", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo"); // <footer> has implicit role 'contentinfo'
    expect(footer).toBeInTheDocument();
  });
});
