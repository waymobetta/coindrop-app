import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { Badge } from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Routes from './Routes'
import './App.css'
import { Auth } from 'aws-amplify'
import { getTasks } from './util/api'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      pendingTasks: 0
    }
  }

  async componentWillMount () {
    try {
      const tasksResp = await getTasks()

      this.setState({
        pendingTasks: tasksResp.length
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
                  <LinkContainer to='/badges'>
                    <NavItem>
                        badges
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to='/tasks'>
                    <NavItem>tasks <Badge className='TaskBadge'>{this.state.pendingTasks}</Badge>
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to='/accounts'>
                    <NavItem>accounts</NavItem>
                  </LinkContainer>
                  <LinkContainer to='/profile'>
                    <NavItem>profile</NavItem>
                  </LinkContainer>
                  <LinkContainer to='/settings'>
                    <NavItem>settings</NavItem>
                  </LinkContainer>
                  <NavItem onClick={event => this.handleLogout(event)}>logout</NavItem>
                </Fragment>
                : <Fragment>
                  <LinkContainer to='/signup'>
                    <NavItem>signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <NavItem>login</NavItem>
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
