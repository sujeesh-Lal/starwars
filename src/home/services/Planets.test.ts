// src/shared/services/planetUtils.test.ts
// import { findPlanetByUrl } from "./planetUtils";
import type { PlanetResult } from "@/shared/types/planetTypes";
import { findPlanetByUrl } from "@home/services/Planets";

describe("findPlanetByUrl", () => {
  const planets: PlanetResult[] = [
    { url: "https://www.swapi.tech/api/planets/1", name: "Tatooine" } as PlanetResult,
    { url: "https://www.swapi.tech/api/planets/2", name: "Alderaan" } as PlanetResult,
    { url: "https://www.swapi.tech/api/planets/3", name: "Yavin IV" } as PlanetResult,
  ];

  it("should return the matching planet by URL", () => {
    const url = "https://www.swapi.tech/api/planets/2";
    const result = findPlanetByUrl(planets, url);
    expect(result).toBeDefined();
    expect(result?.name).toBe("Alderaan");
  });

  it("should return undefined if URL is not found", () => {
    const url = "https://www.swapi.tech/api/planets/99";
    const result = findPlanetByUrl(planets, url);
    expect(result).toBeUndefined();
  });
});
