import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders hello text", () => {
  render(<App />);
  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});
