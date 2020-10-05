import * as actionTypes from "../../actions/types";
import { updateObject } from "../../store/utility";
const initalState = {
  assignments: [],
  currentAssignment: {},
  error: null,
  loading: false,
};

const getAssignmentListStart = (state, action) => {
  return updateObject(state, { error: null, loading: false });
};

const getAssignmentListSuccess = (state, action) => {
  return updateObject(state, {
    assignments: action.assignments,
  });
};

const getAssignmentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const getAssignmentDetailStart = (state, action) => {
  return updateObject(state, { error: null, loading: false });
};

const getAssignmentDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentAssignment: action.assignment,
  });
};

const getAssignmentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const createAssignmentStart = (state, action) => {
  return updateObject(state, { error: null, loading: false });
};

const createAssignmentSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
  });
};

const createAssignmentFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.GETASSIGMENTLISTSTART:
      return getAssignmentListStart(state, action);
    case actionTypes.GETASSIGMENTLISTSUCCESS:
      return getAssignmentListSuccess(state, action);
    case actionTypes.GETASSIGMENTLISTFAIL:
      return getAssignmentListFail(state, action);
    case actionTypes.GETASSIGMENTDETAILSTART:
      return getAssignmentDetailStart(state, action);
    case actionTypes.GETASSIGMENTDETAILSUCCESS:
      return getAssignmentDetailSuccess(state, action);
    case actionTypes.GETASSIGMENTDETAILFAIL:
      return getAssignmentDetailFail(state, action);
    case actionTypes.CREATE_ASSIGMENT_START:
      return createAssignmentStart(state, action);
    case actionTypes.CREATE_ASSIGMENT_SUCCESS:
      return createAssignmentSuccess(state, action);
    case actionTypes.CREATE_ASSIGMENT_FAIL:
      return createAssignmentFail(state, action);
    default:
      return state;
  }
};

export default reducer;
