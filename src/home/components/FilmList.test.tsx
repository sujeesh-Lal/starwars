import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import FilmList from "./FilmList";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import { configureStore } from "@reduxjs/toolkit";
import type { FilmsDataState } from "@/shared/types/filmTypes";

const baseCharacter: FlattenedPerson = {
  name: "Luke Skywalker",
  films: ["https://swapi.dev/api/films/1/"],
} as any;

const filmsReducer = (
  state: FilmsDataState = { filmItems: [], loadingFilm: false, errorFilm: null },
): FilmsDataState => state;

function renderWithStore(storeState: FilmsDataState, character: FlattenedPerson = baseCharacter) {
  const store = configureStore({
    reducer: { films: filmsReducer },
    preloadedState: { films: storeState },
  });
  return render(
    <Provider store={store}>
      <FilmList character={character} />
    </Provider>,
  );
}

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

jest.mock("@home/services/Films", () => ({
  getFilmTitles: jest.fn(() => [{ id: "1", title: "A New Hope" }]),
}));

describe("FilmList", () => {
  it("renders loading spinner when loadingFilm is true", () => {
    renderWithStore({ filmItems: [], loadingFilm: true, errorFilm: null }, mockCharacter);
    expect(screen.getByText(/loading films/i)).toBeInTheDocument();
  });

  it("renders error message when errorFilm exists", () => {
    renderWithStore({ filmItems: [], loadingFilm: false, errorFilm: "Boom" }, mockCharacter);
    expect(screen.getByText("Boom")).toBeInTheDocument();
  });

  it("renders 'No films available' when character has no films", () => {
    const charWithoutFilms = { ...baseCharacter, films: [] };
    renderWithStore({ filmItems: [], loadingFilm: false, errorFilm: null }, charWithoutFilms);
    expect(screen.getByText(/no films available/i)).toBeInTheDocument();
  });

  it("renders film titles when filmsLoaded is true", () => {
    const storeState = {
      films: {
        filmItems: [{ id: "1", title: "A New Hope" } as any],
        loadingFilm: false,
        errorFilm: null,
      },
    };

    renderWithStore(storeState.films);
    expect(screen.findByText("A New Hope")).resolves.toBeInTheDocument();
  });
});
