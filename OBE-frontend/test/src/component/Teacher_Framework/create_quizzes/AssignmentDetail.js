import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Card } from "antd";
import { getAssignmentDetail } from "../../../actions/teacher_framework_actions/create_quizz";
import PropTypes from "prop-types";
import Questions from "./Questions";
import Choices from "./Choices";
class AssignmentDetail extends React.Component {
  state = {
    usersAnswers: {},
  };
  static propTypes = {
    currentAssignment: PropTypes.array.isRequired,
    getAssignmentDetail: PropTypes.func.isRequired,
  };
  //component load then
  componentDidMount() {
    this.props.getAssignmentDetail(this.props.match.params.id);
    // console.log(this.props.getAssignmentDetail());
    console.log(this.props.match.params);
  }
  onChange = (e, qId) => {
    console.log("radio checked", e.target.value);
    const { usersAnswers } = this.state;
    usersAnswers[qId] = e.target.value;
    this.setState({
      usersAnswers,
    });
  };
  render() {
    const { currentAssignment } = this.props;
    const { title } = this.props.currentAssignment;
    console.log(this.props.currentAssignment);
    const { usersAnswers } = this.state;
    return (
      //below will show the assignement tittle
      //if the current assignement from the props have more than one key inside it then return stuff otherwise null
      <div>
        {Object.keys(currentAssignment).length > 0 ? (
          <Card title={title}>
            <Questions
              questions={currentAssignment.questions.map((q) => {
                return (
                  <Card
                    type="inner"
                    key={q.id}
                    title={`${q.order}.${q.question}`}
                  >
                    <Choices
                      questionId={q.order}
                      choices={q.choioces}
                      change={this.onChange}
                      usersAnswers={usersAnswers}
                    />
                  </Card>
                );
              })}
            />
          </Card>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentAssignment: state.assignments.currentAssignment,
});
export default connect(mapStateToProps, { getAssignmentDetail })(
  AssignmentDetail
);
