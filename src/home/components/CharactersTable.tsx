import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import React from "react";
import { Planet } from "@home/components/Planet";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";

interface CharacterTableProps {
  loading: boolean;
  data: FlattenedPerson[];
  handleClick: (id: string) => void;
}

const CharacterTableComponent: React.FC<CharacterTableProps> = ({ loading, data, handleClick }) => {
  const planetBodyTemplate = (character: FlattenedPerson) => {
    return <Planet planetUrl={character?.homeworld} />;
  };

  const actionBodyTemplate = (character: FlattenedPerson) => {
    return (
      <>
        <span
          className="mr-2 cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={() => {
            handleClick(character.id);
          }}
        >
          <i className="pi pi-pencil"></i>
        </span>

        <span
          className="ml-2 cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={() => {
            handleClick(character.id);
          }}
        >
          <i className="pi pi-eye"></i>
        </span>
      </>
    );
  };
  return (
    <>
      {loading ? (
        <div data-testid="loading-wrapper" className="flex justify-center items-center h-64">
          <ProgressSpinner />
        </div>
      ) : (
        <div className="w-full" style={{ minHeight: "28em" }}>
          <DataTable
            className="characters-list-table"
            data-testid="characters-list-table"
            size="small"
            scrollable
            value={data}
            loadingIcon="pi pi-spin pi-spinner"
            tableStyle={{ minWidth: "50rem" }}
            emptyMessage={<span>No records found.</span>}
          >
            <Column field="name" header="Name"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="homeworld" header="Home Planet" body={planetBodyTemplate}></Column>
            <Column header="Actions" body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      )}
    </>
  );
};

const CharacterTable = React.memo(CharacterTableComponent);
export default CharacterTable;
