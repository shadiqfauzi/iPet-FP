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
	const roleId = useSelector((state) => state.auth.roleId)

	const dispatch = useDispatch()

	return (
		<div>
			<Navbar color='light' light expand='md' fixed='top'>
				<NavbarBrand
					tag={Link}
					to={'/'}
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
							<NavLink tag={Link} to={'/products'}>Products</NavLink>
						</NavItem>
						<NavItem>
							<NavLink>Service</NavLink>
						</NavItem>
						<NavItem>
							<NavLink>Contact</NavLink>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								{user ? user : 'User'}
							</DropdownToggle>
							<DropdownMenu right>
								{user ? (
									<React.Fragment>
										<Link to='/products'>
											<DropdownItem>Shop Now</DropdownItem>
										</Link>
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
											<DropdownItem>Cart</DropdownItem>
										</Link>
										{roleId === 1 ? (
											<Link to='/admin'>
												<DropdownItem>Admin Page</DropdownItem>
											</Link>
										) : null}
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
