//This is my helper file !!
//this is where I'm going to put all of my axios requests
import axios from "axios"

const baseURL = "https://team11-questionbox.herokuapp.com/api";

//this GET request returns a list of questions
export const getQuestions = axios.get(baseURL + "/questions").then((response) => response.data)

