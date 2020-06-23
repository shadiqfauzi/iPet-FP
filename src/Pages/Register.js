import React, { useState } from 'react'
import { Input, Button, Label, Form, FormText } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import { Register } from '../Redux/Action/authAction'
import { Redirect } from 'react-router-dom'

const RegisterPage = () => {
	const [formInput, setFormInput] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const handleChange = (e) => {
		setFormInput({
			...formInput,
			[e.target.id]: e.target.value,
		})
	}

	const dispatch = useDispatch()

	const handleRegister = (e) => {
		e.preventDefault()
		let { username, email, password, confirmPassword } = formInput
		if (password === confirmPassword) {
			dispatch(
				Register({
					username,
					email,
					password,
				})
			)
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Invalid Password',
				text: "Password & Confirm Password Doesn't match",
			})
		}
	}

	const loading = useSelector((state) => state.auth.loading)
	const email = useSelector(({ auth }) => auth.email)

	if (email) {
		return <Redirect to={`/confirm-register?email=${email}`} />
	}

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-8 img-placeholder'></div>
				<div className='col-md-4 d-flex flex-column pr-5 pl-5 mt-5'>
					<h1>Register</h1>
					<Form onSubmit={handleRegister}>
						<Label for='username' className='mt-5'>
							Username
						</Label>
						<Input type='text' placeholder='Username' id='username' onChange={handleChange} required></Input>
						<Label for='email' className='mt-2'>
							Email
						</Label>
						<Input type='email' placeholder='Email' id='email' onChange={handleChange} required></Input>
						<Label for='password' className='mt-2'>
							Password
						</Label>
						<Input
							type='password'
							placeholder='Password'
							id='password'
							onChange={handleChange}
							minLength={8}
							maxLength={15}
							required
						></Input>
						<FormText color='muted'>Password minimum 8 characters, maximum 15 characters.</FormText>
						<Label for='confirmPassword' className='mt-2'>
							Confirm Password
						</Label>
						<Input type='password' placeholder='Confirm Password' id='confirmPassword' onChange={handleChange} required></Input>
						<Button style={{ width: '100%', height: '50px' }} className='mt-4' color='success'>
							{loading ? (
								<div className='spinner-border text-light' role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							) : (
								'Register Now'
							)}
						</Button>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
