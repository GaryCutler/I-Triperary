import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';


function navBar() {
  const currentPage = useLocation().pathname;
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">I-Triperary</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto-float-right ">
          <Link
          to="/login"
          // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === './pages/login' ? 'nav-link active' : 'nav-link'}
        >
          Login
        </Link>
    
        <Link
          to="/logout"
          // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === '/logout' ? 'nav-link active' : 'nav-link'}
        >
          Logout
        </Link>
        <Link
          to="/SignUp"
          // Check to see if the currentPage is `Contact`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === '/SignUp' ? 'nav-link active' : 'nav-link'}
        >
          SignUp
        </Link>
        </Nav>  
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default navBar;