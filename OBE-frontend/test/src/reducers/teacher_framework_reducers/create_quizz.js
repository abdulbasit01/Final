import {
  GET_Assignment,
  ADD_Assignment,
  DELETE_Assignment,
  GET_Assignment_Detail,
  ADD_Assignment_Detail,
  DELETE_Assignment_Detail,
} from "../../actions/types";

const intialState = {
  assignments: [],
  currentAssignment: {},
};

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_Assignment:
      return {
        ...state,
        assignments: action.payload,
      };

    case DELETE_Assignment:
      return {
        ...state,
        assignments: state.assignments.filter(
          (assignment) => assignment.id !== action.payload
        ),
      };
    case ADD_Assignment:
      return {
        ...state,
        assignments: [...state.assignments, action.payload],
      };
    case GET_Assignment_Detail:
      return {
        ...state,
        currentAssignment: action.payload,
      };

    case ADD_Assignment_Detail:
      return {
        ...state,
        currentAssignment: [...state.assignments, action.payload],
      };

    default:
      return state;
  }
}
