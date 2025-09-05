import React from "react";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import "@styles/index.scss";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import { store } from "@app/store";
import { router } from "@layouts/routes";

export const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <React.StrictMode>
      <BrowserRouter basename="/starwars">
        <PrimeReactProvider>
          <Provider store={store}>
            <RouterProvider router={router} />
            {children}
          </Provider>
        </PrimeReactProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
