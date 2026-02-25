// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Components
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode> {/* TODO: Retirer le "StrictMode" quand on va rendre le projet*/}
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>
);
