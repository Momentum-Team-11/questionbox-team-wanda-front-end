import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Question from './Components/Question'

const baseURL = 'https://team11-questionbox.herokuapp.com/api'
const loggedInUser = 'Token 392dbed88909b8014eb15a806220691b2015f316'

const App = () => {
  const [questions, setQuestions] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const getQuestions = async () => { await axios.get(baseURL + '/questions').then(res => setQuestions(res.data)) }
    getQuestions()
  }, [])

  const submitQuestion = async () => {
    return await axios.post(baseURL + '/questions/', {
      "title": title,
      "description": description
    }, {
      headers: {
        'Authorization': loggedInUser,
      }
    })
  }



//handleChange function takes event as param and sets the input
  const handleChange = (event) => {

    if (event.target.name === 'title') {
      console.log('title input changed!')
      setTitle(event.target.value)
    }

    if (event.target.name === 'description') {
      console.log('description input changed!')
      setDescription(event.target.value)
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="title">Title</label>
        <input
          placeholder="Title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => handleChange(e)} />
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

      {/* list of questions */}
      {questions.map((question) => {
        return (
          <Question 
          key={question.pk} 
          question={question}
          user={loggedInUser}
          url={baseURL} 
          />
        )
      })}
    </div>
  );
}

export default App;





















