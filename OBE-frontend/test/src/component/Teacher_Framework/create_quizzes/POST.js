import React, { Component } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addAssignment } from "../../../actions/teacher_framework_actions/create_quizz";
import { getAssigned } from "../../../actions/teacher_framework_actions/viewassignedsubjects";
import Postquestions from "./postquestions";
export class POST extends Component {
  state = {
    subject_name: null,
    question_set: [],
    label: "",
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
    console.log(selected);
    this.setState({
      subject_name: selected,
    });
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });
  onSubmit = (e) => {
    e.preventDefault();
    const { subject_name, question_set } = this.state;
    const quizz = {
      subject_name,
      question_set,
    };

    console.log(quizz);
    //this.props.addClos(clo);
  };

  quesSubmit = (values) => {
    console.log("Received values of form in POST:", values);

    const { subject_name } = this.state;
    const quizz = {
      subject_name,
    };

    console.log(subject_name, values);
  };

  render() {
    //console.log(this.verbsoptions());
    //console.log(this.state.subject_name);
    const rules = [{ required: true }];
    console.log(this.props.assignedsubjects);
    const { subject_name } = this.state;

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
    return (
      <div>
        <h1>CREATE QUIZZ</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Subject Name</label>
            <Select
              value={subject_name}
              onChange={this.onChangesubjects}
              options={optionsubjects}
            />
          </div>
          <Postquestions questionSubmit={this.quesSubmit} />

          {/* <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div> */}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assignedsubjects: state.assignedsubjects.assignedsubjects,
});

export default connect(mapStateToProps, {
  addAssignment,
  getAssigned,
})(POST);

/**
 * POST LIKE THIS
 * 
* {   
"subject_name":"computer",
"question_set":
     [{
            "clos":1,	
         "question_text": "Who is the most likable character in GOT?",
         "answer":select
       "choice_set": [
                  {"id":1,"choice_text": "Jon Snow"},
                  {"id":2, "choice_text": "Arya Stark"}
                ]
              }]
               
                }
* 
 * 
 *
 * 
 * 
 */
