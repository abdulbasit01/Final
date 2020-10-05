import axios from "axios";
import { GET_ASSIGNED_SUBJECT } from "../types";
import { tokenConfig } from "../auth";
export const getAssigned = () => (dispatch, getState) => {
  //asy request with axios we are making here
  console.log(getState);
  axios
    .get("http://127.0.0.1:8000/api/assigned/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ASSIGNED_SUBJECT, //in action we are passing type action.type
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
