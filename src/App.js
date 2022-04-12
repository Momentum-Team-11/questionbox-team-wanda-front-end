import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'

import Question from './components/Question'
import QuestionDetail from './components/QuestionDetail'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Search from './components/Search';

const baseURL = 'https://team11-questionbox.herokuapp.com/api'
const loggedInUser = 'Token 05228d5a7a473ec8f942305f6b5f344987271a96'

const App = () => {
  // const [name, setName] = useLocalStorage("name", '')
  const [questions, setQuestions] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selected, setSelected] = useState(null)
  // I need my app to save the auth token to pass to
  // its children so they can make requests to the API
  const [token, setToken] = useState('')


  // get a list of questions
  useEffect(() => {
    axios.get(baseURL + '/questions').then(res => setQuestions(res.data))
  }, [])


  // I can only submit a question if I am logged in
  // currently my logged in user is hard-coded
  const submitQuestion = async () => {
    return await axios.post(baseURL + '/questions/', {
      "title": title,
      "description": description
    }, {
      headers: {
        // once I get my auth token, I need to set the value
        // of 'Authorization' to `Token ${token}`
        'Authorization': `Token ${token}`,
      }
    })
  }

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.name === 'title') {
      setTitle(event.target.value)
    }

    if (event.target.name === 'description') {
      setDescription(event.target.value)
    }
  }


return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route path="search" element={<Search token={token} />} />
          <Route exact path="/" element={
            <>
              <div>
                <label htmlFor="title">Title</label>
                <input
                  placeholder="Title"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => { handleChange(e) }} />
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <input
                  placeholder="Description"
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => handleChange(e)} />
              </div>
              <button onClick={submitQuestion}>Submit</button>

              {/* A list of questions */}
              {questions.map((question) => {
                return (
                  <>
                    <Question
                      key={question.pk}
                      question={question}
                      user={loggedInUser}
                      url={baseURL}
                      setSelected={setSelected}
                    />
                  </>
                )
              })}
            </>
          } />
          {/* I need to define a new route for login first! That is what the line below is doing
          Then I need to create the corresponding component in my components folder
          and call it Login.js */}
          <Route path="/login" element={<Login setToken={setToken} url={baseURL} />} />
          <Route path={`/questions/${selected}`} element={
            < QuestionDetail
              selected={selected}
              url={baseURL}
              user={loggedInUser}
            />
          } />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
