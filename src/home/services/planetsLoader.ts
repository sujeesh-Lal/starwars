import type { LoaderFunctionArgs } from "react-router-dom";
import { store } from "@app/store";
import { fetchPlanets } from "@home/slice/planetsSlice";

export async function planetsLoader(_: LoaderFunctionArgs) {
  const action = await store.dispatch(fetchPlanets());

  if (fetchPlanets.rejected.match(action)) {
    throw new Response("Failed to fetch employees", { status: 500 });
  }

  return store.getState().planets.planetItems;
}
