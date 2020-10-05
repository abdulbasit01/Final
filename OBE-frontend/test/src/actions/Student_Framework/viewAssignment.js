import * as actionTypes from "../types";
import { tokenConfig } from "../auth";
import axios from "axios";
const viewgetAssignmentListStart = () => {
  return {
    type: actionTypes.VIEWGETASSIGMENTLISTSTART,
  };
};

const viewgetAssignmentListSuccess = (assignments) => {
  return {
    type: actionTypes.VIEWGETASSIGMENTLISTSUCCESS,
    assignments,
  };
};

const viewgetAssignmentListFail = (error) => {
  return {
    type: actionTypes.VIEWGETASSIGMENTLISTFAIL,
    error: error,
  };
};

export const viewgetAssignement = () => (dispatch, getState) => {
  dispatch(viewgetAssignmentListStart());
  axios
    .get("http://127.0.0.1:8000/api/assignment_view/", tokenConfig(getState))
    .then((res) => {
      console.log(res);
      const assignments = res.data[0].assignment;
      //console.log(assignments);
      console.log(assignments);
      dispatch(viewgetAssignmentListSuccess(assignments));
    })
    .catch((err) => {
      dispatch(viewgetAssignmentListFail());
    });
};

const viewgetAssignmentDetailStart = () => {
  return {
    type: actionTypes.VIEWGETASSIGMENTDETAILSTART,
  };
};

const viewgetAssignmentDetailSuccess = (assignment) => {
  return {
    type: actionTypes.VIEWGETASSIGMENTDETAILSUCCESS,
    assignment,
  };
};

const viewgetAssignmentDetailFail = (error) => {
  return {
    type: actionTypes.VIEWGETASSIGMENTDETAILFAIL,
    error: error,
  };
};

export const viewgetAssignmentDetail = (id) => (dispatch, getState) => {
  dispatch(viewgetAssignmentDetailStart());
  axios
    .get("http://127.0.0.1:8000/api/assignment/" + id, tokenConfig(getState))
    .then((res) => {
      console.log(res);
      const assignment = res.data;
      console.log(res.data);
      dispatch(viewgetAssignmentDetailSuccess(assignment));
    })
    .catch((err) => {
      dispatch(viewgetAssignmentDetailFail());
    });
};
