import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import CharacterTable from "./CharactersTable";
import { findCharactersByText } from "@home/services/Characters";
import { useDebounce } from "@/shared/hooks";

interface CharacterSearchProps {
  search: string;
  handleClick: (id: string) => void;
}

export const CharacterSearch: React.FC<CharacterSearchProps> = ({ search, handleClick }) => {
  const { data, loadingPeople } = useSelector((state: RootState) => state.people);
  const debouncedSearch = useDebounce(search, 500);
  const filteredData = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return [];

    return findCharactersByText(data, q) as FlattenedPerson[];
  }, [debouncedSearch, data]);

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
