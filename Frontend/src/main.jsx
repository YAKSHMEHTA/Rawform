import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import App from "./App.jsx";
import "./index.css";
import Shop from "../Components/Shop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
