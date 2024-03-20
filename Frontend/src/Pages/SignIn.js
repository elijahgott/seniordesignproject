import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

function SignIn(){
    
    var accounts = [
        {
            username: "elijah",
            password: "12345"
        },
        {
            username: "josh",
            password: "12345"
        }
    ]

    function handleSignIn(){
        //var username = document.getElementById("username").value
        //var password = document.getElementById("password").value
        var username = "elijah"
        var password = "12345"

        for(var i = 0; i < accounts.length; i++){
            if((username == accounts[i].username) && (password == accounts[i].password)){
                console.log(username + " is logged in.")
                return
            }
        }
        console.log("Username and/or password do not match.")
    }

    return(
        <div className='login template d-flex justify-content-center align-items-center 100-w vh-100' style={{backgroundColor: "#bbbbbb"}}>
            <div className='form_container p-5 rounded bg-white'>
                <form>
                    <h3 className='text-center'>Sign In</h3>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter Email' className='form-control' id="email"/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter Password' className='form-control' id="password" />
                    </div>
                    <div className='mb-2'>
                        <input type='checkbox' className='custom-control custom-checkbox' id='check' />
                        <label htmlFor='check' className='custom-input-label ms-2'>Remember Me</label>
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-primary' onClick={handleSignIn()}>Sign In</button>
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