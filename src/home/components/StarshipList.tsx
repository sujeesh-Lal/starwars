import type { AppDispatch, RootState } from "@/app/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStarshipById } from "@home/slice/starshipSlice";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import { ProgressSpinner } from "primereact/progressspinner";
import { getStarshipModels } from "@home/services/Starship";

interface StarshipListProps {
  character: FlattenedPerson;
}

const StarshipList: React.FC<StarshipListProps> = ({ character }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { starshipItems, loadingStarship, errorStarship } = useSelector(
    (state: RootState) => state.starships,
  );
  const [starshipLoaded, setStarshipLoaded] = useState(false);

  const starshipModels = getStarshipModels(character, starshipItems);

  useEffect(() => {
    if (!character?.starships?.length) return;
    setStarshipLoaded(false);
    (async () => {
      try {
        for (const starshipUrl of character.starships) {
          const parts = starshipUrl.replace(/\/$/, "").split("/");
          const starshipId = parts[parts.length - 1];
          if (starshipId) {
            // wait for this dispatch to finish before continuing
            await dispatch(fetchStarshipById(starshipId));
          }
        }

        setStarshipLoaded(true); // all done
      } catch (err) {
        console.error("film fetch failed", err);
        setStarshipLoaded(true); // or handle error differently
      }
    })();
  }, [character?.starships, dispatch]);

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
