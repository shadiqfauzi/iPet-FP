import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, toogleBrand } from 'reactstrap';
import { } from 'react-router-dom' 

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleBrand = () => setCollapsed(true)

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar fixed="top" color="light" light>
        <NavbarBrand onClick={toggleBrand} className="mr-auto nav" tag={Link} to={'/'}>iPet</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;