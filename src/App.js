import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./conponent/Header";
import HomePage from "./page/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/header" element={<HomePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
