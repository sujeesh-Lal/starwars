import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@layouts/AppLayout";
import Characters from "@/home/pages/Characters";
import Favorites from "@/home/pages/Favorites";
import NotFound from "@/shared/components/NotFound";
import { planetsLoader } from "@/home/services/planetsLoader";
import RouteLoaderError from "@/shared/components/RouteLoaderError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // common layout
    loader: planetsLoader,
    errorElement: <RouteLoaderError />,
    children: [
      { index: true, element: <Characters /> }, // default route "/"
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "characters",
        element: <Characters />, // shows the list or left panel
      },
      { path: "*", element: <NotFound /> }, // catch-all
    ],
  },
]);
