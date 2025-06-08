import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import dayjs from "dayjs";

import "dayjs/locale/th";

import "./index.css";
// import "@fullcalendar/core/index.css";
// import "@fullcalendar/timegrid/index.css";

dayjs.locale("th");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
