import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAssigned } from "../../../actions/teacher_framework_actions/viewassignedsubjects";
export class GET extends Component {
  static propTypes = {
    assignedsubjects: PropTypes.array.isRequired,
    getAssigned: PropTypes.func.isRequired,
  };
  //component load then
  componentDidMount() {
    this.props.getAssigned();
  }
  render() {
    return (
      <Fragment>
        <h2>Assigned Subject</h2>
        <table className="table table-stripped">
          <thead>
            <tr>
              <th>Year</th>
              <th>Calender Year</th>
              <th>Course Code</th>
              <th>Tittle</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.assignedsubjects.map((assignedsubject) => (
              <tr key={assignedsubject.id}>
                {assignedsubject.subjects.map((subject, key) => (
                  <tr key={subject.id}>
                    <td>{subject.year}</td>
                    <td>{subject.calendar_year}</td>
                    <td>{subject.code}</td>
                    <td>{subject.tittle}</td>
                  </tr>
                ))}
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
  assignedsubjects: state.assignedsubjects.assignedsubjects,
});
export default connect(mapStateToProps, { getAssigned })(GET);
