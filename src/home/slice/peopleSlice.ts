import type { RootState } from "@/app/store";
import {
  initialState,
  type FetchPeopleParams,
  type FetchPeopleReturnParams,
  type FlattenedPerson,
  type PeopleListResponse,
} from "@shared/types/peopleTypes";
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@shared/services/axiosInstance";
import { findCharacterLocation, flattenPeoplesData } from "@home/services/Characters";

// Async thunk
export const fetchPeople = createAsyncThunk<
  FetchPeopleReturnParams, // Return type
  FetchPeopleParams, // Parameter type
  { state: RootState; rejectValue: string }
>("people/fetchPeople", async ({ page = "1" }: FetchPeopleParams, thunkAPI) => {
  try {
    const state = thunkAPI.getState();

    if (state.people.pagesLoaded.includes(page)) {
      // return cached data instantly
      return thunkAPI.fulfillWithValue({
        page,
        total_pages: state.people.total_pages,
        total_records: state.people.total_records,
        next: state.people.next,
        previous: state.people.previous,
        people: state.people.data[page],
      });
    }

    const url = `/api/people?page=${page}&limit=10&expanded=true`;
    const response = await axiosInstance.get<PeopleListResponse>(url);

    const people: FlattenedPerson[] = flattenPeoplesData(response.data);
    const { total_pages, total_records, next, previous } = response.data;
    return { page, total_pages, total_records, next, previous, people };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    updatePeople: (state, action: PayloadAction<FlattenedPerson>) => {
      const characterDetails = findCharacterLocation(state.data, action.payload.id);
      if (characterDetails?.page && characterDetails.index !== null) {
        const { page, index } = characterDetails;
        state.data[page][index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state, action) => {
        const page = action.meta.arg.page ?? "1";

        // Skip loading if already cached
        if (state.pagesLoaded.includes(page)) return;

        state.loadingPeople = true;
        state.errorPeople = null;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        const { page, people } = action.payload;

        // store page data
        state.data[page] = people;

        // mark page as loaded
        if (!state.pagesLoaded.includes(page)) {
          state.pagesLoaded.push(page);
        }
        state.total_pages = action.payload.total_pages;
        state.total_records = action.payload.total_records;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.loadingPeople = false;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loadingPeople = false;
        state.errorPeople = action.payload ?? "Failed to fetch people";
      });
  },
});

export const { updatePeople } = peopleSlice.actions;
export default peopleSlice.reducer;
