import type { FlattenedPerson } from "@/shared/types/peopleTypes";
import React from "react";
import { Planet } from "@home/components/Planet";

const CharacterInfoComponent: React.FC<FlattenedPerson> = ({ name, hair_color, eye_color, gender, homeworld }) => {
    return (
        <>
            <h2>Name – {name}</h2>
            <h2>Hair color – {hair_color}</h2>
            <h2>Eye color – {eye_color}</h2>
            <p>Gender – {gender}</p>

            <section className="mt-4">
                <h3 className="font-semibold">Home planet</h3>
                <Planet planetUrl={homeworld} />
            </section>
        </>
    );
};

const CharacterInfo = React.memo(CharacterInfoComponent);
export default CharacterInfo;
