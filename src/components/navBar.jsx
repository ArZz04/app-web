import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";

import logo from "../assets/logo.png"; // Ruta de tu archivo de imagen
import { useLocation } from "react-router-dom";

export default function Navigation() {
  const defaultLinks = [{ to: "/home", label: "Home" }];

  const personalLinks = [
    ...defaultLinks,
    { to: "/inventory", label: "Inventory" },
  ];

  const commandLinks = [
    ...personalLinks,
    { to: "/register", label: "Register" },
    { to: "/users", label: "Users" },
    { to: "/screens", label: "Screens" },
  ];

  const adminLinks = [...commandLinks];

  const roleLinks = {
    admin: adminLinks,
    command: commandLinks,
    personal: personalLinks,
    worker: defaultLinks,
    viewer: defaultLinks,
  };

  const [linksToShow, setLinksToShow] = useState(defaultLinks);

  const { auth } = useAuth();
  const userRole = auth?.role || "viewer";
  const userName = auth?.username;
  const location = useLocation();

  useEffect(() => {
    setLinksToShow(roleLinks[userRole] || defaultLinks);
  }, [userRole]);

  return (
    <Navbar bg="light" expand="lg" style={{ paddingLeft: '30px' }} >
      <Navbar.Brand href="/">
        <Image src={logo} alt="Carniceria De Bari" height="30" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginRight: '15px' }}/>
      <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="mr-auto">
          {linksToShow.map((link) => (
            <Nav.Link key={link.to} href={link.to}>
              {link.label}
            </Nav.Link>
          ))}
        </Nav>
        <Nav>
          {(userRole === "admin" ||
            userRole === "command" ||
            userRole === "personal" ||
            userRole === "worker") && (
            <NavDropdown title={userName} id="basic-nav-dropdown" style={{ marginRight: '30px' }}>
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          )}
          {userRole === "viewer" && (
            <Nav.Link href="/login" state={{ from: location }} >
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
