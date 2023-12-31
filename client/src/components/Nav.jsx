import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import ChatComponent from '../utils/ChatComponent';

function NavBar() {
  const currentPage = useLocation().pathname;

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/home">I-Triperary</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto-float-right">
              <Link
                to="/home"
                className={currentPage === '/home' ? 'nav-link active' : 'nav-link'}
              >
                Home
              </Link>

              <Link
                to="/login"
                className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}
              >
                Login
              </Link>

              <Link
                to="/logout"
                className={currentPage === '/logout' ? 'nav-link active' : 'nav-link'}
              >
                Logout
              </Link>
              <Link
                to="/signup"
                className={currentPage === '/SignUp' ? 'nav-link active' : 'nav-link'}
              >
                SignUp
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <ChatComponent />
      </Container>
    </>
  );
}

export default NavBar;
