import React from "react";
import { findPlanetByUrl } from "@home/services/findPlanets";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

interface PlanetNameProps {
  planetUrl: string;
}

export const Planet: React.FC<PlanetNameProps> = ({ planetUrl }) => {
  const { planetItems } = useSelector((state: RootState) => state.planets);

  const planet = findPlanetByUrl(planetItems, planetUrl);

  if (!planet) return <span>Unknown planet</span>;

  return <span>{planet.name}</span>;
};
