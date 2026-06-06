import { StrictMode } from "react";
import React,{useEffect} from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import App from "./App.jsx";
import Contact from "../Components/Contact.jsx";
import About from "../Components/About.jsx";
import './App.css'
import "./index.css";
import Shop from "../Components/Shop.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
