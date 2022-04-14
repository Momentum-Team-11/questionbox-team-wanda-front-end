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
  const [selected, setSelected] = useLocalStorageState("selected", null);
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
    // i put my navbar above the routes component so that the navbar is persistent throuhgout the UI
    <Router> 
      <div stye={{
        marginTop: "30px"
      }}className="container">
        <Navbar
          url={baseURL}
          token={token}
          setToken={setToken}
          setUser={setUser}
          isLoggedIn={isLoggedIn}
        />
        <hr />
        {/* this is where I have defined my routes */}
        <Routes>
          {/* for this first route i wanted to show a list of questions, a small blurb about the app, and give users a way to ask a question */}
          {/* this path below means I want to go to the base URL - which is why i used the / */}
          <Route
            exact
            path="/"
            element={
              <>
                <div
                  id="greeting-container"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "50px",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                    }}
                  >
                    <p
                      style={{
                        marginBottom: "5px",
                        // paddingTop: "75px"
                      }}
                    >
                      Ever wonder how much you should feed your dog per day? Or
                      how many cats is too many cats? Well, <strong>Just Curious</strong> is the
                      community for you! Just ask your question and be amazed at
                      how many others had the same question and how many are
                      ready and willing to share their advice! And while you're here, share some of your own advice! 
                    </p>
                    
                    <h1 style={{
                        marginBottom: "5px",
                      }}><strong>Ask a Question!</strong></h1>
                    <div id="ask-question-form">
                      <div >
                        <label htmlFor="title">Title</label>
                        <input
                          className="input"
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
                          className="input"
                          placeholder="Description"
                          type="text"
                          name="description"
                          value={description}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <button style={{
                        marginTop: 5
                      }}className="button" onClick={submitQuestion}>
                        Submit
                      </button>
                    </div>
                  </div>
                  <div style={{
                    width:"25%",
                    // paddingTop: "75px"
                  }}>
                    <img style={{
                      width:'500px',
                      objectFit: 'cover',
                      marginTop: 10,
                      marginRight: 30
                    }}
                      src="https://media.istockphoto.com/photos/pug-puppy-dog-sitting-in-front-of-blackboard-sign-with-hand-drawn-picture-id690005604?k=20&m=690005604&s=612x612&w=0&h=kaIr03zwaIoJzyhxauIX7IF81uVV1Nr3gpspYiT2eUc="
                      width="100%"
                      alt="img"

                    />
                  </div>
                </div>

                {/* A list of questions */}
                <div className="box columns is-multiline is-mobile"
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  {questions.map((question) => {
                    return (
                      <div className=" column is-half">
                      <Question
                        key={question.pk}
                        question={question}
                        user={user}
                        url={baseURL}
                        setSelected={setSelected}
                        token={token}
                      /></div>
                    );
                  })}
                </div>
              </>
            }
          />
          {/* this route below takes us to the login page and you will notice the path is /login which means I either have to manually type in /login in the url or i can click the login button which will send us to the login page and the url will change for us - go to base page and login*/}
          <Route
            path="/login"
            element={
              <Login setToken={setToken} url={baseURL} setUser={setUser} />
            }
          />
          {/* will need to type in the register path manually in the url as i did not have time to create a button */}
          <Route
            path="/register"
            element={
              <Register setToken={setToken} url={baseURL} setUser={setUser} />
            }
          />
          {/* will need to type in the profile path manually in the url as i did not have time to create a button */}
          <Route
            path="/profile"
            element={
              <Profile
                token={token}
                url={baseURL}
                user={user}
                setSelected={setSelected}
              />
            }
          />
          {/* this route below is for clicking on a question detail. this path is taking in the pk of the question because the question detail component needs to make an axios request and needs that information. you may have also noticed that all the the components I'm rendering at each route takes specific tokens like below. both register and login are making a request to the api for a token so that's why they have the props of setToken instead of the actual token */}
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
