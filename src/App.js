import { useState }from "react";
import "./App.css";

//need to be able to ask a question and submit
const App = () => {
  const [askQuestion, setAskQuestion] = useState('')
  const handleChange = (e) => {
//here is where i want to update the state of askQuestion
    setAskQuestion(e.target.value)
  }



  return (
    <div class="input-field">
      <h1>Just Ask</h1>
      <label htmlFor="text-input">Ask a Question!</label>
      <input 
        placeholder="Type your question here" 
        id="ask a question" 
        class="validate" 
        onChange={handleChange}
        />
    </div>
  );
};

export default App;
