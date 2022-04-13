import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./Question";

const Profile = ({ user, token, url, setSelected }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

//   hardcoding random questions  - backend endpoint not working

  const RANDOM_QUESTIONS = [
    'What is your favorite color?',
    'What gifts do you like?',
    'What do you think the meaning of life is?'
]


const randNum = Math.floor(Math.random() * RANDOM_QUESTIONS.length)

  useEffect(() => {
    axios
      .get(url + "/myquestions/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setQuestions(response.data);
      });

    axios
      .get(url + "/myanswers/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setAnswers(response.data);
      });
  }, []);

  console.log(questions, answers);

  return (
      <>
      <div>
          {questions?.map((question) => {
              return <Question question={question} user={user} setSelected={setSelected} />
          })}
      </div>

      <div>
          {answers?.map ((answer, idx) => {
              return (
                  <div>
                      <h1>Question: {RANDOM_QUESTIONS[randNum - idx]}</h1>
                    <p>Response: {answer.response}</p>
                    <p>{answer.created_at}</p>
                    <p>Likes: {answer.favorited.length}</p>
                  </div>
              )
})}
      </div>
      </>
  );
};

export default Profile;
