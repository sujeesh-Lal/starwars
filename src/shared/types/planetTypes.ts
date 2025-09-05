// Types
export interface PlanetResponse {
  message: string;
  results: PlanetResult[];
}

export interface PlanetResult {
  uid: string;
  name: string;
  url: string;
}

export interface PlanetDataState {
  planetItems: PlanetResult[];
  loadingPlanet: boolean;
  errorPlanet: string | null;
}

// Initial state
export const initialState: PlanetDataState = {
  planetItems: [],
  loadingPlanet: false,
  errorPlanet: null,
};
