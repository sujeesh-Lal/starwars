import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@app/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@shared/services/axiosInstance";
import { initialState, type FilmResponse } from "@shared/types/filmTypes";
import { flattenFilmData } from "@home/services/Films";

// Thunk: will check state first
export const fetchFilmById = createAsyncThunk<FilmResponse, string, { state: RootState }>(
  "films/fetchById",
  async (id) => {
    const response = await axiosInstance.get<FilmResponse>(`/api/films/${id}`);
    console.log(response.data);
    return response.data;
  },
  {
    condition: (id, { getState }) => {
      const state = getState();
      const already = state.films.filmItems.find((e) => e.id === id);
      // if already loaded, skip the thunk entirely
      return !already;
    },
  },
);

const filmSlice = createSlice({
  name: "films",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmById.pending, (state) => {
        state.loadingFilm = true;
        state.errorFilm = null;
      })
      .addCase(fetchFilmById.fulfilled, (state, action: PayloadAction<FilmResponse>) => {
        state.loadingFilm = false;
        state.filmItems.push(flattenFilmData(action.payload));
      })
      .addCase(fetchFilmById.rejected, (state, action) => {
        state.loadingFilm = false;
        state.errorFilm = action.error.message ?? "Failed to fetch employee";
      });
  },
});

export default filmSlice.reducer;
