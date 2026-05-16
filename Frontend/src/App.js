import React, {useEffect, useState} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

import Notification from "./MyComponents/Notification";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Albums from "./Pages/Albums";
import Artists from "./Pages/Artists";
import Profile from "./Pages/Profile";
import UserLists from "./Pages/UserLists";
import Friends from "./Pages/Friends";
import Settings from "./Pages/Settings";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import SearchResults from "./Pages/SearchResults";

import {Routes, Route} from "react-router-dom";

function App() {
    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState(null);

    const fetchUser = async () => {
        const loggedInUserJSON = window.localStorage.getItem('musicTrackerUser')
        const parsedUser = JSON.parse(loggedInUserJSON)
        if(parsedUser){
          fetch(`/api/users/${parsedUser.id}`)
          .then(res => res.json())
          .then(user => {
            setCurrentUser(user)
        })
          .catch(err => setNotification('Failed to sign in.', 'error'));
        }
      }
    useEffect(() => {
      fetchUser()
    }, [])

    const handleSignIn = (newToken, user) => {
      setCurrentUser(user);
      setNotification('Signed in!', 'success')
    }

    const handleSignOut = () => {
      window.localStorage.removeItem('musicTrackerUser')
      setCurrentUser(null);
      navigate('/signin')
      setNotification('Signed out.', 'success')
    }

    const [notificationVisible, setNotificationVisible] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationType, setNotificationType] = useState('')

    const setNotification = (message, type) => {
      setNotificationVisible(true)
      setNotificationMessage(message)
      setNotificationType(type)

      setTimeout(() => {
        setNotificationVisible(false)
        setNotificationMessage('')
        setNotificationType('')
      }, 4000)
    }

  return (
    <>
    <Notification visible={notificationVisible} message={notificationMessage} type={notificationType} />
      <Routes>
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} setNotification={setNotification} />} />
        <Route path="/" element={<Home currentUser={currentUser} onSignOut={handleSignOut} setNotification={setNotification} />} />
        <Route path="/albums" element={<Albums currentUser={currentUser} onSignOut={handleSignOut} fetchUser={fetchUser} setNotification={setNotification} />} />
        <Route path="/artists" element={<Artists currentUser={currentUser} onSignOut={handleSignOut} setNotification={setNotification} />} />
        <Route path="/about" element={<About currentUser={currentUser} onSignOut={handleSignOut} />} />
        <Route path="/profile" element={<Profile currentUser={currentUser} onSignOut={handleSignOut} fetchUser={fetchUser} />} />
        <Route path="/lists" element={<UserLists currentUser={currentUser} onSignOut={handleSignOut} />} />
        <Route path="/friends" element={<Friends currentUser={currentUser} onSignOut={handleSignOut}/>} />
        <Route path="/settings" element={<Settings currentUser={currentUser} onSignOut={handleSignOut} setNotification={setNotification} /> } />
        <Route path="/signup" element={<SignUp setCurrentUser={setCurrentUser} />} />
        <Route path="/searchresults" element={<SearchResults currentUser={currentUser} onSignOut={handleSignOut}/>} />
      </Routes>
    </>
    
  );
}

export default App;

/* seniordesignproject/Frontend -> npm start */
/* seniordesignproject/Backend-> npm start */
