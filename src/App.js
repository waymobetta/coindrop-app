import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { Badge } from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Routes from './Routes'
import './App.css'
import { Auth } from 'aws-amplify'
// import { getTasks } from './util/api'
import TasksModule from './util/Tasks'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: '1e0cf398-b729-4a9c-9d26-0260ac6acb90',
      isAuthenticated: false,
      isAuthenticating: true,
      pendingTasks: 0
    }
  }

  async componentWillMount () {
    try {
      // throws client undefined error
      // const tasksResp = await getTasks()

      const currentUser = await Auth.currentAuthenticatedUser()

      const jwt = currentUser.signInUserSession.accessToken.jwtToken

      const tasksResp = await TasksModule.getTasksForUser(this.state.userID, jwt)

      this.setState({
        pendingTasks: tasksResp.tasks.length
      })
    } catch (err) {
      if (err.message) {
        console.error(err.message)
      }
    }
  }

  async componentDidMount () {
    try {
      await Auth.currentSession()
      this.userHasAuthenticated(true)
    } catch (e) {
      if (e !== 'No current user') {
        console.log('not logged in')
      }
    }

    this.setState({ isAuthenticating: false })
  }

  userHasAuthenticated (authenticated) {
    this.setState({ isAuthenticated: authenticated })
  }

  async handleLogout (event) {
    await Auth.signOut()

    this.userHasAuthenticated(false)

    this.props.history.push('/login')
  }

  render () {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated.bind(this)
    }

    return (
      !this.state.isAuthenticating &&
      <div
        align='center'
        className='App container'>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <LinkContainer to='/'>
              <NavItem className='NavItemLogo'>
                <img
                  className='Logo'
                  alt='logo'
                  src='https://user-images.githubusercontent.com/17755587/50741651-b6319900-11b4-11e9-85b1-7224911ca670.png'
                />
              </NavItem>
            </LinkContainer>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <Fragment>
                  <LinkContainer to='/projects'>
                    <NavItem>
                      Projects
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to='/badges'>
                    <NavItem>
                        Badges
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to='/tasks'>
                    <NavItem>Tasks <Badge className='TaskBadge'>{this.state.pendingTasks}</Badge>
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to='/accounts'>
                    <NavItem>Accounts</NavItem>
                  </LinkContainer>
                  <LinkContainer to='/profile'>
                    <NavItem>Profile</NavItem>
                  </LinkContainer>
                  <LinkContainer to='/settings'>
                    <NavItem>Settings</NavItem>
                  </LinkContainer>
                  <NavItem onClick={event => this.handleLogout(event)}>Logout</NavItem>
                </Fragment>
                : <Fragment>
                  <LinkContainer to='/signup'>
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    )
  }
}

export default withRouter(App)
