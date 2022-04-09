import React, { useState } from 'react'

const Question = ({ question }) => {
    return (
        <div>
            <h2><a href="#">{question.title}</a></h2>
            <p>{question.description}</p>
            <p>{question.user}</p>
            {/* need to add created_at */}
            <button>Delete</button>
            <button>Answer</button>
        </div>
    )
}

export default Question

