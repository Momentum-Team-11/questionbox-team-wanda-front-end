import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Question from './Question'

const QuestionDetail = ( { selected, url } ) => {
    const [question, setQuestion] = useState({})
    useEffect(()  => {
        axios.get(url + `/questions/${selected}`)
        .then((response) => setQuestion(response.data))

        console.log(question)
    }, [selected, url])
    
    return (
        <Question question={question }
         />

    )
}

export default QuestionDetail