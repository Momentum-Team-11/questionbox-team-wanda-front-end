import React, { useState } from 'react'
import axios from 'axios'

// The first thing you want to do in this file is just return the string 'Login'. 
// Once you verify that it is working in the UI, you can start adding the elements you will need
// in order to grab a user's username and password
const Login = ({ setToken, url }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    console.log('url', url);
    const handleChange = (event) => {
        event.preventDefault()

        if (event.target.name === "username") {
            setUsername(event.target.value)
        }

        if (event.target.name === "password") {
            setPassword(event.target.value)
        }
    }

    const handleLogin = () => {
        // this is where we need to make an axios POST request
        // to the LOGIN endpoint /api/auth/users/login/
        // we need to send the username and password with the request so
        // we can get an authorization token as a reponse
        // we need to add the request URL as the first argument
        axios.post(url + '/auth/users/login/', {
            // this is where we need to send the username and password
            // data from state
            "username": username,
            "password": password,
        })
            .then((response) => {
                // console.log(response) <-- check your response object first
                // once we get an auth token, we need to call setToken and pass 
                // the auth token as an arugment
                // setToken(response.data)
            })


    }
    return (
        <div>
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