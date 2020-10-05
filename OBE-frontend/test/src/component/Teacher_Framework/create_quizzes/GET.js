import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getAssignment,
  deleteAssignment,
} from "../../../actions/teacher_framework_actions/create_quizz";
export class GET extends Component {
  static propTypes = {
    assignments: PropTypes.array.isRequired,
    getAssignment: PropTypes.func.isRequired,
    deleteAssignment: PropTypes.func.isRequired,
  };
  //component load then
  componentDidMount() {
    this.props.getAssignment();
  }

  render() {
    return (
      <Fragment>
        <h2>Affective Domain (feelings, attitudes)</h2>
        <table className="table table-stripped">
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Questions</th>
              <th>Choices</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {this.props.assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.subject_name}</td>
                <td>
                  {assignment.question_set.map((question, key) => (
                    <div key={question.id}>{question.question_text}</div>
                  ))}
                </td>
                <td>
                  <button
                    onClick={this.props.deleteAssignment.bind(
                      this,
                      assignment.id
                    )}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

//state of redux
const mapStateToProps = (state) => ({
  assignments: state.assignments.assignments,
});
export default connect(mapStateToProps, { getAssignment, deleteAssignment })(
  GET
);

/**************************************************************************************************
  Data Representation
[
{
"id": 9,
"subject_name": "computer",
"question_set": [
{
"question_text": "Who is the most likable    character in GOT?",
"clos": {
"id": 1,
"code": "CLO-2",
"description": "clo",
"verb": "hello",
"owner": 2,
"plos": [
1
],
"cognitives": [
2
],
"psychomotors": [],
"affectives": []
},
"choice_set": [
{
"choice_text": "Jon Snow"
},
{
"choice_text": "Arya Stark"
}
]
}
]
}
]


*/
