import React, { useState } from 'react'
import { Input, Button, Label, Form } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../Redux/Action/authAction'

const LoginPage = () => {
	const [formInput, setFormInput] = useState({
		username: '',
		password: '',
	})

	const handleChange = (e) => {
		setFormInput({
			...formInput,
			[e.target.id]: e.target.value,
		})
	}

	const dispatch = useDispatch()

	const handleLogin = (e) => {
		e.preventDefault()
		dispatch(Login(formInput))
	}

	const loading = useSelector((state) => state.auth.loading)
	const username = useSelector(({ auth }) => auth.username)

	if (username) {
		return <Redirect to='/' />
	}

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-8 img-placeholder'></div>
				<div className='col-md-4 d-flex flex-column pr-5 pl-5 auth-form'>
					<h1>Login to continue</h1>
					<Form onSubmit={handleLogin}>
						<Label for='username' className='mt-5'>
							Username
						</Label>
						<Input type='text' placeholder='Username' id='username' onChange={handleChange} required></Input>
						<Label for='password' className='mt-2'>
							Password
						</Label>
						<Input type='password' placeholder='Password' id='password' onChange={handleChange} required></Input>
						<span className='text-center mt-3'>Forgot Password?</span>
						<Button style={{ width: '100%', height: '50px' }} className='mt-4' color='info'>
							{loading ? (
								<div className='spinner-border text-light' role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							) : (
								'Login'
							)}
						</Button>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
