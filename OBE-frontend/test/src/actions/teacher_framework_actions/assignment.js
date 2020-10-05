import * as actionTypes from "../types";
import { tokenConfig } from "../auth";
import axios from "axios";
const getAssignmentListStart = () => {
  return {
    type: actionTypes.GETASSIGMENTLISTSTART,
  };
};

const getAssignmentListSuccess = (assignments) => {
  return {
    type: actionTypes.GETASSIGMENTLISTSUCCESS,
    assignments,
  };
};

const getAssignmentListFail = (error) => {
  return {
    type: actionTypes.GETASSIGMENTLISTFAIL,
    error: error,
  };
};

export const getAssignement = () => (dispatch, getState) => {
  dispatch(getAssignmentListStart());
  axios
    .get("http://127.0.0.1:8000/api/assignment/", tokenConfig(getState))
    .then((res) => {
      //console.log(res);
      const assignments = res.data;
      //console.log(res.data);
      dispatch(getAssignmentListSuccess(assignments));
    })
    .catch((err) => {
      dispatch(getAssignmentListFail());
    });
};

const getAssignmentDetailStart = () => {
  return {
    type: actionTypes.GETASSIGMENTDETAILSTART,
  };
};

const getAssignmentDetailSuccess = (assignment) => {
  return {
    type: actionTypes.GETASSIGMENTDETAILSUCCESS,
    assignment,
  };
};

const getAssignmentDetailFail = (error) => {
  return {
    type: actionTypes.GETASSIGMENTDETAILFAIL,
    error: error,
  };
};

export const getAssignmentDetail = (id) => (dispatch, getState) => {
  dispatch(getAssignmentDetailStart());
  axios
    .get("http://127.0.0.1:8000/api/assignment/" + id, tokenConfig(getState))
    .then((res) => {
      console.log(res);
      const assignment = res.data;
      console.log(res.data);
      dispatch(getAssignmentDetailSuccess(assignment));
    })
    .catch((err) => {
      dispatch(getAssignmentDetailFail());
    });
};

const createAssignmentStart = () => {
  return {
    type: actionTypes.CREATE_ASSIGMENT_START,
  };
};

const createAssignmentSuccess = (assignment) => {
  return {
    type: actionTypes.CREATE_ASSIGMENT_SUCCESS,
    assignment,
  };
};

const createAssignmentFail = (error) => {
  return {
    type: actionTypes.CREATE_ASSIGMENT_FAIL,
    error: error,
  };
};

export const createAssignment = (asnt) => (dispatch, getState) => {
  dispatch(createAssignmentStart());
  axios
    .post("http://127.0.0.1:8000/api/assignment/", asnt, tokenConfig(getState))
    .then((res) => {
      dispatch(createAssignmentSuccess());
    })
    .catch((err) => {
      dispatch(createAssignmentFail());
    });
};

export const createGradedAssignment = (asnt) => (dispatch, getState) => {
  //dispatch(createAssignmentStart());
  axios
    .post("http://127.0.0.1:8000/api/assignment/", asnt, tokenConfig(getState))
    .then((res) => {
      //  dispatch(createAssignmentSuccess());
    })
    .catch((err) => {
      // dispatch(createAssignmentFail());
    });
};
