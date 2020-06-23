import React, { Component } from 'react'
import { NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

class NotFound extends Component {
	state = {}

	render() {
		return (
			<div>
				<center>
					<h1 style={{ fontSize: '400%' }}>uh-oh!</h1>
					<h3>Looks like this page doesn’t exist.</h3>
					<NavLink tag={Link} to={'/products'}>
						keep shopping
					</NavLink>
				</center>
				<div className='img-error'></div>
			</div>
		)
	}
}

export default NotFound
