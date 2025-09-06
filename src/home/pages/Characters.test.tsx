import { render, screen } from "@testing-library/react";
import Characters from "./Characters";

jest.mock("@/home/components/CharacterItems", () => () => <div data-testid="character-items" />);

describe("Characters component", () => {
  it("renders without crashing", () => {
    render(<Characters />);
    expect(screen.getByTestId("character-items")).toBeInTheDocument();
  });
});
