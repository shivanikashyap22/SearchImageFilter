import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import CanvasPage from "./components/CanvasPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/canvas" element={<CanvasPage />} />
      </Routes>
    </Router>
  );
};

export default App;
