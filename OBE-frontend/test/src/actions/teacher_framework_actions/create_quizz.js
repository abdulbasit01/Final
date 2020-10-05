import axios from "axios";
import {
  GET_Assignment,
  DELETE_Assignment,
  ADD_Assignment,
  GET_Assignment_Detail,
  ADD_Assignment_Detail,
  DELETE_Assignment_Detail,
} from "../types";
import { tokenConfig } from "../auth";
export const getAssignment = () => (dispatch, getState) => {
  //asy request with axios we are making here
  console.log(getState);

  axios
    .get("http://127.0.0.1:8000/api/quizz/", tokenConfig(getState))

    .then((res) => {
      dispatch({
        type: GET_Assignment, //in action we are passing type action.type
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
//delete plo
export const deleteAssignment = (id) => (dispatch, getState) => {
  axios
    .delete("http://localhost:8000/api/quizz/" + id, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_Assignment,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};
//ADD plo
export const addAssignment = (assignment) => (dispatch, getState) => {
  axios
    .post("http://127.0.0.1:8000/api/quizz/", assignment, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_Assignment,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

////// ASSIGNMENT DEATIL

export const getAssignmentDetail = (id) => (dispatch, getState) => {
  console.log(id);
  axios
    .get(`http://127.0.0.1:8000/api/assignment/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_Assignment_Detail, //in action we are passing type action.type
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
//delete plo
export const deleteAssignmentDetail = (id) => (dispatch, getState) => {
  axios
    .delete("http://localhost:8000/api/assignment/" + id, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_Assignment_Detail,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};
//ADD plo
export const addAssignmentDetail = (assignment) => (dispatch, getState) => {
  axios
    .post(
      "http://127.0.0.1:8000/api/assignment/",
      assignment,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: ADD_Assignment_Detail,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
