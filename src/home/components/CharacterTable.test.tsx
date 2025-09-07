import { render, screen, fireEvent } from "@testing-library/react";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import CharacterTable from "@home/components/CharactersTable";

jest.mock("@/home/components/Planet", () => ({
  Planet: ({ planetUrl }: { planetUrl: string }) => <span data-testid="planet">{planetUrl}</span>,
}));

describe("CharacterTable component", () => {
  const mockData: FlattenedPerson[] = [
    {
      id: "1",
      name: "Luke Skywalker",
      gender: "male",
      hair_color: "blond",
      height: "172",
      eye_color: "blue",
      mass: "77",
      url: "",
      homeworld: "https://swapi/planets/1",
      films: [],
      starships: [],
    },
    {
      id: "2",
      name: "C-3PO",
      gender: "n/a",
      hair_color: "n/a",
      height: "167",
      eye_color: "yellow",
      mass: "75",
      url: "",
      homeworld: "https://swapi/planets/2",
      films: [],
      starships: [],
    },
  ];

  it("renders all rows and Planet components", () => {
    render(<CharacterTable loading={false} data={mockData} handleClick={jest.fn()} />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("C-3PO")).toBeInTheDocument();

    const planets = screen.getAllByTestId("planet");
    expect(planets.length).toBe(2);
    expect(planets[0]).toHaveTextContent("https://swapi/planets/1");
    expect(planets[1]).toHaveTextContent("https://swapi/planets/2");
  });

  it("calls handleClick when edit and view icons are clicked", () => {
    const handleClick = jest.fn();

    render(<CharacterTable loading={false} data={mockData} handleClick={handleClick} />);

    // PrimeReact DataTable renders spans, so let's query spans with class
    const editSpans = screen.getAllByText((content, element) => {
      if (content) {
      }
      return !!element && element.className.includes("pi-pencil");
    });

    const viewSpans = screen.getAllByText((content, element) => {
      if (content) {
      }
      return !!element && element.className.includes("pi-eye");
    });

    // Click first edit and view buttons
    fireEvent.click(editSpans[0]);
    fireEvent.click(viewSpans[0]);

    expect(handleClick).toHaveBeenCalledTimes(2);
    expect(handleClick).toHaveBeenCalledWith("1");
  });

  it("renders loading state when loading is true", () => {
    render(<CharacterTable loading={true} data={[]} handleClick={jest.fn()} />);
    const loadingWrapper = screen.getByTestId("loading-wrapper");
    expect(loadingWrapper).toBeInTheDocument();
    // expect(document.querySelector("#loading-wrapper")).toBeInTheDocument();
  });
});
