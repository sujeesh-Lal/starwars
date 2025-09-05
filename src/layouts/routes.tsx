import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@layouts/AppLayout";
import Characters from "@/home/pages/Characters";
import Favorites from "@/home/pages/Favorites";
import NotFound from "@/shared/components/NotFound";
import { planetsLoader } from "@/home/services/planetsLoader";
import RouteLoaderError from "@/shared/components/RouteLoaderError";

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
        { path: "*", element: <NotFound /> }, // catch-all
      ],
    },
  ],
  {
    basename: "/starwars", // ✅ set basename here, not inside the route
  },
);
