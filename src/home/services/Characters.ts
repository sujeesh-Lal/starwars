import type { FlattenedPerson, PeopleListResponse } from "@/shared/types/peopleTypes";

export const findCharacterById = (
  data: Record<string, FlattenedPerson[]>,
  id: string | undefined,
): FlattenedPerson | undefined => {
  return Object.values(data)
    .flat()
    .find((person) => person.id === id);
};

export const findCharactersByText = (
  data: Record<string, FlattenedPerson[]>,
  text: string,
): FlattenedPerson[] => {
  const q = text.trim().toLowerCase();
  if (!q) {
    return Object.values(data).flat();
  }
  return Object.values(data)
    .flat()
    .filter((person) => person.name.toLowerCase().includes(q));
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
  for (const [page, people] of Object.entries(data)) {
    const idx = people.findIndex((p) => p.id === id);
    if (idx !== -1) {
      return { page, index: idx };
    }
  }
  return null;
};
