import React from "react";
import CharacterItems from "@/home/components/CharacterItems";

const Characters: React.FC = () => {
  return (
    <div className="p-4" data-testid="character-card">
      <CharacterItems />
    </div>
  );
};

export default Characters;
