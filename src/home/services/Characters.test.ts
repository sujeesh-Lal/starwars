import {
  findCharacterById,
  findCharactersByText,
  flattenPeoplesData,
  findCharacterLocation,
} from "./Characters";
import type { FlattenedPerson, PeopleListResponse } from "@/shared/types/peopleTypes";

describe("Characters service functions", () => {
  const mockData: Record<string, FlattenedPerson[]> = {
    "1": [
      {
        id: "1",
        name: "Luke Skywalker",
        gender: "male",
        hair_color: "blond",
        height: "172",
        eye_color: "blue",
        mass: "77",
        url: "",
        homeworld: "",
        films: [],
        starships: [],
      },
    ],
    "2": [
      {
        id: "2",
        name: "C-3PO",
        gender: "n/a",
        hair_color: "n/a",
        height: "167",
        eye_color: "yellow",
        mass: "75",
        url: "",
        homeworld: "",
        films: [],
        starships: [],
      },
      {
        id: "10",
        name: "Obi-Wan Kenobi",
        gender: "male",
        hair_color: "auburn",
        height: "182",
        eye_color: "blue-gray",
        mass: "77",
        url: "",
        homeworld: "",
        films: [],
        starships: [],
      },
    ],
  };

  describe("findCharacterById", () => {
    it("returns the correct character for a given id", () => {
      const result = findCharacterById(mockData, "10");
      expect(result).toBeDefined();
      expect(result?.name).toBe("Obi-Wan Kenobi");
    });

    it("returns undefined if id does not exist", () => {
      const result = findCharacterById(mockData, "99");
      expect(result).toBeUndefined();
    });
  });

  describe("findCharactersByText", () => {
    it("returns characters whose names match the search text", () => {
      const result = findCharactersByText(mockData, "Luke");
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("Luke Skywalker");
    });

    it("is case-insensitive and trims spaces", () => {
      const result = findCharactersByText(mockData, "  obi-Wan  ");
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("Obi-Wan Kenobi");
    });

    it("returns all characters if search text is empty", () => {
      const result = findCharactersByText(mockData, " ");
      expect(result.length).toBe(3);
    });
  });

  describe("flattenPeoplesData", () => {
    it("flattens API response to FlattenedPerson[]", () => {
      const apiResponse: PeopleListResponse = {
        results: [
          {
            uid: "1",
            properties: {
              name: "Luke Skywalker",
              gender: "male",
              hair_color: "blond",
              height: "172",
              eye_color: "blue",
              mass: "77",
              url: "url1",
              homeworld: "homeworld1",
              films: [],
              starships: [],
            },
          },
        ],
        total_records: 1,
        total_pages: 1,
        next: null,
        previous: null,
        message: "",
      };

      const result = flattenPeoplesData(apiResponse);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe("1");
      expect(result[0].name).toBe("Luke Skywalker");
    });
  });

  describe("findCharacterLocation", () => {
    it("returns page and index of character by id", () => {
      const result = findCharacterLocation(mockData, "10");
      expect(result).toEqual({ page: "2", index: 1 });
    });

    it("returns null if character not found", () => {
      const result = findCharacterLocation(mockData, "99");
      expect(result).toBeNull();
    });
  });
});
