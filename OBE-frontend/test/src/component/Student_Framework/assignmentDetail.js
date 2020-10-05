import { Card, Skeleton } from "antd";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/Student_Framework/viewAssignment";
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
    console.log("radio checked", e.target.value);
    const { usersAnswers } = this.state;
    usersAnswers[qId] = e.target.value;
    this.setState({
      usersAnswers,
    });
  };
  render() {
    const { currentAssignment } = this.props;
    console.log(this.props.currentAssignment);
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
                  questions={currentAssignment.question_set.map((q) => {
                    return (
                      <Card
                        style={cardStyle}
                        type="inner"
                        key={q.id}
                        title={`${q.question_text}`}
                      >
                        <Choices
                          questionId={q.order}
                          change={this.onChange}
                          choices={q.choice_set}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetAssignmentDetail: (id) =>
      dispatch(actions.viewgetAssignmentDetail(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDetail);
