import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSubject } from "../../actions/subjects";
import { getClos } from "../../actions/clos";
import {withRouter} from 'react-router-dom';
import { Table } from 'reactstrap';


export class Courses extends Component {
  //to part of component thats why we create state down there
  state = {
    response:[],
    courses:[],
    value:'',
    result:"",
    value_t:""
  };
  componentDidMount(){
      fetch('http://localhost:8000/api/te-chairman')
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
        fetch('http://localhost:8000/api/coursesassign')
    .then(res=>res.json())
    .then(response=>{this.setState({
      result:response
    })
    console.log(this.state.result)
    })
    .catch(error=>console.log(error))
  }
  handleChange=(event)=>{    this.setState({value: event.target.value});  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <h1>Alot Courses</h1>
            <select className="browser-default custom-select" name={this.state.value_t} value={this.state.value_t} onChange={this.handleChange}>
                <option selected>Select teacher</option>
                {this.state.response.map((resp)=>
                    <option onClick={()=>{alert(resp.username)}}>
                        {resp.username}
                    </option>
                )}
            </select>
        <h1>Alot Subjects</h1>
            <select className="browser-default custom-select" name={this.state.value} value={this.state.value} onChange={this.handleChange}>
                <option selected>Select Subjects</option>
                {this.state.courses.map((resp)=>
                    <option value={resp.username}>
                        {resp.username}
                    </option>
                )}
            </select>
            <br/>
                <button className='btn btn-success'
                onClick={()=>{
                  fetch('http://localhost:8000/api/coursesassign/', {
                    method: 'POST',
                    body: JSON.stringify({
                      teacher_name:this.state.value_t,
                      subjects:this.state.value
                    }),
                  })
                    .then((response) => response.json())
                    .then((json) => console.log(json))
                }}
                >Map Course</button>
        </form>
        <br/>
        <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Techer</th>
          <th>Subject</th>
          
        </tr>
      </thead>
      <tbody>
        {this.state.result.map((resp,id)=>
          
          <tr key={id}>
          <th scope="row" >{id+1}</th>
          <td>{resp.teacher_name}</td>
          <td>{resp.subjects}</td>
          <td><button className='btn btn-danger'>Delete</button></td>
        </tr>
        )}
      </tbody>
    </Table>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  clos: state.clos.clos
});

export default connect(mapStateToProps, { addSubject, getClos })(withRouter(Courses));
