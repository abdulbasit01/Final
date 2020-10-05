import * as actionTypes from "../../actions/types";
import { updateObject } from "../../store/utility";
const initalState = {
  assignments: [],

  error: null,
  loading: false,
};

const viewgetAssignmentListStart = (state, action) => {
  return updateObject(state, { error: null, loading: false });
};

const viewgetAssignmentListSuccess = (state, action) => {
  return updateObject(state, {
    assignments: action.assignments,
  });
};

const viewgetAssignmentListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const viewgetAssignmentDetailStart = (state, action) => {
  return updateObject(state, { error: null, loading: false });
};

const viewgetAssignmentDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentAssignment: action.assignment,
  });
};

const viewgetAssignmentDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};
const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.VIEWGETASSIGMENTLISTSTART:
      return viewgetAssignmentListStart(state, action);
    case actionTypes.VIEWGETASSIGMENTLISTSUCCESS:
      return viewgetAssignmentListSuccess(state, action);
    case actionTypes.VIEWGETASSIGMENTLISTFAIL:
      return viewgetAssignmentListFail(state, action);

    case actionTypes.VIEWGETASSIGMENTDETAILSTART:
      return viewgetAssignmentDetailStart(state, action);
    case actionTypes.VIEWGETASSIGMENTDETAILSUCCESS:
      return viewgetAssignmentDetailSuccess(state, action);
    case actionTypes.VIEWGETASSIGMENTDETAILFAIL:
      return viewgetAssignmentDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;
