import { createSlice } from "@reduxjs/toolkit";

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

export const initialState: PlanetDataState = {
  planetItems: [],
  loadingPlanet: false,
  errorPlanet: null,
};

const planetsSlice = createSlice({
  name: "planet",
  initialState,
  reducers: {},
});

export default planetsSlice.reducer;
