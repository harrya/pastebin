import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Text from "./components/Text";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="text/:textId" element={<Text />} />
        <Route path="404" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
