import React, {useState} from "react";
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
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import { isSignedIn } from "./Pages/SignIn";
import CreatePost from "./Pages/CreatePost";

let currentUser = {
  user: "elijah",
  uid: 1
};
//if user is signed in, change currentUser.user to username
//if user is not signed in, currentUser.user can remain ANONYMOUS



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
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/createpost" element={<CreatePost/>}/>
    </Routes>
  );
}

export default App;
export {currentUser};

/* seniordesignproject/Frontend -> npm start */
/* seniordesignproject/Backend-> npm start */
