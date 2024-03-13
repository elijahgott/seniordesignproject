import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

function SignUp(){
    return(
        <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-secondary'>
            <div className='form_container p-5 rounded bg-white'>
                <form>
                    <h3 className='text-center'>Sign Up</h3>
                    <div className='mb-2'>
                        <label htmlFor="email">Username</label>
                        <input type="username" placeholder='Enter Username' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter Email' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter Password' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <input type='checkbox' className='custom-control custom-checkbox' id='check' />
                        <label htmlFor='check' className='custom-input-label ms-2'>Remember Me</label>
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-primary'>Create Account</button>
                    </div>
                    <p className='text-center'>
                        Already Registered? <Link to='/signin'>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default SignUp