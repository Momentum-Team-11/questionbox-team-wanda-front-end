import React, { useState } from 'react'
import axios from 'axios'

const Question = ({ question, user, url, setSelected }) => {
    const handleDelete = async () => {
        return await axios.delete(url + `/questions/${question.pk}`, {
            headers: {
                'Authorization': user
            }
        })
    }
    // TODO: We should only be able to delete the question if it belongs to me
    // check that the user is attached to the user deleting a

    return (
        <div>
            <h2><a href="#">{question.title}</a></h2>
            <p>{question.description}</p>
            <p>{question.user}</p>
            {/* need to add created_at */}
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setSelected(question.pk)}>Answer</button>
        </div>
    )
}

export default Question

