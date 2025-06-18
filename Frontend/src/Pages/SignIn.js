import React from 'react';
import { useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";

function SignIn( {onSignIn} ){
  useEffect(() => {
          document.title ="Music Tracker - Sign In"
      }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch('http://localhost:8081/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          setMessage(data.message);
          if(data.token){
            onSignIn(data.token, data.user);
            navigate('/');
          }
          //console.log(data.user.username, data.user.uid);

        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          setMessage('Error signing in');
        }
      };

    return(
        <div>
            <div className='App-header login template d-flex justify-content-center align-items-center 100-w vh-100'>
                <div className='form_container p-5 rounded bg-white shadow'>
                    <form onSubmit={handleSubmit}>
                        <h3 className='text-center'>Sign In</h3>
                        <div className='mb-2'>
                            <label style={{fontSize: 25}} htmlFor="username">Username</label>
                            <input type="text" placeholder='Enter Username' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        </div>
                        <div className='mb-2'>
                            <label style={{fontSize: 25}} htmlFor="password">Password</label>
                            <input type="password" placeholder='Enter Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className='mb-2'>
                            <input type='checkbox' className='custom-control custom-checkbox' id='check' disabled/>
                            <label style={{fontSize: 18}} htmlFor='check' className='custom-input-label ms-2'>Remember Me</label>
                        </div>
                        <div className='d-grid'>
                            <button className='btn btn-primary' type='submit'>Sign In</button>
                        </div>
                        <p className='text-center'>
                            <Link to='#forgot' style={{fontSize: 15, textDecoration: "underline"}} className='m-2'>Forgot Password?</Link>           
                            <Link to='/signup' style={{fontSize: 15, textDecoration: "underline"}}>Sign Up</Link>    
                        </p>
                    </form>
                    <p className='text-center'>{message}</p>
                </div>
            </div>
        </div>
    )
}
export default SignIn;