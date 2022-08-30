import React from "react";
import * as bootstrap from 'bootstrap';
import { useAuth } from "../../context/authContext";
import logo from "../../assets/LOGO.png";
import admin_F from "../../assets/admin_F.png";
import { Button, NavDropdown, Navbar, Container, Nav, Form  } from "react-bootstrap";


export function NavbarCom() {
  const { logout, user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <Navbar bg="light" expand="md">
    <Container fluid>
    <Navbar.Brand href="/">
        <img
          src={logo}
          width="40"
          height="40"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
         {/* Socios */}
         <NavDropdown title="Socios" id="basic-nav-dropdown">
            <NavDropdown.Item href="/SocioNuevo">Registrar Socio</NavDropdown.Item>
            <NavDropdown.Item href="/Socios">Ver Socios</NavDropdown.Item>
            <NavDropdown.Item href="/Register">
              Registrar usuario
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
          {/* Avisos */}
          <NavDropdown title="Avisos" id="basic-nav-dropdown">
            <NavDropdown.Item href="/Ad">Avisos</NavDropdown.Item>
            <NavDropdown.Item href="/CreateAd">
              Crear aviso
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
          {/* Promociones */}
          <NavDropdown title="Promociones" id="basic-nav-dropdown">
            <NavDropdown.Item href="/Promotions">
              Promociones
            </NavDropdown.Item>
            <NavDropdown.Item href="/CreatePromotions">
              Crear promociones
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
        <h5>Bienvenido {user.email  + "   ."}  </h5>
          <Button onClick={handleLogout} variant="outline-success">Logout</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>      
  );
}

export default NavbarCom;
