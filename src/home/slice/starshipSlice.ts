import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@app/store";

import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@shared/services/axiosInstance";
import { initialState, type StarshipResponse } from "@/shared/types/starshipTypes";
import { flattenStarshipData } from "@home/services/Starship";

// Thunk: will check state first
export const fetchStarshipById = createAsyncThunk<StarshipResponse, string, { state: RootState }>(
  "startships/fetchById",
  async (id) => {
    const response = await axiosInstance.get<StarshipResponse>(
      `https://www.swapi.tech/api/starships/${id}`,
    );
    console.log(response.data);
    return response.data;
  },
  {
    condition: (id, { getState }) => {
      const state = getState();
      const already = state.starships.starshipItems.find((e) => e.id === id);
      // if already loaded, skip the thunk entirely
      return !already;
    },
  },
);

const starshipSlice = createSlice({
  name: "starships",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarshipById.pending, (state) => {
        state.loadingStarship = true;
        state.errorStarship = null;
      })
      .addCase(fetchStarshipById.fulfilled, (state, action: PayloadAction<StarshipResponse>) => {
        state.loadingStarship = false;
        state.starshipItems.push(flattenStarshipData(action.payload));
      })
      .addCase(fetchStarshipById.rejected, (state, action) => {
        state.loadingStarship = false;
        state.errorStarship = action.error.message ?? "Failed to fetch employee";
      });
  },
});

export default starshipSlice.reducer;
