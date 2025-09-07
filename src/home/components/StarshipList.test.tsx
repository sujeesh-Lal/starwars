// StarshipList.test.tsx
import { render, screen } from "@testing-library/react";
import StarshipList from "./StarshipList";
import { Provider } from "react-redux";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import { configureStore } from "@reduxjs/toolkit";
import type { StarshipState } from "@/shared/types/starshipTypes";

const starshipReducer = (
  state: StarshipState = { starshipItems: [], loadingStarship: false, errorStarship: null },
): StarshipState => state;

// --- mocks ---
jest.mock("@home/slice/starshipSlice", () => ({
  fetchStarshipById: (id: string) => ({ type: "starships/fetchStarshipById", meta: { id } }),
}));

function renderWithStore(state: StarshipState, character: FlattenedPerson) {
  const store = configureStore({
    reducer: { starships: starshipReducer },
    preloadedState: { starships: state },
  });
  return render(
    <Provider store={store}>
      <StarshipList character={character} />
    </Provider>,
  );
}

// --- test data ---
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

const fakeStarship = { id: "10", name: "X-wing", model: "T-65", url: "" };

jest.mock("@home/services/Starship", () => ({
  getStarshipModels: jest.fn(() => [{ id: "1", name: "A New Hope", model: "aa", url: "" }]),
}));

describe("StarshipList", () => {
  it("shows loading spinner when loadingStarship is true", () => {
    renderWithStore(
      { starshipItems: [], loadingStarship: true, errorStarship: null },
      mockCharacter,
    );
    expect(screen.getByText(/Loading Starships/i)).toBeInTheDocument();
  });

  it("renders error when errorStarship is set", () => {
    renderWithStore(
      { starshipItems: [], loadingStarship: false, errorStarship: "boom" },
      mockCharacter,
    );
    expect(screen.getByText(/boom/i)).toBeInTheDocument();
  });

  it("renders 'No starships available' if character has no starships", () => {
    renderWithStore(
      { starshipItems: [], loadingStarship: false, errorStarship: null },
      {
        ...mockCharacter,
        starships: [],
      },
    );
    expect(screen.getByText(/No starships available/i)).toBeInTheDocument();
  });

  it("renders starship names once starshipLoaded", () => {
    const storeState = {
      starshipItems: [fakeStarship],
      loadingStarship: false,
      errorStarship: null,
    };
    const baseCharacter: FlattenedPerson = {
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
      starships: ["https://www.swapi.tech/api/starships/12"],
      favorite: false,
    };

    renderWithStore(storeState, baseCharacter);
    expect(screen.findByText("A New Hope")).resolves.toBeInTheDocument();
  });
});
