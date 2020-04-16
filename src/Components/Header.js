import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleBrand = () => setCollapsed(true)

  const toggleNavbar = () => setCollapsed(!collapsed);

  const toggleBrand = () => setCollapsed(true)

  return (
    <div>
      <Navbar fixed="top" color="light" light>
        <NavbarBrand onClick={toggleBrand} className="mr-auto" tag={Link} to={'/'}>iPet</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <Link onClick={toggleNavbar} to="/login">
              <NavItem style={{'color': 'black'}}>
                Login
              </NavItem>
            </Link>
            <Link onClick={toggleNavbar} to="/register">
              <NavItem>
                Register
              </NavItem>
            </Link>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;