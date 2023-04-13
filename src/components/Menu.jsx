import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import Chart from "./Chart";

const Menu = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false)
    }
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              E-commerce
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/purchases">
                Purchases
              </Nav.Link>
              <Nav.Link
              onClick={ () => setShow(true) }
              >Chart</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Chart
        show={show}
        handleClose={handleClose}
        />
       
      </>
    );
};

export default Menu;
