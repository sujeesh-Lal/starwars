import { render, screen, fireEvent } from "@testing-library/react";
import CharacterInfo from "./CharacterInfo";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "@home/slice/peopleSlice";

import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import type { RootState } from "@/app/store";

jest.mock("@home/components/Planet", () => ({
  Planet: ({ planetUrl }: { planetUrl: string }) => <span data-testid="planet">{planetUrl}</span>,
}));

describe("CharacterInfo component", () => {
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
  });

  it("renders character details and Planet component", () => {
    render(
      <Provider store={store}>
        <CharacterInfo character={mockCharacter} />
      </Provider>,
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("blond")).toBeInTheDocument();
    expect(screen.getByText("blue")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
    expect(screen.getByTestId("planet")).toHaveTextContent("https://planet.url/1");
  });

  it("renders 'Add to Favourites' button when favorite is false", () => {
    render(
      <Provider store={store}>
        <CharacterInfo character={mockCharacter} />
      </Provider>,
    );

    expect(screen.getByText("★ Add to Favourites")).toBeInTheDocument();
  });

  it("dispatches updatePeople with toggled favorite when button clicked", () => {
    render(
      <Provider store={store}>
        <CharacterInfo character={mockCharacter} />
      </Provider>,
    );

    const button = screen.getByText("★ Add to Favourites");
    fireEvent.click(button);

    const state: RootState = store.getState() as RootState;
    const updatedCharacter = state.people.data["1"][0];
    expect(updatedCharacter.favorite).toBe(true);
  });

  it("renders 'Remove from Favourites' button when favorite is true", () => {
    const favoriteCharacter = { ...mockCharacter, favorite: true };
    render(
      <Provider store={store}>
        <CharacterInfo character={favoriteCharacter} />
      </Provider>,
    );

    expect(screen.getByText("✓ Remove from Favourites")).toBeInTheDocument();
  });
});
