import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Navigation = ({ user, login, logout }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>Sleep diary</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          { user &&
            <>
              <LinkContainer to="/settings">
                <Nav.Link>Settings</Nav.Link>
              </LinkContainer>
            </>
          }
        </Nav>
        { !user &&
          <Form inline>
            <FormControl type="text" placeholder="username" className="mr-sm-2" />
            <FormControl type="password" placeholder="password" className="mr-sm-2" />
            <Button onClick={login()}>Login</Button>
          </Form>
        }
        { user &&
          <Form inline>
            <Button onClick={logout()}>Logout { user.userName }</Button>
          </Form>
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation