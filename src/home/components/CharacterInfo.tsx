import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import React from "react";
import { Planet } from "@home/components/Planet";
import type { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { updatePeople } from "../slice/peopleSlice";

interface CharacterInfoProps {
  character: FlattenedPerson;
}

const CharacterInfoComponent: React.FC<CharacterInfoProps> = ({ character }) => {
  const dispatch = useDispatch<AppDispatch>();
  const toggleFavourite = () => {
    let editedCharacter = { ...character };
    editedCharacter["favorite"] = !editedCharacter.favorite;
    dispatch(updatePeople(editedCharacter));
  };
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{character.name}</h2>
        <button
          onClick={toggleFavourite}
          className={
            character.favorite
              ? "rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white hover:bg-green-600"
              : "rounded-full bg-yellow-400 px-3 py-1 text-sm font-medium text-gray-800 hover:bg-yellow-500"
          }
        >
          {character.favorite ? "✓ Remove from Favourites" : "★ Add to Favourites"}
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-y-2 text-sm">
        <span className="font-medium text-gray-600">Hair:</span>
        <span className="text-gray-700">{character.hair_color}</span>

        <span className="font-medium text-gray-600">Eyes:</span>
        <span className="text-gray-700">{character.eye_color}</span>

        <span className="font-medium text-gray-600">Gender:</span>
        <span className="text-gray-700">{character.gender}</span>

        <span className="font-medium text-gray-600">Home Planet:</span>
        <span className="text-gray-700">
          <Planet planetUrl={character.homeworld} />
        </span>
      </div>

      {/* Films */}
      {/* {films?.length > 0 && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Films:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {films.map((film) => (
              <li key={film}>{film}</li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Starships */}
      {/* {starships?.length > 0 && (
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">
            Starships:
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {starships.map((ship) => (
              <li key={ship}>{ship}</li>
            ))}
          </ul>
        </div>
      )} */}
    </>
  );
};

const CharacterInfo = React.memo(CharacterInfoComponent);
export default CharacterInfo;
