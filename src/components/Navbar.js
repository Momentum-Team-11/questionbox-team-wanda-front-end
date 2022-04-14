import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ url, token, setToken, setUser, isLoggedIn }) => {

    const handleLogout = async () => {
        return await axios.post(url + '/auth/token/logout/', {}, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            setToken('')
            setUser('')
        })
    }

    return (
        <nav
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: "15px"
            }}
        >
            <h1 className="title" style={{ fontSize: '75px', fontFamily: "Yeseva One", margin:0 }}>Just Curious...</h1>
            <p style={{
                fontWeight: 100,
            }}
            className="title">An 'Ask A Question' Forum </p>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%'
            }}>
                <div style={{
                    display: 'flex',
                }}>
                    <input style={{
                width: '250px',
            }}className="input" placeholder="search by topic, question or person" type="text" />
                    <button className="button is-primary">Submit</button>
                </div>
                {/* Check isLoggedIn to either redirect us to the login 
            component or make a request to log us out */}
                {isLoggedIn
                    ?
                    (<Link
                        to={"/"}
                        onClick={handleLogout}
                    >
                        Logout
                    </Link>)
                    :
                    (<Link to={"/login"}>Login</Link>)}
            </div>
        </nav >
    )
}

export default Navbar;