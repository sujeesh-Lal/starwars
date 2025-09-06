import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@app/store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import CharacterInfo from "@home/components/CharacterInfo";
import { findCharacterById } from "@home/services/Characters";

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loadingPeople } = useSelector((s: RootState) => s.people);
  const navigate = useNavigate();
  const location = useLocation() as {
    state?: { fromPage?: string; search: string; firstRecord: number; currentRow: number };
  };

  const character: FlattenedPerson | undefined = findCharacterById(data, id);

  const backToList = () => {
    const page = location.state?.fromPage ?? "1";
    const search = location.state?.search ?? "1";
    navigate(`/`, {
      state: {
        fromPage: page,
        search: search,
        firstRecord: location.state?.firstRecord,
        currentRow: location.state?.currentRow,
      },
    });
  };

  if (loadingPeople && !character) return <p>Loading...</p>;
  if (!character) return <p>No employee found</p>;

  return (
    <div>
      <div className="max-w-md rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 p-5">
        <CharacterInfo character={character} />
      </div>
      <section className="mt-4">
        <div onClick={backToList}>back to list</div>
      </section>
    </div>
  );
};

export default CharacterDetails;
