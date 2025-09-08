import type { AppDispatch, RootState } from "@/app/store";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { findCharactersByKey } from "@home/services/Characters";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Planet } from "../components/Planet";
import { updatePeople } from "../slice/peopleSlice";

const Favorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data } = useSelector((state: RootState) => state.people);
  const favorites = () => {
    return findCharactersByKey(data, { favorite: true }) as FlattenedPerson[];
  };
  const favoritesData = favorites();
  const planetBodyTemplate = (character: FlattenedPerson) => {
    return <Planet planetUrl={character?.homeworld} />;
  };
  const toggleFavourite = (character: FlattenedPerson) => {
    let editedCharacter = { ...character };
    editedCharacter["favorite"] = !editedCharacter.favorite;
    dispatch(updatePeople(editedCharacter));
  };
  const actionBodyTemplate = (character: FlattenedPerson) => {
    return (
      <>
        <button
          data-testid="make-fav-btn"
          onClick={() => {
            toggleFavourite(character);
          }}
          className={
            character.favorite
              ? "rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white hover:bg-green-600"
              : "rounded-full bg-yellow-400 px-3 py-1 text-sm font-medium text-gray-800 hover:bg-yellow-500"
          }
        >
          {character.favorite ? "✓ Remove from Favourites" : "★ Add to Favourites"}
        </button>
      </>
    );
  };
  return (
    <>
      <div className="mt-4 mb-4">
        {favoritesData && (
          <div className="w-full" style={{ minHeight: "28em" }} data-testid="favorites-table">
            <DataTable
              scrollable
              loadingIcon="pi pi-spin pi-spinner"
              size="small"
              value={favoritesData}
              tableStyle={{ minWidth: "50rem" }}
              emptyMessage={<span>No records found.</span>}
            >
              <Column field="name" header="Name"></Column>
              <Column field="height" header="Height"></Column>
              <Column field="gender" header="Gender"></Column>
              <Column field="homeworld" header="Home Planet" body={planetBodyTemplate}></Column>
              <Column header="Actions" body={actionBodyTemplate}></Column>
            </DataTable>
          </div>
        )}
      </div>
    </>
  );
};
export default Favorites;
