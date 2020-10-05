import React from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn, Container } from "mdbreact";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import { Table } from 'reactstrap';
import FileUpload from './FileUpload'
class chairmanRegistration extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    ConfrimPassword: "",
    department: "",
    response:[]
  };
  componentDidMount(){
    fetch('http://localhost:8000/api/chairman/')
    .then(res=>res.json())
    .then(response=>{this.setState({
      response
    })
    console.log(this.state.response)
    })
    .catch(error=>console.log(error))
  }
  submitHandler = (e) => {
    e.preventDefault();
    const {
      password,
      ConfrimPassword,
      email,
      username,
      department,
    } = this.state;
    if (
      password === ConfrimPassword &&
      this.state.email.length > 5 &&
      this.state.password.length >= 7 &&
      this.state.username.length > 4
    ) {
      const newUser = {
        email,
        username,
        password,
        department,
      };
      console.log(newUser);
      this.props.onregister(newUser);
    } else {
      console.log("doesn't meet the requirements");
    }
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Container>
        <form
          className="needs-validation"
          onSubmit={this.submitHandler}
          noValidate
        >
          <h3 style={{ lineHeight: 4 }}> Sign UP Form </h3>{" "}
          <MDBRow>
            <MDBCol xs={"8"} md={"8"}>
              <MDBInput
                value={this.state.username}
                onChange={this.changeHandler}
                label="username"
                type="text"
                name="username"
                required
              ></MDBInput>{" "}
            </MDBCol>
          </MDBRow>{" "}
          <MDBRow>
            <MDBCol xs={"8"} md={"8"}>
              <MDBInput
                value={this.state.email}
                onChange={this.changeHandler}
                type="email"
                name="email"
                label="email"
                required
              ></MDBInput>{" "}
            </MDBCol>
          </MDBRow>{" "}
          <MDBRow>
            <MDBCol xs={"8"} md={"8"}>
              <MDBInput
                value={this.state.department}
                onChange={this.changeHandler}
                type="department"
                name="department"
                label="department"
                required
              ></MDBInput>{" "}
            </MDBCol>
          </MDBRow>{" "}
          <MDBRow>
            <MDBCol xs={"8"} md={"8"}>
              <MDBInput
                value={this.state.password}
                onChange={this.changeHandler}
                type="password"
                name="password"
                label="password"
                required
              ></MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol xs={"8"} md={"8"}>
              <MDBInput
                value={this.state.ConfrimPassword}
                onChange={this.changeHandler}
                type="password"
                name="ConfrimPassword"
                label="password"
                required
              ></MDBInput>{" "}
            </MDBCol>{" "}
          </MDBRow>
          <div className="valid-feedback">All Set </div>
          <MDBBtn color="primary" type="submit" style={{marginRight:'50px'}}>
            Create Account{" "}
          </MDBBtn>
          <FileUpload/>
        </form>
        <br/>
          <h3>Registered Chairman Of Different Departments</h3>

        <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.response.map((resp,id)=>
          
          <tr key={id}>
          <th scope="row" >{id+1}</th>
          <td>{resp.username}</td>
          <td>{resp.email}</td>
          <td>{resp.department}</td>
          <td><button className='btn btn-danger'>Delete</button></td>
        </tr>
        )}
      </tbody>
    </Table>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onregister: (email, username, password, department) =>
      dispatch(actions.register(email, username, password, department)),
  };
};

export default connect(null, mapDispatchToProps)(chairmanRegistration);
