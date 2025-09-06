import { render, screen } from "@testing-library/react";
import { Planet } from "./Planet";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import type { PlanetResult } from "@/shared/types/planetTypes";

interface PlanetsState {
  planetItems: PlanetResult[];
}

const planetsReducer = (state: PlanetsState = { planetItems: [] }): PlanetsState => state;

describe("Planet component", () => {
  const renderWithStore = (planetItems: PlanetResult[], planetUrl: string) => {
    const store = configureStore({
      reducer: { planets: planetsReducer },
      preloadedState: { planets: { planetItems } },
    });

    render(
      <Provider store={store}>
        <Planet planetUrl={planetUrl} />
      </Provider>,
    );
  };

  it("renders the planet name when found", () => {
    const mockPlanets: PlanetResult[] = [
      { url: "https://swapi/planets/1", name: "Tatooine" } as PlanetResult,
      { url: "https://swapi/planets/2", name: "Alderaan" } as PlanetResult,
    ];

    renderWithStore(mockPlanets, "https://swapi/planets/2");

    expect(screen.getByText("Alderaan")).toBeInTheDocument();
  });

  it("renders 'Unknown planet' when not found", () => {
    const mockPlanets: PlanetResult[] = [
      { url: "https://swapi/planets/1", name: "Tatooine" } as PlanetResult,
      { url: "https://swapi/planets/2", name: "Alderaan" } as PlanetResult,
    ];

    renderWithStore(mockPlanets, "https://swapi/planets/99");

    expect(screen.getByText("Unknown planet")).toBeInTheDocument();
  });
});
