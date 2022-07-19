import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home /> }/>
          <Route path="/contact" element={<Contact /> }/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
