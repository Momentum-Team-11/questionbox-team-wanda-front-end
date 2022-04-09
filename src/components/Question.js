import React, { useState } from 'react'
import axios from 'axios'

const Question = ({ question, user, url }) => {
    const handleDelete = async () => {
        return await axios.delete(url + `/questions/${question.pk}`, {
            headers: {
                'Authorization': user
            }
        })
    }

    return (
        <div>
            <h2><a href="#">{question.title}</a></h2>
            <p>{question.description}</p>
            <p>{question.user}</p>
            {/* need to add created_at */}
            <button onClick={handleDelete}>Delete</button>
            <button>Answer</button>
        </div>
    )
}

export default Question

