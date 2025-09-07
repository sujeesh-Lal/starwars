import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@layouts/AppLayout";
import Characters from "@/home/pages/Characters";
import Favorites from "@/home/pages/Favorites";
import NotFound from "@/shared/components/NotFound";
import { planetsLoader } from "@/home/services/planetsLoader";
import RouteLoaderError from "@/shared/components/RouteLoaderError";
import CharacterDetails from "@/home/components/CharacterDetails";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />, // common layout
      loader: planetsLoader,
      errorElement: <RouteLoaderError />,
      children: [
        { index: true, element: <Characters /> }, // default route "/"
        { path: "favorites", element: <Favorites /> },
        { path: "characters", element: <Characters /> },
        { path: "characters/:id", element: <CharacterDetails /> },
        { path: "*", element: <NotFound /> }, // catch-all
      ],
    },
  ],
  {
    basename: "/starwars/",
  },
);
