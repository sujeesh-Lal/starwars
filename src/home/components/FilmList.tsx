import type { AppDispatch, RootState } from "@/app/store";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilmById } from "@home/slice/filmSlice";
import { ProgressSpinner } from "primereact/progressspinner";
import { getFilmTitles } from "@home/services/Films";

interface FilmListProps {
  character: FlattenedPerson;
}

const FilmList: React.FC<FilmListProps> = ({ character }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { filmItems, loadingFilm, errorFilm } = useSelector((state: RootState) => state.films);
  const [filmsLoaded, setFilmsLoaded] = useState(false);

  const titles = getFilmTitles(character, filmItems);

  useEffect(() => {
    if (!character?.films?.length) return;
    setFilmsLoaded(false);
    (async () => {
      try {
        for (const filmUrl of character.films) {
          const parts = filmUrl.replace(/\/$/, "").split("/");
          const filmId = parts[parts.length - 1];
          if (filmId) {
            // wait for this dispatch to finish before continuing
            await dispatch(fetchFilmById(filmId));
          }
        }
        setFilmsLoaded(true); // all done
      } catch (err) {
        setFilmsLoaded(true); // or handle error differently
      }
    })();
  }, [character?.films, dispatch]);

  return (
    <>
      {loadingFilm && (
        <div className="flex">
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
        <>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Films:</h3>
            <div className="list-disc list-inside text-sm text-gray-900">No films available</div>
          </div>
        </>
      )}
      {filmsLoaded && (
        <div className="mb-3">
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
