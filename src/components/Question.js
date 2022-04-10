import React, { useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'

const Question = ({ question, user, url, setSelected }) => {
    const location = useLocation()
    
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
            {/* Go to question detail when user clicks on question title */}
            <Link 
            to={`/questions/${question.pk}`} 
            onClick={() => setSelected(question.pk)}><h2>{question.title}</h2></Link>
            <p>{question.description}</p>
            <p>{question.user}</p>
            {/* need to add created_at */}
            <button onClick={handleDelete}>Delete</button>
            <Link 
            to={`/questions/${question.pk}`} 
            onClick={() => {
                setSelected(question.pk)
                }}>
                    <button 
                    hidden={location.pathname === `/questions/${question.pk}`}>
                    Answer
                    </button>
                    </Link>
        </div>
    )
}

export default Question

