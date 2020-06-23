import React from 'react'
import { useLocation } from 'react-router-dom'

const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}

const ConfirmRegister = (props) => {
	let query = useQuery()
	let email = query.get('email')
	return (
		<div style={{ height: '100vh' }}>
			<div className='container'>
				<div className='row'>
					<div className='col' style={{ marginTop: '20%' }}>
						<div className='alert alert-success' role='alert'>
							<h4 className='alert-heading'>Email Verification</h4>
							<p>
								Congratulations! You have successfully registered an account and login on iPet! Just one more step to gain full access of our
								products.
							</p>
							<hr></hr>
							<p className='mb-0'>We have sent an email to '{email}' on how to verify your account.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConfirmRegister
