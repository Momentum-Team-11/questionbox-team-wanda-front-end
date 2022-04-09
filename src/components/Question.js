import React, { useState } from 'react'

const Question = ({ question }) => {
    return (
        <div>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
            <p>{question.user}</p>
            {/* need to add created_at */}
        </div>
    )
}

export default Question

