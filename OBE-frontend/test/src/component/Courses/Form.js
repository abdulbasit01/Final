import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSubject } from "../../actions/subjects";
import { getClos } from "../../actions/clos";
import {withRouter} from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class Courses extends Component {
  //to part of component thats why we create state down there
  state = {
    response:[],
    courses:[],
    value:''
  };
  componentDidMount(){
      fetch('http://localhost:8000/api/teacher')
      .then(res=>res.json())
        .then(response=>{this.setState({
        response
        })
        console.log(this.state.response)
        })
        .catch(error=>console.log(error))
    fetch('http://localhost:8000/api/courses')
        .then(res2=>res2.json())
        .then(response2=>{this.setState({
            courses:response2
        })
        console.log(this.state.courses)
        })
        .catch(error=>console.log(error))
  }
  handleChange=(event)=>{    this.setState({value: event.target.value});  }
  handleSubmit=(event) =>{
    alert(this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <h1>Alot Courses</h1>
            <select className="browser-default custom-select">
                <option selected>Select teacher</option>
                {this.state.response.map((resp)=>
                    <option onClick={()=>{alert(resp.username)}}>
                        {resp.username}
                    </option>
                )}
            </select>
        <h1>Alot Subjects</h1>
            <select className="browser-default custom-select" value={this.state.value} onChange={this.handleChange}>
                <option selected>Select Subjects</option>
                {this.state.courses.map((resp)=>
                    <option value={resp.username}>
                        {resp.username}
                    </option>
                )}
            </select>
                <button className='btn btn-success'
                onClick={()=>{
                    
                }}
                >Map Course</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  clos: state.clos.clos
});

export default connect(mapStateToProps, { addSubject, getClos })(withRouter(Courses));
