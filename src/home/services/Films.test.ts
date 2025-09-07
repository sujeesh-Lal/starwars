import { getFilmTitles, flattenFilmData } from "@home/services/Films";
import type { Film, FilmResponse } from "@/shared/types/filmTypes";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";

describe("getFilmTitles", () => {
  const films: Film[] = [
    {
      id: "1",
      title: "A New Hope",
      episode: "IV",
      director: "George",
      url: "https://swapi.dev/films/1",
    },
    {
      id: "2",
      title: "Empire",
      episode: "V",
      director: "George",
      url: "https://swapi.dev/films/2",
    },
  ];

  it("returns Film[] matching the character’s film URLs", () => {
    const character: FlattenedPerson = {
      id: "100",
      name: "Luke Skywalker",
      films: ["https://swapi.dev/films/1", "https://swapi.dev/films/2"],
      // any other props your FlattenedPerson has can go here
    } as any;

    const result = getFilmTitles(character, films);

    expect(result).toHaveLength(2);
    expect(result?.[0].title).toBe("A New Hope");
    expect(result?.[1].id).toBe("2");
  });

  it("filters out URLs that are not in films array", () => {
    const character: FlattenedPerson = {
      id: "100",
      name: "Luke",
      films: ["https://swapi.dev/films/1", "https://swapi.dev/films/999"], // second URL not present
    } as any;

    const result = getFilmTitles(character, films);

    expect(result).toHaveLength(1);
    expect(result?.[0].id).toBe("1");
  });

  it("returns undefined if character is undefined", () => {
    const result = getFilmTitles(undefined, films);
    expect(result).toBeUndefined();
  });
});

describe("flattenFilmData", () => {
  it("maps FilmResponse to Film correctly", () => {
    const mockResponse: FilmResponse = {
      message: "ok",
      result: {
        uid: "42",
        properties: {
          title: "Return of the Jedi",
          episode: "VI",
          director: "Richard Marquand",
          url: "https://swapi.dev/films/3",
        } as any,
      },
    };

    const film = flattenFilmData(mockResponse);

    expect(film).toMatchObject({
      id: "42",
      title: "Return of the Jedi",
      episode: "VI",
      director: "Richard Marquand",
      url: "https://swapi.dev/films/3",
    });
  });
});
