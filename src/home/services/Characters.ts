import type { FlattenedPerson, PeopleListResponse } from "@/shared/types/peopleTypes";

export const findCharacterById = (
  data: Record<string, FlattenedPerson[]>,
  id: string | undefined,
): FlattenedPerson | undefined =>
  Object.keys(data)
    .reduce<FlattenedPerson[]>((acc, k) => acc.concat(data[k]), [])
    .find((p) => p.id === id);

export const findCharactersByText = (
  data: Record<string, FlattenedPerson[]>,
  text: string,
): FlattenedPerson[] => {
  const q = text.trim().toLowerCase();
  const result: FlattenedPerson[] = [];

  for (const key of Object.keys(data)) {
    const people = data[key];
    for (const person of people) {
      if (!q || person.name.toLowerCase().includes(q)) {
        result.push(person);
      }
    }
  }

  return result;
};

export const flattenPeoplesData = (data: PeopleListResponse): FlattenedPerson[] => {
  const results = data.results?.map((r) => {
    const p = r.properties;
    return {
      id: r.uid,
      name: p.name,
      gender: p.gender,
      hair_color: p.hair_color,
      height: p.height,
      eye_color: p.eye_color,
      mass: p.mass,
      url: p.url,
      homeworld: p.homeworld,
      films: p.films,
      starships: p.starships,
    };
  });
  return results;
};

export const findCharacterLocation = (
  data: Record<string, FlattenedPerson[]>,
  id: string,
): { page: string; index: number } | null => {
  const pages = Object.keys(data);

  for (const page of pages) {
    const people = data[page];
    const idx = people.findIndex((p) => p.id === id);
    if (idx !== -1) {
      return { page, index: idx };
    }
  }

  return null;
};
