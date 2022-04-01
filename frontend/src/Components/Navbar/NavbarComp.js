import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ArtikelContainer from "../ArtikelContainer";
import ListenContainer from "../ListenContainer";
import TagsContainer from "../TagsContainer";
import "./NavbarComp.css";

export default class NavbarComp extends Component {
    deleteStorage() {
        localStorage.clear();
        window.location.reload();
    }

    render() {
        return (
            <Router>
                <div>
                    <Navbar className="navbar" expand="sm">
                        <Navbar.Brand as={Link} to={"/home"} href="#home">
                            Cooles Banner
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link
                                    className="nav-links"
                                    as={Link}
                                    to={"/listen"}
                                >
                                    Listen
                                </Nav.Link>
                                <Nav.Link
                                    className="nav-links"
                                    as={Link}
                                    to={"/artikel"}
                                >
                                    Artikel
                                </Nav.Link>
                                <Nav.Link
                                    className="nav-links"
                                    as={Link}
                                    to={"/tags"}
                                >
                                    Tags
                                </Nav.Link>
                                <NavDropdown
                                    title={localStorage.name}
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item href="#action/3.1">
                                        Hallo
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        {localStorage.name}
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        href="#action/3.4"
                                        onClick={this.deleteStorage}                                        
                                    >
                                        Abmelden
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div>
                    <Routes>
                        <Route path="/listen" element={<ListenContainer />} />
                        <Route path="/artikel" element={<ArtikelContainer />} />
                        <Route path="/tags" element={<TagsContainer />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}
