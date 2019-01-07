import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { Badge } from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";
import { Auth } from "aws-amplify";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      pendingTasks: 2
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);
    
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <LinkContainer to="/">
              <NavItem className="NavItemLogo">
                <img 
                  className="Logo"
                  alt="logo"
                  src="https://user-images.githubusercontent.com/17755587/50741651-b6319900-11b4-11e9-85b1-7224911ca670.png"
                />
              </NavItem>
           </LinkContainer>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <Fragment>
                    <LinkContainer to="/badges">
                      <NavItem>
                        badges
                      </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/tasks">
                      <NavItem>tasks <Badge className="TaskBadge">{this.state.pendingTasks}</Badge>
                      </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/accounts">
                      <NavItem>accounts</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                      <NavItem>profile</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/settings">
                      <NavItem>settings</NavItem>
                    </LinkContainer>
                    <NavItem onClick={this.handleLogout}>logout</NavItem> 
                  </Fragment>
                : <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>login</NavItem>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
