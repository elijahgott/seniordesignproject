import React, { useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Pages/Home";
import About from "./Pages/About";
import Albums from "./Pages/Albums";
import Artists from "./Pages/Artists";
import Profile from "./Pages/Profile";
import UserLists from "./Pages/UserLists";
import Friends from "./Pages/Friends";
import New from "./Pages/New";
import Settings from "./Pages/Settings";

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
      <Route path="/new" element={<New />} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/lists" element={<UserLists />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;

/* seniordesignproject/Frontend -> npm start */
/* seniordesignproject/Backend-> npm start */
