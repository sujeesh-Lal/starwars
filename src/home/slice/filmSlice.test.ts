import { configureStore } from "@reduxjs/toolkit";
import filmReducer, { fetchFilmById } from "@home/slice/filmSlice";
import axiosInstance from "@shared/services/axiosInstance";
import type { FilmResponse } from "@shared/types/filmTypes";

// mock flattenFilmData if you only care that it's called
jest.mock("@home/services/Films", () => ({
  flattenFilmData: (data: FilmResponse) => ({
    id: data.result.uid,
    title: data.result.properties.title,
  }),
}));

// Make sure axiosInstance.get resolves with a fake FilmResponse
const fakeFilm: FilmResponse = {
  message: "ok",
  result: {
    uid: "42",
    properties: {
      title: "A New Hope",
      episode: "",
      director: "",
      url: "",
    } as any,
  },
};

// Mock axios
jest.mock("@shared/services/axiosInstance");
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("filmSlice", () => {
  it("fetches and stores a film by id", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: fakeFilm } as any);

    // make a store with only the films reducer
    const store = configureStore({
      reducer: { films: filmReducer },
    });

    // dispatch thunk and wait for it to finish
    await store.dispatch(fetchFilmById("42") as any);

    const state = store.getState().films;

    expect(state.loadingFilm).toBe(false);
    expect(state.errorFilm).toBeNull();
    expect(state.filmItems).toHaveLength(1);
    expect(state.filmItems[0]).toMatchObject({ id: "42" });
  });

  it("skips fetch when film already exists (condition)", async () => {
    (axiosInstance.get as jest.Mock).mockClear();

    const preloaded = {
      loadingFilm: false,
      errorFilm: null,
      filmItems: [
        {
          id: "42",
          episode: "42",
          title: "Cached",
          director: "",
          url: "",
        },
      ],
    };

    const store = configureStore({
      reducer: { films: filmReducer },
      preloadedState: { films: preloaded },
    });

    await store.dispatch(fetchFilmById("42") as any);

    // because condition returns false, axios never called
    expect(axiosInstance.get).not.toHaveBeenCalled();
  });

  it("handles rejected fetchFilmById", async () => {
    // force axios to reject
    mockedAxios.get.mockRejectedValueOnce(new Error("network broke"));

    const store = configureStore({
      reducer: { films: filmReducer },
    });

    await store.dispatch(fetchFilmById("99") as any);

    const state = store.getState().films;

    expect(state.loadingFilm).toBe(false);
    expect(state.filmItems).toHaveLength(0);
    expect(state.errorFilm).toBe("network broke"); // falls back to default if message missing
  });
});
