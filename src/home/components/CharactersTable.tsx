import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import React from "react";
import { Planet } from "@home/components/Planet";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
      <DataTable
        loading={loading}
        size="small"
        value={data}
        tableStyle={{ minWidth: "50rem", minHeight: "28rem" }}
      >
        <Column field="id" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="gender" header="Gender"></Column>
        <Column field="homeworld" header="Home Planet" body={planetBodyTemplate}></Column>
        <Column header="Actions" body={actionBodyTemplate}></Column>
      </DataTable>
    </>
  );
};

const CharacterTable = React.memo(CharacterTableComponent);
export default CharacterTable;
