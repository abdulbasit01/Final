import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PEC from '../../PEC.png'

import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import {withRouter} from 'react-router-dom'
export class Login extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    loader:false
  };

  static propsTypes = {
    //login action
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login(
      this.state.username,
      this.state.password,
      this.state.email
    );
      this.setState({
        loader:true
      })
      setTimeout(() => {
        this.setState({
          loader:false
        })
      }, 2000);
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });
  render() {
    //redirect after login
    if (
      this.props.auth.is_admin ||
      this.props.auth.is_chairman ||
      this.props.auth.is_depHead ||
      this.props.auth.is_teacher ||
      this.props.auth.is_student
    ) {
      return <Redirect to="/" />;
    }
    const { username, password, email } = this.state;
    return (
      <div className='d-flex justify-content-center'>
        <img src={PEC} width='300' height='300' className='m-auto'/>
        <div className="col-md-6 m-auto">
          <div className="card card-body mt-5">
            <h2 className="text-center">Login</h2>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Enter email</label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  onChange={this.onChange}
                  value={username}
                ></input>
              </div>
              <div className="form-group">
                <label>Enter Username</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  onChange={this.onChange}
                  value={email}
                ></input>
              </div>

              <div className="form-group">
                <label>Enter Password</label>
                <input
                  className="form-control"
                  type="text"
                  name="password"
                  onChange={this.onChange}
                  value={password}
                ></input>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  {!this.state.loader ? "Login" :
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>}
                </button>
                <div>
                  <p>
                    Dont have an account?
                    <Link to="/register">Register</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateProps = state => ({
  auth: state.auth
});
export default connect(mapStateProps, { login })(withRouter(Login));
