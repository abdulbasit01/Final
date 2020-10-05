import { Card, Skeleton, message } from "antd";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/teacher_framework_actions/assignment";
import Questions from "./Questions";
import Choices from "./Choices";

const cardStyle = {
  marginTop: "20px",
  marginBottom: "20px",
};

class AssignmentDetail extends React.PureComponent {
  state = {
    usersAnswers: {},
  };

  componentDidMount() {
    this.props.ongetAssignmentDetail(this.props.match.params.id);
  }
  onChange = (e, qId) => {
    const { usersAnswers } = this.state;
    usersAnswers[qId] = e.target.value;
    this.setState({ usersAnswers });
  };

  //    how to post
  //    "response_set": [
  //     {   "question":1,
  //         "answer_text": "Jon Snow"
  //     },
  //     {    "question":2,
  //         "answer_text": "Arya Stark"
  //     }
  // ]
  //    how is shoiwng on console
  //    answers:
  //    2: "24"
  //    3: "Yes"

  handleSubmit() {
    message.success("Submitting your assignment!");
    const { usersAnswers } = this.state;
    const asnt = {
      username: this.props.username,
      asntId: this.props.currentAssignment.id,
      response_set: usersAnswers,
    };
    console.log(asnt);
    //this.props.createGradedASNT(asnt);
  }

  render() {
    const { currentAssignment } = this.props;
    const { title } = currentAssignment;
    const { usersAnswers } = this.state;
    return (
      <div>
        {Object.keys(currentAssignment).length > 0 ? (
          <div>
            {this.props.loading ? (
              <Skeleton active />
            ) : (
              <Card title={title}>
                <Questions
                  submit={() => this.handleSubmit()}
                  questions={currentAssignment.question_set.map((q) => {
                    return (
                      <Card
                        style={cardStyle}
                        type="inner"
                        key={q.id}
                        title={`${q.question_text}`}
                      >
                        <Choices
                          questionId={q.id}
                          choices={q.choice_set}
                          change={this.onChange}
                          usersAnswers={usersAnswers}
                        />
                      </Card>
                    );
                  })}
                />
              </Card>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentAssignment: state.assignments.currentAssignment,
    loading: state.assignments.loading,
    // username: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetAssignmentDetail: (id) => dispatch(actions.getAssignmentDetail(id)),
    oncreateGradedAssignement: (asnt) =>
      dispatch(actions.createGradedAssignment(asnt)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDetail);
