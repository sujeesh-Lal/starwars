import { flattenStarshipData, getStarshipModels } from "@home/services/Starship";
import type { Starship, StarshipResponse } from "@/shared/types/starshipTypes";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";

describe("flattenStarshipData", () => {
  it("maps StarshipResponse into Starship correctly", () => {
    const mockResponse: StarshipResponse = {
      message: "ok",
      result: {
        uid: "99",
        properties: {
          name: "Millennium Falcon",
          model: "YT-1300",
          url: "https://swapi.dev/api/starships/10/",
        } as any,
      },
    };

    const result = flattenStarshipData(mockResponse);

    expect(result).toEqual<Starship>({
      id: "99",
      name: "Millennium Falcon",
      model: "YT-1300",
      url: "https://swapi.dev/api/starships/10/",
    });
  });
});

describe("getStarshipModels", () => {
  const starships: Starship[] = [
    { id: "1", name: "X-wing", model: "T-65", url: "url1" },
    { id: "2", name: "TIE Fighter", model: "TIE/ln", url: "url2" },
  ];

  it("returns matching starships based on URLs", () => {
    const character: FlattenedPerson = {
      id: "c1",
      name: "Luke",
      starships: ["url1", "url2"],
    } as any;

    const result = getStarshipModels(character, starships);
    expect(result).toHaveLength(2);
    expect(result?.map((s) => s.name)).toEqual(["X-wing", "TIE Fighter"]);
  });

  it("filters out non-matching URLs", () => {
    const character: FlattenedPerson = {
      id: "c1",
      name: "Leia",
      starships: ["url1", "url3"],
    } as any;

    const result = getStarshipModels(character, starships);
    expect(result).toHaveLength(1);
    expect(result?.[0].name).toBe("X-wing");
  });

  it("returns undefined if character has no starships", () => {
    const character: FlattenedPerson = {
      id: "c2",
      name: "Han",
      starships: [],
    } as any;

    const result = getStarshipModels(character, starships);
    expect(result).toEqual([]);
  });

  it("returns undefined if character is undefined", () => {
    const result = getStarshipModels(undefined, starships);
    expect(result).toBeUndefined();
  });
});
