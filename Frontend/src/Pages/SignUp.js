import React from 'react'
import { useState, useEffect} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom"

function SignUp({ setSignUp }){
  useEffect(() => {
        document.title ="Music Tracker - Sign Up"
    }, [])

    const currentDate = new Date()
    const curDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate()
    const navigate = useNavigate()

    const [uid, setUid] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dateJoined = curDate

    const handleSubmit = (event) => {
        event.preventDefault()
    
        fetch('http://localhost:8081/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, username, password, dateJoined }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.text()
          })
          .then(data => {
            console.log(data)
            alert('Successfully Created User')
            navigate('/')
            // Handle success message
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error)
            alert('Error Creating User')
            // Handle error message
          })
      } 

      useEffect(()=>{
        fetch('http://localhost:8081/signupuser')
        .then(res => res.json())
        .then(uid => setUid(uid))
        .catch(err => console.log(err))
    }, [])

    const toSignIn = () => {
      console.log('clicked me so good')
      setSignUp(false)
    }

    return(
        <div className='App-header login template d-flex justify-content-center align-items-center 100-w vh-100'>
            <div className='form_container p-5 rounded bg-white shadow'>
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center'>Sign Up</h3>
                    <div className='mb-2'>
                        <label style={{fontSize: 25}} htmlFor="email">Username</label>
                        <input type="text" placeholder='Enter Username' className='form-control' name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label style={{fontSize: 25}} htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter Email' className='form-control' disabled/>
                    </div>
                    <div className='mb-2'>
                        <label style={{fontSize: 25}} htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter Password' className='form-control' name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div style={{marginTop: 15}}className='d-grid'>
                        <button className='btn btn-primary' type='submit'>Create Account</button>
                    </div>
                </form>
                <p style={{fontSize: 15, marginTop: 15}} className='text-center'>
                        Already Registered? <Link onClick={toSignIn}>Sign In</Link>
                </p>
            </div>
        </div>
    )
}
export default SignUp