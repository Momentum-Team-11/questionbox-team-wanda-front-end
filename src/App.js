import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";

import Question from "./components/Question";
import QuestionDetail from "./components/QuestionDetail";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useLocalStorageState('selected', null);
  // We need our app to save the auth token to pass to
  // its children so they can make requests to the API
  const [token, setToken] = useLocalStorageState("token", "");
  const [user, setUser] = useLocalStorageState("user", "");
  const [submitting, setSubmitting] = useState(false);

  const isLoggedIn = user && token ? true : false;
  const baseURL = "https://team11-questionbox.herokuapp.com/api";

  // get a list of questions
  useEffect(() => {
    axios.get(baseURL + "/questions").then((res) => setQuestions(res.data));
  }, [submitting]);

  // You can only submit a question if you are logged in
  // currently our logged in user is hard-coded
  const submitQuestion = async () => {
    return await axios
      .post(
        baseURL + "/questions/",
        {
          title: title,
          description: description,
        },
        {
          headers: {
            // once I get my auth token, I need to set the value
            // of 'Authorization' to `Token ${token}`
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        setSubmitting(true);
        setDescription("");
        setTitle("");
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.name === "title") {
      setTitle(event.target.value);
    }

    if (event.target.name === "description") {
      setDescription(event.target.value);
    }
  };

  return (
    <Router>
      <div>
        <Navbar
          url={baseURL}
          token={token}
          setToken={setToken}
          setUser={setUser}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <div>
                  <label htmlFor="title">Title</label>
                  <input
                    placeholder="Title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="description">Description</label>
                  <input
                    placeholder="Description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <button onClick={submitQuestion}>Submit</button>

                {/* A list of questions */}
                {questions.map((question) => {
                  return (
                    <>
                      <Question
                        key={question.pk}
                        question={question}
                        user={user}
                        url={baseURL}
                        setSelected={setSelected}
                        token={token}
                      />
                    </>
                  );
                })}
              </>
            }
          />
          {/* We need to define a new route for login first! That is what the line below is doing
          Then we need to create the corresponding component in our components folder
          and call it Login.js */}
          <Route
            path="/login"
            element={
              <Login setToken={setToken} url={baseURL} setUser={setUser} />
            }
          />
          <Route
            path="/register"
            element={
              <Register setToken={setToken} url={baseURL} setUser={setUser} />
            }
          />
          <Route
            path="/profile"
            element={<Profile token={token} url={baseURL} user={user} setSelected={setSelected} />}
          />

          <Route
            path={`/questions/${selected}`}
            element={
              <QuestionDetail
                selected={selected}
                url={baseURL}
                user={user}
                token={token}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
