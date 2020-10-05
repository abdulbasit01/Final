import React, { Component } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addAssignment } from "../../../actions/teacher_framework_actions/create_quizz";
import { getAssigned } from "../../../actions/teacher_framework_actions/viewassignedsubjects";
import Select from "react-select";
import PostChoices from "./postchoices";
export class Postquestions extends Component {
  state = {
    subject_name: null,
    question_set: [],
    clos: null,
    choices_set: [],
    answer: null,
  };
  static propTypes = {
    assignedsubjects: PropTypes.func.isRequired,
    getAssigned: PropTypes.func.isRequired,
    addAssignment: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.getAssigned();
  }
  onChangesubjects = (selected) => {
    if (selected.value === null) {
      this.setState({
        subject_name: null,
      });
    } else {
      this.setState({
        subject_name: selected,
      });
    }
  };
  onChangeclos = (selected) => {
    //console.log(selected);
    this.setState({
      clos: selected,
    });
  };
  clooptions = () => {
    if (this.state.subject_name === null) {
      //console.log(null);
      return null;
    }
    let clooptions = [];
    if (this.state.subject_name !== null) {
      for (let i in this.props.assignedsubjects) {
        if (
          this.state.subject_name.value === this.props.assignedsubjects[i].id
        ) {
          for (let i in this.props.assignedsubjects[0].subjects[0].clos) {
            clooptions.push({
              value: this.props.assignedsubjects[0].subjects[0].clos[i].id,
              label: this.props.assignedsubjects[0].subjects[0].clos[i]
                .full_discription,
            });
          }
        }
      }
    }

    //console.log(clooptions);
    return clooptions;
  };

  submitwithchoice = (values) => {
    console.log("From Post question------", values);

    this.setState((prevState) => ({
      ...prevState,
      question_set: [{ ...prevState.question_set, values }],
    }));
  };

  choicesChange = (e) => {
    console.log(e.target, e.target.value, e.target.name);

    const newChoices = this.state.choices_set;

    newChoices[e.target.name] = e.target.value;

    this.setState((prevState) => ({
      ...prevState,
      choices_set: newChoices,
    }));
  };

  removeChoice = (id) => {
    const newChoices = this.state.choices_set;

    newChoices.splice(id, 1);

    this.setState({ choices_set: newChoices });
  };

  onChangeAnswer = (selected) => {
    this.setState({
      answer: selected,
    });
  };

  answerOptions = () => {
    if (this.state.choices_set.length === 0) {
      return null;
    }
    let ansOptions = [];
    for (let i in this.state.choices_set) {
      ansOptions.push({
        value: this.state.choices_set[i],
        label: this.state.choices_set[i],
      });
    }

    return ansOptions;
  };

  render() {
    console.log("Question", this.state.question_set);
    console.log("Choices", this.state.choices_set);
    let optionsubjects = [];
    if (
      this.props.assignedsubjects.length > 0 &&
      this.props.assignedsubjects[0].subjects.length > 0
    ) {
      // console.log(true, this.props.assignedsubjects[0].subjects);
      for (let i in this.props.assignedsubjects[0].subjects) {
        optionsubjects.push({
          value: this.props.assignedsubjects[0].subjects[i].id,
          label: this.props.assignedsubjects[0].subjects[i].tittle,
        });
      }
    }
    console.log(optionsubjects);
    const rules = [{ required: true }];

    const onFinish = (values) => {
      console.log("Received values of form:", values);
      this.props.questionSubmit(values);
    };

    const onFinishChoices = (choices) => {
      console.log("Received values of form:", choices);
      this.props.ChoicesSubmit(choices);
    };

    return (
      <Form onFinish={onFinish} className="my-form">
        <Form.Item
          name={["subject_name"]}
          fieldKey={["subject_name"]}
          rules={rules}
        >
          <Select onChange={this.onChangesubjects} options={optionsubjects} />
        </Form.Item>
        <Form.List name="question_set">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row key={field.key}>
                    <Col>
                      <Form.Item
                        name={[field.name, "label"]}
                        fieldKey={[field.fieldKey, "label"]}
                        rules={rules}
                      >
                        <Input placeholder="Enter Question" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        name={[field.name, "clo"]}
                        fieldKey={[field.fieldKey, "clo"]}
                        rules={rules}
                      >
                        <Select
                          onChange={this.onChangeclos}
                          options={this.clooptions()}
                        />
                      </Form.Item>
                    </Col>

                    <Col>
                      {/* <PostChoices ChoicesSubmit={this.submitwithchoice} /> */}
                      <Form onFinish={onFinishChoices} className="my-form">
                        <Form.List name="choice_set">
                          {(fields, { add, remove }) => {
                            return (
                              <div>
                                {fields.map((field, index) => (
                                  <Row key={field.key}>
                                    <Col>
                                      <Form.Item
                                        name={[field.name, "label"]}
                                        fieldKey={[field.fieldKey, "label"]}
                                        rules={rules}
                                      >
                                        <Input
                                          placeholder="Enter Choices"
                                          name={field.name}
                                          onChange={this.choicesChange}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col flex="none">
                                      <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => {
                                          remove(field.name);
                                          this.removeChoice(field.name);
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                ))}
                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={() => {
                                      add();
                                    }}
                                    style={{ width: "100%" }}
                                  >
                                    <PlusOutlined /> Add Choices
                                  </Button>
                                </Form.Item>
                                <Form.Item
                                  name={[field.name, "label"]}
                                  fieldKey={[field.fieldKey, "label"]}
                                  rules={rules}
                                >
                                  <Select
                                    onChange={this.onChangeAnswer}
                                    options={this.answerOptions()}
                                    isDisabled={
                                      this.state.choices_set.length === 0
                                    }
                                  />
                                </Form.Item>
                              </div>
                            );
                          }}
                        </Form.List>

                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                    <Col flex="none">
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: "100%" }}
                  >
                    <PlusOutlined /> Add Questions
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  assignedsubjects: state.assignedsubjects.assignedsubjects,
});

export default connect(mapStateToProps, {
  addAssignment,
  getAssigned,
})(Postquestions);
