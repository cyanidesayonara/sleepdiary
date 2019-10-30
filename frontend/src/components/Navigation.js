import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <LinkContainer to="/">
<<<<<<< HEAD
        <Navbar.Brand>Sleep diary</Navbar.Brand>
=======
        <Navbar.Brand>LOGO</Navbar.Brand>
>>>>>>> Add react-router & react-router-bootstrap
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/settings">
            <Nav.Link>Settings</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation