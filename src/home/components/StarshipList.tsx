import type { RootState } from "@/app/store";
import React from "react";
import { useSelector } from "react-redux";
import { fetchStarshipById } from "@home/slice/starshipSlice";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import { ProgressSpinner } from "primereact/progressspinner";
import { getStarshipModels } from "@home/services/Starship";
import { useFetchItems } from "@home/hooks/useFetchItems";

interface StarshipListProps {
  character: FlattenedPerson;
}

const StarshipList: React.FC<StarshipListProps> = ({ character }) => {
  const { starshipItems, loadingStarship, errorStarship } = useSelector(
    (state: RootState) => state.starships,
  );
  const starshipLoaded = useFetchItems({
    items: character?.starships,
    fetchById: fetchStarshipById,
  });

  const starshipModels = getStarshipModels(character, starshipItems);
  return (
    <>
      {loadingStarship && (
        <div className="flex">
          <span className="flex items-center">Loading Starships ...</span>
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration="1s"
          />
        </div>
      )}
      {errorStarship && <p className="text-red-500">{errorStarship}</p>}
      {!character?.starships?.length && (
        <>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Starships:</h3>
            <div className="list-disc list-inside text-sm text-gray-900">
              No starships available
            </div>
          </div>
        </>
      )}
      {starshipLoaded && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Starships:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {starshipModels?.map((starship) => (
              <li key={starship.id}>{starship.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default StarshipList;
