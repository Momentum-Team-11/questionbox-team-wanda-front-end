import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import App from "../App";



const Search = ({ token, url}) => {
  const searchTerm = useRef(null)
  const [searchResults, setSearchResults] = useState(null)

  const handleSubmit = (e) => {
      e.preventDefault()
      axios.get(url + `/search?description=${searchTerm.current.value}`,
      {
          headers: {
              Authorization: `Token ${token}`,
          },
      }
      ) 
      .then((response) => setSearchResults(response.data))
  }
  
  return (
    <>
      <form className="section" onSubmit={handleSubmit} >
        <div className="field">
          <label className="label" htmlFor="search">
            search
          </label>
          <div className="control has-icons-left">
            <input className="input"
              type="text"
              id="search"
              className="input is-medium"
              required
              name="search"
              ref={searchTerm}
              
            />
            <span className="icon is-small is-left">
              <i className="fa-solid fa-bird"></i>
            </span>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button" type="submit" className="button is-link">
              Start Search
            </button>
          </div>
        </div>
      </form>
      <div className="container-box">
        {searchResults &&
          searchResults.map((description) => (
            <question
              key={description.pk}
              description={description.question}
            />
          ))}
          </div>
    </> 
  );
}

export default Search;
