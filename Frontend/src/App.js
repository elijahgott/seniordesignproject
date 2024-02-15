import React, { useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Pages/Home";
import About from "./Pages/About";
import Albums from "./Pages/Albums";
import Artists from "./Pages/Artists";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;

      /*
      <MyNav />
      <Home />
      <About />
      */


/* seniordesignproject/Frontend -> npm start */

