import type { Film, FilmResponse } from "@/shared/types/filmTypes";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";

export const getFilmTitles = (
  character: FlattenedPerson | undefined,
  films: Film[],
): Film[] | undefined => {
  return character?.films
    .map((filmUrl: string) => films?.find((f) => f.url === filmUrl)) // find matching film
    .filter((f): f is Film => f !== undefined) // filter out undefined
    .map((f: Film) => f);
};

export const flattenFilmData = (data: FilmResponse): Film => {
  return {
    id: data.result.uid,
    title: data.result.properties.title,
    episode: data.result.properties.episode,
    director: data.result.properties.director,
    url: data.result.properties.url,
  };
};
