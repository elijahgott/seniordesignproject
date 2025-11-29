import React, {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

import MyNav from "./MyComponents/MyNav";

import userService from './services/users'

function App() {
  const navigate = useNavigate()
    const [token, setToken] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const handleSignIn = (user) => {
      setToken(user.token)
      setCurrentUser(user)
    }

    const handleSignOut = () => { 
      setToken(null)
      setCurrentUser(null)
      window.localStorage.removeItem('loggedInMusicAppUser')
      navigate('/')
    }

    // get currently logged in user
    useEffect(() => {
      const fetchUser = async () => {
        const loggedInUserJSON = window.localStorage.getItem('loggedInMusicAppUser')
        if(loggedInUserJSON){
          const userWithToken = JSON.parse(loggedInUserJSON)
          const user = await userService.getOne(userWithToken.id)
          setCurrentUser(user)
        }
      }
      fetchUser()
    }, [])

  return !currentUser ? (<SignIn onSignIn={handleSignIn} />)
    :
  (
    <>
      <MyNav currentUser={currentUser} handleSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser}/>} />
        <Route path="/new" element={<New currentUser={currentUser} />} />
        <Route path="/albums" element={<Albums currentUser={currentUser} />} />
        <Route path="/artists" element={<Artists currentUser={currentUser}/>} />
        <Route path="/about" element={<About currentUser={currentUser}/>} />
        <Route path="/profile" element={<Profile currentUser={currentUser}/>} />
        <Route path="/lists" element={<UserLists currentUser={currentUser}/>} />
        <Route path="/friends" element={<Friends currentUser={currentUser}/>} />
        <Route path="/settings" element={<Settings currentUser={currentUser}/>} />
        <Route path="/createpost" element={<CreatePost currentUser={currentUser}/>}/>
        <Route path="/addartist" element={<AddArtist currentUser={currentUser}/>}/>
        <Route path="/addalbum" element={<AddAlbum currentUser={currentUser}/>}/>
        <Route path="/searchresults" element={<SearchResults currentUser={currentUser}/>} />
      </Routes>
    </>
    
  );
}

export default App;

/* seniordesignproject/Frontend -> npm start */
/* seniordesignproject/Backend-> npm start */
