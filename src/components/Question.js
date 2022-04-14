import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Question = ({ question, user, url, setSelected, token }) => {
  const location = useLocation();

  const handleDelete = async () => {
    return await axios.delete(url + `/questions/${question.pk}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  };

  console.log("user, user");
  console.log();
  // TODO: I should only be able to delete the question if it belongs to me
  // check that the user is attached to the user deleting a

  return (
    <div  style={{
        width: "50%",
        marginBottom: "15px",
        padding: "10px"
    }}className="card ">
      {/* <figure class="image is-4by3"></figure> */}
      {/* Go to question detail when user clicks on question title */}
      <Link
        to={`/questions/${question.pk}`}
        onClick={() => setSelected(question.pk)}
      >
        <h2 className="title">{question.title}</h2>
      </Link>
      <p>{question.description}</p>
      <p>{question.user}</p>
      {/* need to add created_at */}
      <footer className="card-footer">
        <button 
          className="button button is-primary"
          href="#"
          class="card-footer-item"
          onClick={handleDelete}
          disabled={user !== question.user}
          hidden={location.pathname === `/questions/${question.pk}`}
        >
          Delete
        </button>
        <Link
          to={`/questions/${question.pk}`}
          onClick={() => {
            setSelected(question.pk);
          }}
        >
          <button 
            className="button button card-footer-item"
            
            hidden={
              location.pathname === `/questions/${question.pk}` ||
              location.pathname === `/profile`
            }
          >
            Answer
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default Question;
