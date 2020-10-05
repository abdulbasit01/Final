import { GET_ASSIGNED_SUBJECT } from "../../actions/types";

const intialState = {
  assignedsubjects: [],
};

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_ASSIGNED_SUBJECT:
      return {
        ...state,
        assignedsubjects: action.payload,
      };

    default:
      return state;
  }
}
