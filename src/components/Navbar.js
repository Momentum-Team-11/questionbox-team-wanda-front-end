import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ url, token, setToken, setUser, isLoggedIn, }) => {
  const handleLogout = async () => {
    return await axios
      .post(url + "/auth/token/logout/", {}, {
        headers: {
          'Authorization': `Token ${token}`
        },
      })
      .then((response) => {
        setToken("");
        setUser("");
      });
  };

  return (
    <nav>
      <h1>Just Curious...</h1>
      <input placeholder="search by question, topic or person" type="text" />
      <button>Submit</button>
      {/* {check isLoggedIn to render either redirect  the login component or make a request to log  out} */}

      {isLoggedIn ? (
        
        <Link to={"/"} onClick={handleLogout}>Logout</Link>
      ) : (

        <Link to={"/login"}>Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
