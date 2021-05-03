import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import Logo from "../Assets/Images/logo.png";
import { authetication } from '../App'
import "../Assets/Style/navbar.css";

class Navbar extends React.Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const back = {
      background: "#F0F2F0",
      background:
        "-webkit-linear-gradient(to right, #000C40, #F0F2F0)" /* Chrome 10-25, Safari 5.1-6 */,
      background: "linear-gradient(to right, #000C40, #F0F2F0)",
    };
    return (
      <Router>
        <MDBNavbar color="indigo" dark expand="md" style={back}>
          <MDBNavbarBrand>
            <img
              src={Logo}
              alt="logo"
              style={{ width: "100px", height: "100px" }}
            />
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav
              right
              style={{
                color:"#fff",
                fontSize: "22px",
                fontWeight: "bold",
                fontFamily: "Sansita Swashed",
                marginLeft: "10px",
              }}
            >
              <MDBNavItem active>
                <a style={{textDecoration:'None', color:"#fff"}} href="/home">{this.props.home}</a>
              </MDBNavItem>
              <MDBNavItem>
                {/* <MDBNavLink to={"/login"}>{this.props.login}</MDBNavLink> */}
                <a style={{textDecoration:'None', color:"#fff"}} href="/login">{this.props.login}</a>
              </MDBNavItem>
              <MDBNavItem>
                {/* <MDBNavLink to={"/register"}>{this.props.signup}</MDBNavLink> */}
                <a style={{textDecoration:'None', color:"#fff"}} href="/register">{this.props.signup}</a>
              </MDBNavItem>
              <MDBNavItem>
                <a style={{textDecoration:'None', color:"#fff"}} href="#sales">Sales Forecast</a>
              </MDBNavItem>
            </MDBNavbarNav>
            {/* <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav> */}
          </MDBCollapse>
        </MDBNavbar>
      </Router>
    );
  }
}

export default Navbar;
