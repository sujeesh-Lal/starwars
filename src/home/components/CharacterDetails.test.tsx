import { render, screen, fireEvent } from "@testing-library/react";
import CharacterDetails from "./CharacterDetails";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "@home/slice/peopleSlice";
import { BrowserRouter } from "react-router-dom";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";

// Mock CharacterInfo
jest.mock("@home/components/CharacterInfo", () => ({
  __esModule: true,
  default: ({ character }: { character: FlattenedPerson }) => (
    <div data-testid="character-info">{character.name}</div>
  ),
}));

// Mock react-router hooks
const mockNavigate = jest.fn();
const mockUseParams = jest.fn();
const mockUseLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams(),
  useLocation: () => mockUseLocation(),
}));

describe("CharacterDetails component", () => {
  const mockCharacter: FlattenedPerson = {
    id: "1",
    name: "Luke Skywalker",
    gender: "male",
    hair_color: "blond",
    height: "172",
    eye_color: "blue",
    mass: "77",
    url: "",
    homeworld: "https://planet.url/1",
    films: [],
    starships: [],
    favorite: false,
  };

  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    jest.clearAllMocks();

    store = configureStore({
      reducer: { people: peopleReducer },
      preloadedState: {
        people: {
          data: { "1": [mockCharacter] },
          loadingPeople: false,
          errorPeople: null,
          total_records: 1,
          total_pages: 1,
          next: null,
          previous: null,
          pagesLoaded: ["1"],
        },
      },
    });

    mockUseParams.mockReturnValue({ id: "1" });
    mockUseLocation.mockReturnValue({
      state: { fromPage: "1", search: "", firstRecord: 0, currentRow: 10 },
    });
  });

  it("renders character info when character exists", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterDetails />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByTestId("character-info")).toHaveTextContent("Luke Skywalker");
  });

  it("shows loading text when loadingPeople is true and character not found", () => {
    store = configureStore({
      reducer: { people: peopleReducer },
      preloadedState: {
        people: {
          data: {},
          loadingPeople: true,
          errorPeople: null,
          total_records: 0,
          total_pages: 0,
          next: null,
          previous: null,
          pagesLoaded: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterDetails />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows 'No employee found' when character is undefined", () => {
    store = configureStore({
      reducer: { people: peopleReducer },
      preloadedState: {
        people: {
          data: {},
          loadingPeople: false,
          errorPeople: null,
          total_records: 0,
          total_pages: 0,
          next: null,
          previous: null,
          pagesLoaded: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterDetails />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("No employee found")).toBeInTheDocument();
  });

  it("calls navigate with correct state when back to list clicked", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterDetails />
        </BrowserRouter>
      </Provider>,
    );

    const backButton = screen.getByText("back to list");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/`, {
      state: { fromPage: "1", search: "", firstRecord: 0, currentRow: 10 },
    });
  });
});
