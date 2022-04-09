import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Question from './components/Question'

const baseURL = 'https://team11-questionbox.herokuapp.com/api'

const App = () => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const getQuestions = async () => { await axios.get(baseURL + '/questions').then(res => setQuestions(res.data)) }
    getQuestions()
  }, [])

  return (
    <div>
      <div>
        <label htmlFor="ask">Ask a question</label>
        <input placeholder="Just ask!" type="text" name="ask" />
      </div>
      {questions.map((question) => {
        return (
          <Question key={question.pk} question={question} />
        )
      })}
    </div>
  );
}

export default App;



















