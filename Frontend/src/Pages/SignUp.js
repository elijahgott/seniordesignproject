import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

function SignUp(){
    return(
        <div className='App-header login template d-flex justify-content-center align-items-center 100-w vh-100' style={{backgroundColor: "#bbbbbb"}}>
            <div className='form_container p-5 rounded bg-white shadow'>
                <form>
                    <h3 className='text-center'>Sign Up</h3>
                    <div className='mb-2'>
                        <label style={{fontSize: 25}} htmlFor="email">Username</label>
                        <input type="username" placeholder='Enter Username' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label style={{fontSize: 25}} htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter Email' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label style={{fontSize: 25}} htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter Password' className='form-control' />
                    </div>
                    <div style={{marginTop: 15}}className='d-grid'>
                        <button className='btn btn-primary'>Create Account</button>
                    </div>
                    <p style={{fontSize: 15, marginTop: 15}} className='text-center'>
                        Already Registered? <Link to='/signin'>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default SignUp