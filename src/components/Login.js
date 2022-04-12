import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// The first thing I want to do in this file is just return the string 'Login'. 
// Once I verify that it is working in the UI, I can start adding the elements I will need
// in order to grab a user's username and password
const Login = ({ setToken, url, isLoggedIn }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    console.log('url', url);
    const handleChange = (event) => {
        event.preventDefault()
        setError('')
        if (event.target.name === "username") {
            setUsername(event.target.value)
        }

        if (event.target.name === "password") {
            setPassword(event.target.value)
        }
    }

    const handleLogin = () => {
        // this is where I need to make an axios POST request
        // to the LOGIN endpoint /api/auth/users/login/
        // I need to send the username and password with the request so
        // I can get an authorization token as a reponse
        // I need to add the request URL as the first argument
        axios.post(url + '/api/auth/users/login/', {
            // this is where we need to send the username and password
            // data from state
            "username": username,
            "password": password,
        })
            .then((response) => {
                // console.log(response) <-- check my response object first
                // once I get an auth token, I need to call setToken and pass 
                // the auth token as an arugment
                setToken(response.data.auth_token)
            })
            
            .catch((e) => setError(e.message));

            if (isLoggedIn) {
                return navigate('/')
            }


    }
    return (
        <div>
            <h1>Login</h1>
            <label>Username</label>
            <input 
            type="text" 
            placeholder='username' 
            value={username} name="username" 
            onChange={(event) => handleChange(event)} />
            <label>Password</label>
            <input 
            type="text" 
            placeholder='password' 
            value={password} 
            name="password" 
            onChange={(event) => handleChange(event)} />
            <button onClick={handleLogin}>Submit</button>
        </div>
    )
}

export default Login