import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return (
        <div>
            <Navbar color='light' light expand='md' fixed='top'>
                <NavbarBrand
                    href='/'
                    className='navbar'
                    style={{
                        marginLeft: '5%',
                        fontSize: '150%',
                        marginRight: '56%',
                    }}
                >
                    <strong>iPet</strong>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className='mr-auto' navbar>
                        <NavItem>
                            <NavLink tag={Link} to={'/'}>
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>Service</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>Contact</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                User
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link to='/login'>
                                    <DropdownItem>Login</DropdownItem>
                                </Link>
                                <Link to='/register'>
                                    <DropdownItem>Register</DropdownItem>
                                </Link>
                                <DropdownItem divider />
                                <Link to='/cart'>
                                    <DropdownItem>cart</DropdownItem>
                                </Link>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Header
