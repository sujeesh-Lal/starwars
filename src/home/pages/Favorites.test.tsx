import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import Favorites from "./Favorites";
import { updatePeople } from "../slice/peopleSlice";
import type { FlattenedPerson, PeopleDataState } from "@/shared/types/peopleTypes";
import { initialState as peopleInitialState } from "@shared/types/peopleTypes";

// stub out <Planet/> to avoid network calls / SWAPI logic
jest.mock("../components/Planet", () => ({
  Planet: () => <span>PlanetName</span>,
}));

// spy on updatePeople action creator (so we can check dispatch)
jest.mock("../slice/peopleSlice", () => {
  const actual = jest.requireActual("../slice/peopleSlice");
  return {
    ...actual,
    updatePeople: jest.fn((payload) => ({ type: "people/updatePeople", payload })),
  };
});

const peopleReducer = (
  state: PeopleDataState = { data: {}, loadingPeople: false } as any,
): PeopleDataState => state;

const mockFavorite: FlattenedPerson = {
  id: "1",
  name: "Luke Skywalker",
  height: "172",
  gender: "male",
  homeworld: "https://swapi.dev/api/planets/1/",
  favorite: true,
} as any;

function makeStore(
  preloaded = {
    ...peopleInitialState,
    data: { page1: [mockFavorite] },
    loadingPeople: false,
  },
) {
  return configureStore({
    reducer: { people: peopleReducer },
    preloadedState: { people: preloaded },
  });
}

describe("Favorites component", () => {
  it("renders DataTable rows for favorite characters", () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <Favorites />
      </Provider>,
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("PlanetName")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remove from favourites/i })).toBeInTheDocument();
  });

  it("dispatches updatePeople when toggle button clicked", () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <Favorites />
      </Provider>,
    );

    const toggle = screen.getByRole("button", { name: /remove from favourites/i });
    fireEvent.click(toggle);

    expect(updatePeople).toHaveBeenCalledWith(expect.objectContaining({ id: "1" }));
  });

  it("shows empty message when no favorites", () => {
    const emptyStore = makeStore({ data: {}, loadingPeople: false } as any);

    render(
      <Provider store={emptyStore}>
        <Favorites />
      </Provider>,
    );

    // emptyMessage prop shows this text
    expect(screen.getByText(/No records found/i)).toBeInTheDocument();
  });
});
