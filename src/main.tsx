import React from "react";
import ReactDOM from "react-dom/client";
// import { RouterProvider } from 'react-router-dom';
import "@styles/index.scss";
// import { Provider } from 'react-redux';
import { PrimeReactProvider } from "primereact/api";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      {/* <Provider store={store}>
        <RouterProvider router={router} />
      </Provider > */}
      <App></App>
    </PrimeReactProvider>
  </React.StrictMode>,
);
