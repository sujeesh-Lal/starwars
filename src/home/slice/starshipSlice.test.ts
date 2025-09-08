import { configureStore } from "@reduxjs/toolkit";
import starshipReducer, { fetchStarshipById } from "@home/slice/starshipSlice";
import axiosInstance from "@shared/services/axiosInstance";
import type { StarshipResponse } from "@/shared/types/starshipTypes";

jest.mock("@home/services/Starship", () => ({
  flattenStarshipData: (data: StarshipResponse) => ({
    id: data.result.uid,
    name: data.result.properties.name,
  }),
}));

jest.mock("@shared/services/axiosInstance");
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

const fakeStarship: StarshipResponse = {
  message: "ok",
  result: {
    uid: "99",
    properties: {
      name: "Millennium Falcon",
      model: "",
      manufacturer: "",
      url: "",
    } as any,
  },
};

describe("starshipSlice", () => {
  it("fetches and stores a starship by id", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: fakeStarship } as any);

    const store = configureStore({
      reducer: { starships: starshipReducer },
    });

    await store.dispatch(fetchStarshipById("99") as any);

    const state = store.getState().starships;
    expect(state.loadingStarship).toBe(false);
    expect(state.errorStarship).toBeNull();
    expect(state.starshipItems).toHaveLength(1);
    expect(state.starshipItems[0]).toMatchObject({ id: "99" });
  });

  it("skips fetch when starship already exists (condition)", async () => {
    (axiosInstance.get as jest.Mock).mockClear();

    const preloaded = {
      loadingStarship: false,
      errorStarship: null,
      starshipItems: [
        {
          id: "99",
          name: "Cached",
          model: "",
          manufacturer: "",
          url: "",
        },
      ],
    };

    const store = configureStore({
      reducer: { starships: starshipReducer },
      preloadedState: { starships: preloaded },
    });

    await store.dispatch(fetchStarshipById("99") as any);

    expect(axiosInstance.get).not.toHaveBeenCalled();
  });

  it("handles rejected fetchStarshipById", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("network error"));

    const store = configureStore({
      reducer: { starships: starshipReducer },
    });

    await store.dispatch(fetchStarshipById("500") as any);

    const state = store.getState().starships;
    expect(state.loadingStarship).toBe(false);
    expect(state.starshipItems).toHaveLength(0);
    expect(state.errorStarship).toBe("network error");
  });
});
