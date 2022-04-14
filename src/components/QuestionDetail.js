import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";
//import Answer component
//import AnswerForm component

const QuestionDetail = ({ selected, url, token}) => {
  const [question, setQuestion] = useState({})
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    axios
      .get(url + `/questions/${selected}`)
      .then((response) => setQuestion(response.data));
  }, [selected, url]);

  const handleChange = (event) => {
      if (event.target.name === 'answer') {
          setAnswer(event.target.value)
      }
  }

  const submitAnswer = async () => {
      return await axios.post(url + `/questions/${selected}/answer/`, {
        "response": answer,
      }, {
        headers: {
            'Authorization': `Token ${token}`,
        }
      })
    
  }

  return (
    <>
      <Question question={question} />
      {/* show answer question form */}
      <div>
        <label htmlFor="Answer">Answer</label>
        <textarea
          placeholder="Answer Away!"
          type="text"
          name="answer"
          value={answer}
          onChange={(e) => handleChange(e)}
        />
        <button className="button" 
        onClick={submitAnswer}
        >Submit</button>
      </div>

      {/* show list of answers */}
      {question.answer_list?.map((answer) => {
        console.log(answer);
        return <div>Hello World</div>;
      })}
    </>
  );
};

export default QuestionDetail;
