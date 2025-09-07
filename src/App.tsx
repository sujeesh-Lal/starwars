import React from "react";
import { RouterProvider } from "react-router-dom";
import "@styles/index.scss";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import { store } from "@app/store";
import { router } from "@layouts/routes";
import { ErrorBoundary } from "@shared/components/ErrorBoundary";

export const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <React.StrictMode>
      <PrimeReactProvider>
        <ErrorBoundary fallback={<div>Error fallback UI!</div>}>
          <Provider store={store}>
            <RouterProvider router={router} />
            {children}
          </Provider>
        </ErrorBoundary>
      </PrimeReactProvider>
    </React.StrictMode>
  );
};

export default App;
