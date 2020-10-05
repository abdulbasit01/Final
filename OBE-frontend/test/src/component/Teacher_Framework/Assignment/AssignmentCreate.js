import { Form, Input, Icon, Button, Divider, Select } from "antd";
import React from "react";

import QuestionForm from "./QuestionForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAssigned } from "../../../actions/teacher_framework_actions/viewassignedsubjects";
import * as actions from "../../../actions/teacher_framework_actions/assignment";

const { Option } = Select;

class AssignmentCreate extends React.Component {
  state = {
    formCount: 1,
  };
  static propTypes = {
    assignedsubjects: PropTypes.func.isRequired,
    getAssigned: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log(this.props.getAssigned());
  }
  remove = () => {
    const { formCount } = this.state;
    this.setState({
      formCount: formCount - 1,
    });
  };

  add = () => {
    const { formCount } = this.state;
    this.setState({
      formCount: formCount + 1,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        const question_set = [];

        for (let i in values.question) {
          const choices = [];
          for (let j of values.questions[i].choices) {
            if (j) {
              choices.push({
                choice_text: j,
              });
            }
          }
          question_set.push({
            question_text: values.question[i],
            answer: values.answers[i],
            choice_set: choices,
          });
        }
        const asnt = {
          title: values.title,
          question_set,
        };
        console.log(asnt);
        //this.props.oncreateAssignment(asnt);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const questions = [];
    for (let i = 0; i < this.state.formCount; i += 1) {
      questions.push(
        <div key={i}>
          {questions.length > 0 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={questions.length === 0}
              onClick={() => this.remove()}
            />
          ) : null}
          <QuestionForm id={i} {...this.props} />

          <Divider />
        </div>
      );
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Assignment Create</h1>

        <Form.Item label="Title" hasFeedback>
          {getFieldDecorator(`title`, {
            rules: [{ required: true, message: "Please select Subject" }],
          })(
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Title:">
          {getFieldDecorator(`title`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                message: "Please input title",
              },
            ],
          })(<Input placeholder="Subject Name" />)}
        </Form.Item>
        {questions}
        <Form.Item>
          <Button type="secondary" onClick={this.add} style={{ width: "60%" }}>
            <Icon type="plus" /> Add More Questions
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedAssignmentCreate = Form.create()(AssignmentCreate);

const mapStateToProps = (state) => {
  return {
    username: state.auth.user,
    loading: state.assignments.loading,
    assignedsubjects: state.assignedsubjects.assignedsubjects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    oncreateAssignment: (asnt) => dispatch(actions.createAssignment(asnt)),
    getAssigned,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedAssignmentCreate);
