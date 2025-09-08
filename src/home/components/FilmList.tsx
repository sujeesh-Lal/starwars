import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import { fetchFilmById } from "@home/slice/filmSlice";
import { ProgressSpinner } from "primereact/progressspinner";
import { getFilmTitles } from "@home/services/Films";
import { useFetchItems } from "@home/hooks/useFetchItems";

interface FilmListProps {
  character: FlattenedPerson;
}

const FilmList: React.FC<FilmListProps> = ({ character }) => {
  const { filmItems, loadingFilm, errorFilm } = useSelector((state: RootState) => state.films);
  const filmsLoaded = useFetchItems({
    items: character?.films,
    fetchById: fetchFilmById,
  });
  const titles = getFilmTitles(character, filmItems);

  return (
    <>
      {loadingFilm && (
        <div className="flex" data-testid="films-loading">
          <span className="flex items-center">Loading Films ...</span>
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration="1s"
          />
        </div>
      )}

      {errorFilm && <p className="text-red-500">{errorFilm}</p>}

      {!character?.films?.length && (
        <div className="mb-3" data-testid="films-no-items">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Films:</h3>
          <div className="list-disc list-inside text-sm text-gray-900">No films available</div>
        </div>
      )}

      {filmsLoaded && (
        <div className="mb-3" data-testid="films-list">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Films:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {titles?.map((film) => (
              <li key={film.id}>{film.title}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FilmList;
