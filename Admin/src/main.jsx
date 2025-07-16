import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import FarmContextProvider from "./context/FarmContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FarmContextProvider>
      <App />
    </FarmContextProvider>
  </StrictMode>
);
