import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Register = ({ setToken, url, setUser}) => {
    const location = useLocation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (event) => {
        event.preventDefault()

        if (event.target.name === "username") {
            setUsername(event.target.value)
        }

        if (event.target.name === "password") {
            setPassword(event.target.value)
        }
    }

    const handleRegister = () => {
        axios.post(url + '/auth/users/', {
            "username": username,
            "password": password,
        })
            .then((response) => {
                console.log(response)
                axios
                .post(url + "/auth/token/login/", {
                   
                  username: username,
                  password: password,
                })
                .then((response) => {
                  console.log(response);
                  setToken(response.data.auth_token)
                  setUser(username)
                  window.location.pathname = "/"
                  location.pathname= "/"
  
                });
            
          

            })


    }
    return (
        <div className="box">
            <label>Username</label>
            <input className="input" type="text" placeholder='username' value={username} name="username" onChange={(event) => handleChange(event)} />
            <label>Password</label>
            <input className="input" type="text" placeholder='password' value={password} name="password" onChange={(event) => handleChange(event)} />
            <button style={{
            marginTop:5
        }} className="button" onClick={handleRegister}>Submit</button>
        </div>
    )
}

export default Register















