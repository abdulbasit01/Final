import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import DashboardIcon from '../../dashboard.png'
export class Dashboard extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  state={
    Dashboard:false
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  render() {
    const {
      is_admin,
      is_chairman,
      is_depHead,
      is_teacher,
      is_student,
      user,
    } = this.props.auth;

    const AdminLinks = (
      <ul style={{fontSize:'10px'}} className="navbar-nav ml-auto mt-2">
        
          <li className='nav-items'><strong>{user ? `Welcome ${user}` : ""}</strong></li>
        <li className="nav-items">
          <Link to="/admindashboard" className="nav-link">
            Admin Dashbboard
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/chairman" className="nav-link">
            Create Accounts for Chairman
          </Link>
        </li>

        <li className="nav-items">
          <button
            onClick={this.logout.bind(this)}
            className="text-ligth btn btn-warning btn-sm"
          >
            Logout
          </button>
        </li>
      </ul>
    );
    const ChairmanLinks = (
      <React.Fragment>
      <ul style={{fontSize:'10px'}} className="navbar-nav ml-auto mt-2">
        
          <li className='nav-items'><strong>{user ? `Welcome ${user}` : ""}</strong></li>
        <li className="nav-items">
          <Link to="/itmanager" className="nav-link" onClick={()=>{this.setState({
            Dashboard:false
          })}}>
            Create Accounts for IT_Manager
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/mappeo" className="nav-link" onClick={()=>{this.setState({
            Dashboard:false
          })}}>
            MAPPING
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/mapcourses" className="nav-link" onClick={()=>{this.setState({
            Dashboard:false
          })}}>
            Map Courses
          </Link>
        </li>
        
        <li className="nav-items">
          <button
            onClick={this.logout.bind(this)}
            className="text-ligth btn btn-warning btn-sm ml-1"
          >
            Logout
          </button>
        </li>
      </ul>
      <ul>
        <span className="nav-items">
          <Link className="" onClick={()=>{this.setState({
            Dashboard:!this.state.Dashboard
          })}}> 
          <img src={DashboardIcon} width='80px' height='60px'/>
            
          </Link>
        </span>
        {this.state.Dashboard && <li className="nav-items">
          <Link to="/peo" className="nav-link">
            ADD PEO
          </Link>
        </li>}
{this.state.Dashboard &&         <li className="nav-items">
          <Link to="/vision" className="nav-link">
            ADD VISION
          </Link>
        </li>}
        {this.state.Dashboard && <li className="nav-items">
          <Link to="/mission" className="nav-link">
            ADD MISSION
          </Link>
        </li>}

        {this.state.Dashboard && <li className="nav-items">
          <Link to="/plo" className="nav-link">
            ADD PLO
          </Link>
        </li>}
        {this.state.Dashboard && <li className="nav-items">
          <Link to="/cognitive" className="nav-link">
            ADD Cognitive
          </Link>
        </li>}
{this.state.Dashboard &&         <li className="nav-items">
          <Link to="/affective" className="nav-link">
            ADD Affective
          </Link>
        </li>}
{this.state.Dashboard &&         <li className="nav-items">
          <Link to="/psychomotors" className="nav-link">
            ADD Psychomotors
          </Link>
        </li>
}        
{this.state.Dashboard && <li className="nav-items">
          <Link to="/clo" className="nav-link">
            ADD CLO
          </Link>
        </li>}
{this.state.Dashboard &&         <li className="nav-items">
          <Link to="/subject" className="nav-link">
            ADD SUBJECT
          </Link>
        </li>
}
      </ul>
      </React.Fragment>
    );
    const ITManagerLinks = (
      <ul style={{fontSize:'10px'}} className="navbar-nav ml-auto mt-2">
        
          <li className='nav-items'><strong>{user ? `Welcome ${user}` : ""}</strong></li>
        
        <li className="nav-items">
          <Link to="/it_manager" className="nav-link">
            IT_Manager Dashboard
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/teacher" className="nav-link">
            Create Accounts for Teacher
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/student" className="nav-link">
            Create Accounts for Students
          </Link>
        </li>

        <li className="nav-items">
          <button
            onClick={this.logout.bind(this)}
            className="text-ligth btn btn-warning btn-sm"
          >
            Logout
          </button>
        </li>
      </ul>
      
    );
    const TeacherLinks = (
      <ul style={{fontSize:'10px'}} className="navbar-nav ml-auto mt-2">
        
          <li className='nav-items'><strong>{user ? `Welcome ${user}` : ""}</strong></li>
        
        <li className="nav-items">
          <Link to="/teacher" className="nav-link">
            Teacher Dashboard
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/assignedsubjects" className="nav-link">
            View Subject
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/assignments" className="nav-link">
            Assignment List
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/assignmentcreate" className="nav-link">
            Create Assignement
          </Link>
        </li>

        <li className="nav-items">
          <button
            onClick={this.logout.bind(this)}
            className="text-ligth btn btn-warning btn-sm"
          >
            Logout
          </button>
        </li>
      </ul>
    );
    const StudentLinks = (
      <ul style={{fontSize:'10px'}} className="navbar-nav ml-auto mt-2">
        
          <li className='nav-items'><strong>{user ? `Welcome ${user}` : ""}</strong></li>
        
        <li className="nav-items">
          <Link to="/student" className="nav-link">
            Student Dashboard
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/assignments_view" className="nav-link">
            Attempt Assignment
          </Link>
        </li>

        <li className="nav-items">
          <button
            onClick={this.logout.bind(this)}
            className="text-ligth btn btn-warning btn-sm"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul style={{fontSize:'10px'}} className="d-flex justify-content-center ml-auto mt-2" style={{width:"200px !important"}}>
        <li className="list-group-item" style={{textAlign:'center'}}>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="list-group-item" style={{textAlign:'center'}}>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    let links = null;
    if (is_admin) {
      links = AdminLinks;
    } else if (is_chairman) {
      links = ChairmanLinks;
    } else if (is_depHead) {
      links = ITManagerLinks;
    } else if (is_teacher) {
      links = TeacherLinks;
    } else if (is_student) {
      links = StudentLinks;
    } else {
      links = guestLinks;
    }
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="navbar">
            <div className="navbar-inner">
              <div className="container">
                <h1 className="brand">OBE MANAGEMENT SYSTEM</h1>
              </div>
              {links}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateProps, { logout })(Dashboard);
