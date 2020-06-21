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
import { Logout } from '../Redux/Action/authAction'
import { useSelector, useDispatch } from 'react-redux'

const Header = (props) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen(!isOpen)

	const user = useSelector((state) => state.auth.username)

	const dispatch = useDispatch()

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
								{user ? (
									<React.Fragment>
										<Link to='/profile'>
											<DropdownItem>Profile</DropdownItem>
										</Link>
										<Link to='/transhistory'>
											<DropdownItem>Transaction History</DropdownItem>
										</Link>
										<Link to='/' onClick={() => dispatch(Logout())}>
											<DropdownItem>Logout</DropdownItem>
										</Link>
										<Link to='/cart'>
											<DropdownItem>cart</DropdownItem>
										</Link>
									</React.Fragment>
								) : (
									<React.Fragment>
										<Link to='/login'>
											<DropdownItem>Login</DropdownItem>
										</Link>
										<Link to='/register'>
											<DropdownItem>Register</DropdownItem>
										</Link>
										<DropdownItem divider />
										<DropdownItem>Reset</DropdownItem>
									</React.Fragment>
								)}
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	)
}

export default Header
