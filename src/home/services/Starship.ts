import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import type { Starship, StarshipResponse } from "@/shared/types/starshipTypes";

export const flattenStarshipData = (data: StarshipResponse): Starship => {
  return {
    id: data.result.uid,
    name: data.result.properties.name,
    model: data.result.properties.model,
    url: data.result.properties.url,
  };
};

export const getStarshipModels = (
  character: FlattenedPerson | undefined,
  starships: Starship[],
): Starship[] | undefined => {
  return character?.starships
    .map((starshipUrl: string) => starships.find((s) => s.url === starshipUrl))
    .filter((s): s is Starship => s !== undefined);
};
