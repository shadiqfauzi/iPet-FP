import React, { useEffect } from 'react'
import { useLocation, Redirect, Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'

import { API_URL } from '../Support/API_URL'

const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}

const VerifyPage = (props) => {
	let query = useQuery()
	let username = query.get('username')
	let password = query.get('password')

	useEffect(() => {
		if (username && password) {
			Axios.post(`${API_URL}/users/verification`, { username, password })
				.then((res) => {
					Swal.fire({
						icon: 'success',
						title: `${username} is now verified`,
						text: 'Yay!',
					})
				})
				.catch((err) => {
					Swal.fire({
						icon: 'error',
						title: `Oops...`,
						text: 'Something went wrong!',
					})
				})
		}
	}, [username, password])

	if (!username || !password) return <Redirect to='/not-found' />
	return (
		<div style={{ height: '100vh' }}>
			<div className='container'>
				<div className='row'>
					<div className='col' style={{ marginTop: '20%' }}>
						<div className='alert alert-success' role='alert'>
							<h4 className='alert-heading'>Verification Success</h4>
							<p>Congratulations! Your account is now verified.</p>
							<Link to='/'>
								<p>Click Here To Continue.</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VerifyPage
