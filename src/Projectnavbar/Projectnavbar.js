import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './ProjectNavbarStyles.css';

function ProjectNavbar() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src="/images/globallogo.jpeg"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link as={NavLink} to="/home" className="nav-link" activeClassName="active">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/about" className="nav-link" activeClassName="active">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/donors" className="nav-link" activeClassName="active">Donors</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/recipients" className="nav-link" activeClassName="active">Recipients</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/settings" className="nav-link" activeClassName="active">Volunteers</Nav.Link>
            </Nav.Item>
          </Nav>
          <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={toggleSearchBar} />
        </Navbar.Collapse>
      </Container>
      {showSearchBar && (
        <div className="search-bar-popup">
          <Container>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
            </Form>
          </Container>
        </div>
      )}
    </Navbar>
  );
}

export default ProjectNavbar;
