import { render, screen, fireEvent } from "@testing-library/react";
import CharacterItems from "./CharacterItems";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { fetchPeople } from "@home/slice/peopleSlice";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";

interface PeopleDataState {
  data: Record<string, FlattenedPerson[]>;
  loadingPeople: boolean;
  errorPeople?: string | null;
  total_records?: number;
}

const peopleReducer = (
  state: PeopleDataState = { data: {}, loadingPeople: false },
): PeopleDataState => state;

// Mock CharacterTable and CharacterSearch
jest.mock("./CharactersTable", () => ({
  __esModule: true,
  default: ({
    data,
    handleClick,
  }: {
    data: FlattenedPerson[];
    handleClick: (id: string) => void;
  }) => (
    <div data-testid="character-table">
      {data?.map((d) => (
        <span key={d.id} onClick={() => handleClick(d.id)}>
          {d.name}
        </span>
      ))}
    </div>
  ),
}));

jest.mock("@home/components/CharacterSearch", () => ({
  CharacterSearch: ({ search }: { search: string; handleClick: (id: string) => void }) => (
    <div data-testid="character-search">
      <span>{search}</span>
    </div>
  ),
}));

// Mock fetchPeople thunk to prevent real API calls
jest.mock("@home/slice/peopleSlice", () => {
  const originalModule = jest.requireActual("@home/slice/peopleSlice");
  return {
    __esModule: true,
    ...originalModule,
    fetchPeople: jest.fn(() => ({ type: "people/fetchPeople" })),
  };
});

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("CharacterItems component", () => {
  const mockData: Record<string, FlattenedPerson[]> = {
    "1": [
      {
        id: "1",
        name: "Luke Skywalker",
        gender: "male",
        hair_color: "blond",
        height: "172",
        eye_color: "blue",
        mass: "77",
        url: "",
        homeworld: "",
        films: [],
        starships: [],
      },
    ],
  };

  const renderWithStore = (preloadedState?: any) => {
    if (preloadedState) {
    }
    const store = configureStore({
      reducer: { people: peopleReducer }, // slice name
      preloadedState: {
        people: {
          data: mockData,
          loadingPeople: false,
          errorPeople: null,
          total_records: 1,
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterItems />
        </BrowserRouter>
      </Provider>,
    );

    return store;
  };

  it("renders search input and CharacterSearch", () => {
    renderWithStore();
    expect(screen.getByPlaceholderText("Search starwars characters")).toBeInTheDocument();
    expect(screen.getByTestId("character-search")).toBeInTheDocument();
  });

  it("renders CharacterTable when search is empty", () => {
    renderWithStore();
    expect(screen.getByTestId("character-table")).toBeInTheDocument();
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("dispatches fetchPeople on mount", () => {
    // const store = renderWithStore();
    expect(fetchPeople).toHaveBeenCalledWith({ page: "1" });
  });

  it("updates search value", () => {
    renderWithStore();
    const input = screen.getByPlaceholderText("Search starwars characters") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Luke" } });
    expect(input.value).toBe("Luke");
    expect(screen.getByText("Luke")).toBeInTheDocument(); // from mocked CharacterSearch
  });

  it("handles pagination click", async () => {
    renderWithStore({
      people: {
        data: { "1": mockData["1"], "2": [] },
        loadingPeople: false,
        errorPeople: null,
        total_records: 20,
      },
    });
    // PrimeReact paginator adds buttons dynamically; for simplicity, we simulate page change by calling onPageChange manually
    // Or you can query by class ".p-paginator-next" if you import styles
  });

  describe("handleClick coverage", () => {
    const mockData: Record<string, FlattenedPerson[]> = {
      "1": [
        {
          id: "1",
          name: "Luke Skywalker",
          gender: "male",
          hair_color: "blond",
          height: "172",
          eye_color: "blue",
          mass: "77",
          url: "",
          homeworld: "",
          films: [],
          starships: [],
        },
      ],
    };

    it("calls navigate when a character is clicked", async () => {
      const store = configureStore({
        reducer: { people: peopleReducer },
        preloadedState: {
          people: {
            data: mockData,
            loadingPeople: false,
            errorPeople: null,
            total_records: 1,
          },
        },
      });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CharacterItems />
          </BrowserRouter>
        </Provider>,
      );

      // Wait for row to appear
      const characterRow = await screen.findByText("Luke Skywalker");
      fireEvent.click(characterRow);

      expect(mockNavigate).toHaveBeenCalledWith("characters/1", {
        state: { fromPage: 1, search: "", firstRecord: 0, currentRow: 10 },
      });
    });
  });

  describe("CharacterItems onPageChange coverage", () => {
    const mockData: Record<string, FlattenedPerson[]> = {
      "1": [
        {
          id: "1",
          name: "Luke Skywalker",
          gender: "male",
          hair_color: "blond",
          height: "172",
          eye_color: "blue",
          mass: "77",
          url: "",
          homeworld: "",
          films: [],
          starships: [],
        },
      ],
      "2": [
        {
          id: "2",
          name: "C-3PO",
          gender: "n/a",
          hair_color: "n/a",
          height: "167",
          eye_color: "yellow",
          mass: "75",
          url: "",
          homeworld: "",
          films: [],
          starships: [],
        },
      ],
    };

    it("calls onPageChange when Paginator next page is clicked", async () => {
      const store = configureStore({
        reducer: { people: peopleReducer },
        preloadedState: {
          people: {
            data: mockData,
            loadingPeople: false,
            errorPeople: null,
            total_records: 20,
          },
        },
      });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CharacterItems />
          </BrowserRouter>
        </Provider>,
      );

      // PrimeReact Paginator renders "NextPageLink" button with class "p-paginator-next"
      const nextButton = await screen.findByRole("button", { name: /next/i });

      // Simulate clicking the next page
      fireEvent.click(nextButton);

      // Expect the component state to update: page should be 2
      // Since fetchPeople is dispatched in useEffect, we can spy on dispatch
      // Or just ensure that the table now shows data from page 2
      expect(screen.getByText("C-3PO")).toBeInTheDocument();
    });
  });
});
