import React from "react";
import { List, Typography, Divider } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getAssignment,
  deleteAssignment,
} from "../../../actions/teacher_framework_actions/create_quizz";
import { Link } from "react-router-dom";

class AsignmentList extends React.PureComponent {
  static propTypes = {
    assignments: PropTypes.array.isRequired,
    getAssignment: PropTypes.func.isRequired,
    deleteAssignment: PropTypes.func.isRequired,
  };
  //component load then
  componentDidMount() {
    this.props.getAssignment();
  }

  renderItem(item) {
    return (
      <Link to="/assignments/1">
        <List.Item>{item.title}</List.Item>
      </Link>
    );
  }

  render() {
    return (
      <div>
        <Divider orientation="left">Assignment List</Divider>
        <List
          size="large"
          bordered
          dataSource={this.props.assignments}
          renderItem={(item) => this.renderItem(item)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assignments: state.assignments.assignments,
});
export default connect(mapStateToProps, { getAssignment, deleteAssignment })(
  AsignmentList
);
