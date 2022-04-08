import { useState, useEffect }from "react";
import axios from "axios";
// import { Questions } from "./api/questions/"
import "./App.css";

//need to be able to ask a question and submit
const App = () => {
  const baseURL = "https://team11-questionbox.herokuapp.com/api"
  // const [askQuestion, setAskQuestion] = useState('');
  const [listQuestions, setListQuestions] = useState ([])
  

//i need to display a list of user questions to preview
useEffect (() => {
  //this GET request returns a list of questions
    axios.get(baseURL + "/questions").then((response) => {
      console.log(response)
    });
});


  return (
    <div class="input-field">
      <h1>Just Ask</h1>
      <label htmlFor="text-input">Ask a Question!</label>
      <input 
        placeholder="Type your question here" 
        id="ask a question" 
        class="validate" 
        />
    </div>
  );
};

export default App;
