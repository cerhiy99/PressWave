import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.scss";
import { store } from './store'
import { Provider } from 'react-redux';
import "./utils/i18next"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
