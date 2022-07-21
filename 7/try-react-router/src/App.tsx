import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ScreenA from "./views/ScreenA";
import ScreenB from "./views/ScreenB";

function App() {
  return (
      <BrowserRouter>

          <Routes>
              <Route path="/" element={<ScreenA />} />
              <Route path="/b" element={<ScreenB />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
