import React, {useEffect, useState} from "react";
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
import AddArtist from "./Pages/AddArtist";
import AddAlbum from "./Pages/AddAlbum";
import CreatePost from "./Pages/CreatePost";
import SearchResults from "./Pages/SearchResults";

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App() {
    const [token, setToken] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      const fetchUser = async () => {
        const loggedInUserJSON = window.localStorage.getItem('musicTrackerUser')
        if(loggedInUserJSON){
          setCurrentUser(JSON.parse(loggedInUserJSON))
        }
      }
      fetchUser()
    }, [])

    const handleSignIn = (newToken, user) => {
      setToken(newToken);
      setCurrentUser(user);
      // window.localStorage.setItem('musicTrackerUser', JSON.stringify(user))
    }

    const handleSignOut = () => {
      window.localStorage.removeItem('musicTrackerUser')
      setToken(null);
      setCurrentUser(null);
    }

  return (
    <Routes>
      <Route path="/signin" element={<SignIn onSignIn={handleSignIn}/>} />
      <Route path="/" element={<Home currentUser={currentUser}  onSignOut={handleSignOut}/>} />
      <Route path="/new" element={<New currentUser={currentUser} onSignOut={handleSignOut} />} />
      <Route path="/albums" element={<Albums currentUser={currentUser} onSignOut={handleSignOut} />} />
      <Route path="/artists" element={<Artists currentUser={currentUser} onSignOut={handleSignOut} />} />
      <Route path="/about" element={<About currentUser={currentUser} onSignOut={handleSignOut} />} />
      <Route path="/profile" element={<Profile currentUser={currentUser} onSignOut={handleSignOut} />} />
      <Route path="/lists" element={<UserLists currentUser={currentUser} onSignOut={handleSignOut} />} />
      <Route path="/friends" element={<Friends currentUser={currentUser} onSignOut={handleSignOut}/>} />
      <Route path="/settings" element={<Settings currentUser={currentUser} onSignOut={handleSignOut}/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/createpost" element={<CreatePost currentUser={currentUser} onSignOut={handleSignOut}/>}/>
      <Route path="/addartist" element={<AddArtist currentUser={currentUser} onSignOut={handleSignOut}/>}/>
      <Route path="/addalbum" element={<AddAlbum currentUser={currentUser} onSignOut={handleSignOut}/>}/>
      <Route path="/searchresults" element={<SearchResults currentUser={currentUser} onSignOut={handleSignOut}/>} />
    </Routes>
  );
}

export default App;

/* seniordesignproject/Frontend -> npm start */
/* seniordesignproject/Backend-> npm start */
