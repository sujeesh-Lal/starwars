import { initialState, type PlanetResponse, type PlanetResult } from "@/shared/types/planetTypes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@shared/services/axiosInstance";

export const fetchPlanets = createAsyncThunk("planet/fetchPlanets", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get<PlanetResponse>("/api/planets?page=1&limit=100");
    return response.data.results;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const planetsSlice = createSlice({
  name: "planet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanets.pending, (state) => {
        state.loadingPlanet = true;
        state.errorPlanet = null;
      })
      .addCase(fetchPlanets.fulfilled, (state, action: PayloadAction<PlanetResult[]>) => {
        state.planetItems = action.payload;
        state.loadingPlanet = false;
      })
      .addCase(fetchPlanets.rejected, (state, action) => {
        state.loadingPlanet = false;
        state.errorPlanet = (action.payload as string) ?? "Unknown error";
      });
  },
});

export default planetsSlice.reducer;
