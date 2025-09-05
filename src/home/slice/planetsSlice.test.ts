import reducer, { fetchPlanets } from "./planetsSlice";
import { initialState } from "@/shared/types/planetTypes";
import axiosInstance from "@shared/services/axiosInstance";
import type { PlanetResult } from "@/shared/types/planetTypes";

// Mock axiosInstance
jest.mock("@shared/services/axiosInstance");

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("planetsSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle fetchPlanets.pending", () => {
    const action = { type: fetchPlanets.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loadingPlanet: true,
      errorPlanet: null,
    });
  });

  it("should handle fetchPlanets.fulfilled", () => {
    const mockData: PlanetResult[] = [{ uid: "1", name: "Tatooine", url: "1" }];
    const action = { type: fetchPlanets.fulfilled.type, payload: mockData };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loadingPlanet: false,
      planetItems: mockData,
    });
  });

  it("should handle fetchPlanets.rejected with payload", () => {
    const action = { type: fetchPlanets.rejected.type, payload: "Error occurred" };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loadingPlanet: false,
      errorPlanet: "Error occurred",
    });
  });

  it("should handle fetchPlanets.rejected without payload", () => {
    const action = { type: fetchPlanets.rejected.type, payload: undefined };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loadingPlanet: false,
      errorPlanet: "Unknown error",
    });
  });

  describe("async thunk fetchPlanets", () => {
    it("dispatches fulfilled on successful API call", async () => {
      const mockData: PlanetResult[] = [{ uid: "1", name: "Tatooine", url: "1" }];
      mockedAxios.get.mockResolvedValueOnce({ data: { results: mockData } } as any);

      const dispatch = jest.fn();
      const thunkAPI = { rejectWithValue: jest.fn() };

      const result = await fetchPlanets()(dispatch, () => ({}), thunkAPI as any);

      expect(mockedAxios.get).toHaveBeenCalledWith("/api/planets?page=1&limit=100");
      expect(result.payload).toEqual(mockData);
    });

    it("dispatches rejected on API error", async () => {
      const errorMessage = "Network Error";
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      const dispatch = jest.fn();
      const thunkAPI = { rejectWithValue: jest.fn((val) => val) };

      const result = await fetchPlanets()(dispatch, () => ({}), thunkAPI as any);

      expect(result.payload).toBe(errorMessage);
    });
  });
});
