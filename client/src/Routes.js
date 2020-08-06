import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import "./style.css";

import { axiosInstance } from "./components/service/axiosApi";

import Dashboard from "./components/dashboard/dashboard";

import { Nav, Navbar } from "react-bootstrap";

import PrivateRoute from "./components/route/PrivateRoute";

import PublicRoute from "./components/route/PublicRoute";

class Routes extends Component {
  state = {
    elem: localStorage.getItem("token"),
    user: localStorage.getItem("user"),
  };

  handleLogout = (event) => {
    try {
      localStorage.removeItem("token");
      axiosInstance.defaults.headers["x-auth-token"] = null;
      localStorage.removeItem("user");
      localStorage.removeItem("id");
      localStorage.removeItem("survey");
      window.location.href = "/";
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        {!this.state.elem ? (
          <Navbar className="modal-header">
            <Navbar.Brand href="/">Survey</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
            </Navbar.Collapse>
          </Navbar>
        ) : (
          <Navbar className="modal-header">
            <Navbar.Brand href="/">Survey</Navbar.Brand>
            {/* <Nav className="mr-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>
            <Navbar.Toggle /> */}
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <b>{this.state.user}</b>
              </Navbar.Text>
              <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
            </Navbar.Collapse>
          </Navbar>
        )}
        <main>
          <BrowserRouter>
            <Switch>
              <PublicRoute
                restricted={true}
                exact
                path={"/login"}
                component={Login}
              />
              <PublicRoute
                restricted={true}
                exact
                path={"/signup"}
                component={Signup}
              />
              <PrivateRoute exact path={"/dashboard"} component={Dashboard} />
              <PublicRoute restricted={true} path={"/"} component={Login} />
            </Switch>
          </BrowserRouter>
        </main>
      </div>
    );
  }
}

export default Routes;
