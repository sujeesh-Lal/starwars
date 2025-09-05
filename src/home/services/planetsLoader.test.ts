import { planetsLoader } from "./planetsLoader";
import { store } from "@app/store";
import { fetchPlanets } from "@home/slice/planetsSlice";

jest.mock("@app/store", () => {
  const originalModule = jest.requireActual("@app/store");
  return {
    ...originalModule,
    store: {
      ...originalModule.store,
      dispatch: jest.fn(),
      getState: jest.fn(),
    },
  };
});

describe("planetsLoader", () => {
  const mockStore = store as jest.Mocked<typeof store>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns planetItems when fetchPlanets succeeds", async () => {
    const mockPlanets = [{ name: "Tatooine" }];

    // Cast dispatch to jest.MockedFunction<any> to bypass type issues
    (mockStore.dispatch as jest.MockedFunction<any>).mockResolvedValue({
      type: fetchPlanets.fulfilled.type,
      payload: mockPlanets,
    });

    mockStore.getState.mockReturnValue({
      planets: { planetItems: mockPlanets },
    } as any);

    const result = await planetsLoader({} as any);

    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(result).toBe(mockPlanets);
  });

  it("throws Response when fetchPlanets is rejected", async () => {
    (mockStore.dispatch as jest.MockedFunction<any>).mockResolvedValue(
      fetchPlanets.rejected(null, "", undefined),
    );

    await expect(planetsLoader({} as any)).rejects.toMatchObject({
      status: 500,
    });
  });
});
