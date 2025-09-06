import type { PlanetResult } from "@/shared/types/planetTypes";

export function findPlanetByUrl(
  items: PlanetResult[],
  targetUrl: string,
): PlanetResult | undefined {
  return items.find((p) => p.url === targetUrl);
}
