import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import CharacterTable from "./CharactersTable";

interface CharacterSearchProps {
  search: string;
  handleClick: (id: string) => void;
}

export const CharacterSearch: React.FC<CharacterSearchProps> = ({ search, handleClick }) => {
  const { data, loadingPeople } = useSelector((state: RootState) => state.people);
  const findCharactersByText = (
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

  // filter by search text
  const filtered = () => {
    const q = search.trim().toLowerCase();
    if (!q) return [];

    return findCharactersByText(data, q) as FlattenedPerson[];
  };

  const filteredData = filtered();
  return (
    <>
      <div className="mt-4 mb-4">
        {filteredData && search && (
          <div className="mt-4 mb-4">
            <CharacterTable
              loading={loadingPeople}
              data={filteredData}
              handleClick={handleClick}
            ></CharacterTable>
          </div>
        )}
      </div>
    </>
  );
};
