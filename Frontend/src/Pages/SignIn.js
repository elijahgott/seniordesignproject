import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

function SignIn(){

    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/signin', {username, password})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    return(
        <div className='login template d-flex justify-content-center align-items-center 100-w vh-100' style={{backgroundColor: "#bbbbbb"}}>
            <div className='form_container p-5 rounded bg-white'>
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center'>Sign In</h3>
                    <div className='mb-2'>
                        <label htmlFor="username">Username</label>
                        <input type="username" placeholder='Enter Username' className='form-control' id="email" onChange={u => setUsername(u.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter Password' className='form-control' id="password" onChange={p => setPassword(p.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <input type='checkbox' className='custom-control custom-checkbox' id='check' />
                        <label htmlFor='check' className='custom-input-label ms-2'>Remember Me</label>
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-primary'>Sign In</button>
                    </div>
                    <p className='text-center'>
                        <Link to='#forgot' className='m-2'>Forgot Password?</Link>           
                        <Link to='/signup'>Sign Up</Link>    
                    </p>
                </form>
            </div>
        </div>
    )
}
export default SignIn