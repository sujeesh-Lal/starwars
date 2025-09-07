import { configureStore } from "@reduxjs/toolkit";
import peopleReducer, { fetchPeople, updatePeople } from "@home/slice/peopleSlice";
import type { FlattenedPerson } from "@shared/types/peopleTypes";
import axiosInstance from "@shared/services/axiosInstance";

// Mock axios
jest.mock("@shared/services/axiosInstance");
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("peopleSlice", () => {
  let store: ReturnType<typeof setupStore>;

  const setupStore = () =>
    configureStore({
      reducer: {
        people: peopleReducer,
      },
    });

  const initialPerson: FlattenedPerson = {
    id: "1",
    name: "Luke Skywalker",
    gender: "male",
    hair_color: "blond",
    height: "172",
    eye_color: "blue",
    mass: "77",
    url: "https://www.swapi.tech/api/people/1",
    homeworld: "https://www.swapi.tech/api/planets/1",
    films: ["https://www.swapi.tech/api/films/1"],
    starships: ["https://www.swapi.tech/api/starships/12"],
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        people: peopleReducer,
      },
    });
  });

  it("should return the initial state", () => {
    const state = store.getState().people;
    expect(state).toHaveProperty("data");
    expect(state).toHaveProperty("pagesLoaded");
    expect(state.loadingPeople).toBe(false);
    expect(state.errorPeople).toBeNull();
  });

  it("should handle updatePeople", () => {
    // manually set a page with one person
    store.dispatch({
      type: fetchPeople.fulfilled.type,
      payload: {
        page: "1",
        people: [initialPerson],
        total_pages: 1,
        total_records: 1,
        next: null,
        previous: null,
      },
      meta: { arg: { page: "1" } },
    });

    const updatedPerson = { ...initialPerson, name: "Luke Updated" };
    store.dispatch(updatePeople(updatedPerson));

    const state = store.getState().people;
    expect(state.data["1"][0].name).toBe("Luke Updated");
  });

  it("should handle fetchPeople thunk fulfilled", async () => {
    const mockResponse = {
      data: {
        total_pages: 1,
        total_records: 1,
        next: null,
        previous: null,
        results: [], // API shape doesn't matter because flattenPeoplesData is mocked
      },
    };

    // mock axios get
    mockedAxios.get.mockResolvedValueOnce(mockResponse as any);

    const result = await store.dispatch(fetchPeople({ page: "1" }) as any);
    const state = store.getState().people;

    expect(state.pagesLoaded).toContain("1");
    expect(state.loadingPeople).toBe(false);
    expect(state.errorPeople).toBeNull();
    expect(result.type).toBe("people/fetchPeople/fulfilled");
  });

  it("should handle fetchPeople thunk rejected", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    const result = await store.dispatch(fetchPeople({ page: "2" }) as any);
    const state = store.getState().people;

    expect(state.loadingPeople).toBe(false);
    expect(state.errorPeople).toBe("Network Error");
    expect(result.type).toBe("people/fetchPeople/rejected");
  });
});
