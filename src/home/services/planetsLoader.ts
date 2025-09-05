import type { LoaderFunctionArgs } from "react-router-dom";
import { store } from "@app/store";
import { fetchPlanets } from "@home/slice/planetsSlice";

export async function planetsLoader(_: LoaderFunctionArgs) {
  // dispatch thunk on the store directly
  const action = await store.dispatch(fetchPlanets());

  // If rejected, you can throw to trigger an error boundary
  if (fetchPlanets.rejected.match(action)) {
    throw new Response("Failed to fetch employees", { status: 500 });
  }

  // loader should return whatever you want useLoaderData to see
  // you could also just return null, since components read from Redux
  return store.getState().planets.planetItems;
}
