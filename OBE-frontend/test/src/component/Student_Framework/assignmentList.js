import { connect } from "react-redux";
import * as actions from "../../actions/Student_Framework/viewAssignment";
import React from "react";
import { Skeleton, List } from "antd";
import { Link } from "react-router-dom";

class assignmentList extends React.PureComponent {
  componentDidMount() {
    this.props.ongetAssignement();
  }

  renderItem(item) {
    return (
      <Link to={`/assignments_view/${item.id}`}>
        <List.Item>{item.title}</List.Item>
      </Link>
    );
  }

  render() {
    console.log(this.props.assignments);

    return (
      <div>
        {this.props.loading ? (
          <Skeleton active />
        ) : (
          <div>
            <h3 orientation="left">Assignment List</h3>
            <List
              size="large"
              bordered
              dataSource={this.props.assignments}
              renderItem={(item) => this.renderItem(item)}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assignments: state.viewassignments.assignments,
    loading: state.assignments.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetAssignement: () => dispatch(actions.viewgetAssignement()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(assignmentList);
