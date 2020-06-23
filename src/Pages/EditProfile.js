import React, { useState, useEffect } from 'react'
import { Button, Table } from 'reactstrap'
import { useSelector } from 'react-redux'
import { API_URL } from '../Support/API_URL'
import Axios from 'axios'
import Swal from 'sweetalert2'

const EditProfile = () => {
	const [editData, setEditData] = useState({
		username: '',
		email: '',
		password: '',
		roleId: 0,
		verified: 0,
		profilePicture: '',
		phoneNumbers: [],
		address: [],
	})
	const id = useSelector((state) => state.auth.id)

	useEffect(() => {
		if (id) {
			Axios.get(`${API_URL}/users/fetchDataUsers/${id}`)
				.then((res) => setEditData(res.data.data))
				.catch((err) => console.log(err))
		}
	}, [id])

	const changePicture = async () => {
		const { value: file } = await Swal.fire({
			title: 'Select image',
			input: 'file',
			inputAttributes: {
				accept: 'image/*',
				'aria-label': 'Upload your profile picture',
			},
		})

		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				let token = localStorage.getItem('token')
				let headers = {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data',
					},
				}

				let formData = new FormData()
				formData.append('image', file)
				Axios.patch(`${API_URL}/users/changePicture/${id}`, formData, headers)
					.then((res) => {
						Swal.fire({
							title: 'Your uploaded picture',
							imageUrl: e.target.result,
							imageAlt: 'The uploaded picture',
						})
					})
					.catch((err) => Swal.fire(err.message))
			}

			reader.readAsDataURL(file)
		}
	}

	const newAddress = async () => {
		const { value: address } = await Swal.fire({
			title: 'Enter your new address',
			input: 'text',
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return 'You need to write something!'
				}
			},
		})
		if (address) {
			Axios.post(`${API_URL}/users/addAddress`, { address, userId: editData.id })
				.then((res) => {
					Swal.fire(`Your added new address is ${address}`)
					Axios.get(`${API_URL}/users/fetchDataUsers/${id}`)
						.then((respond) => setEditData(respond.data.data))
						.catch((err) => console.log(err))
				})
				.catch((err) => console.log(err))
		}
	}
	const newPhoneNumbers = async () => {
		const { value: phoneNumber } = await Swal.fire({
			title: 'Enter your Phone Number',
			input: 'text',
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return 'You need to write something!'
				}
			},
		})
		if (phoneNumber) {
			Axios.post(`${API_URL}/users/addPhone`, { phoneNumber, userId: editData.id })
				.then((res) => {
					Swal.fire(`Your added new Phone Number is ${phoneNumber}`)
					Axios.get(`${API_URL}/users/fetchDataUsers/${id}`)
						.then((respond) => setEditData(respond.data.data))
						.catch((err) => console.log(err))
				})
				.catch((err) => console.log(err))
		}
	}

	const renderAddress = () => {
		let obj = {}
		editData.address.forEach((val) => {
			obj[val.id] = val.address
		})
		return obj
	}

	const renderPhone = () => {
		let obj = {}
		editData.phoneNumbers.forEach((val) => {
			obj[val.id] = val.phoneNumber
		})
		return obj
	}

	const deleteAddress = async () => {
		const { value: address } = await Swal.fire({
			title: 'Select Address',
			input: 'select',
			inputOptions: {
				Address: renderAddress(),
			},
			inputPlaceholder: 'Select a address',
			showCancelButton: true,
		})

		if (address) {
			Axios.delete(`${API_URL}/users/deleteAddress/${address}`)
				.then((res) => {
					Swal.fire(`Address has been deleted`)
					Axios.get(`${API_URL}/users/fetchDataUsers/${id}`)
						.then((respond) => setEditData(respond.data.data))
						.catch((err) => console.log(err))
				})
				.catch((err) => console(err))
		}
	}

	const deletePhoneNumbers = async () => {
		const { value: phoneNumbers } = await Swal.fire({
			title: 'Select Phone Number',
			input: 'select',
			inputOptions: {
				'Phone Number': renderPhone(),
			},
			inputPlaceholder: 'Select a Phone Number',
			showCancelButton: true,
		})

		if (phoneNumbers) {
			Axios.delete(`${API_URL}/users/deletePhone/${phoneNumbers}`)
				.then((res) => {
					Swal.fire(`Phone Number has been deleted`)
					Axios.get(`${API_URL}/users/fetchDataUsers/${id}`)
						.then((respond) => setEditData(respond.data.data))
						.catch((err) => console.log(err))
				})
				.catch((err) => console(err))
		}
	}

	const editAddress = async () => {
		const { value: address } = await Swal.fire({
			title: 'Select field validation',
			input: 'select',
			inputOptions: {
				Address: renderAddress(),
			},
			inputPlaceholder: 'Select a Address',
			showCancelButton: true,
			inputValidator: (value) => {
				return new Promise((resolve) => {
					if (value) {
						resolve()
					} else {
						resolve('You need to select Address')
					}
				})
			},
		})

		if (address) {
			Swal.fire({
				title: 'Enter your new address',
				input: 'text',
				showCancelButton: true,
				inputValidator: (value) => {
					if (!value) {
						return 'You need to write something!'
					} else {
						Axios.patch(`${API_URL}/users/editAddress/${address}`, { address: value })
							.then((res) => {
								Swal.fire('Your address has been changed')
								Axios.get(`${API_URL}/users/fetchDataUsers/${id}`)
									.then((respond) => setEditData(respond.data.data))
									.catch((err) => console.log(err))
							})
							.catch((err) => console.log(err))
					}
				},
			})
		}
	}

	const editPhoneNumber = async () => {
		const { value: phoneNumber } = await Swal.fire({
			title: 'Select field validation',
			input: 'select',
			inputOptions: {
				'Phone Number': renderPhone(),
			},
			inputPlaceholder: 'Select a Phone Number',
			showCancelButton: true,
			inputValidator: (value) => {
				return new Promise((resolve) => {
					if (value) {
						resolve()
					} else {
						resolve('You need to select Phone Number')
					}
				})
			},
		})

		if (phoneNumber) {
			Swal.fire({
				title: 'Enter your new Phone Number',
				input: 'text',
				showCancelButton: true,
				inputValidator: (value) => {
					if (!value) {
						return 'You need to write something!'
					} else {
						Axios.patch(`${API_URL}/users/editPhone/${phoneNumber}`, { phoneNumber: value })
							.then((res) => {
								Swal.fire('Your Phone Number has been changed')
								Axios.get(`${API_URL}/users/fetchDataUsers/${id}`)
									.then((respond) => setEditData(respond.data.data))
									.catch((err) => console.log(err))
							})
							.catch((err) => console.log(err))
					}
				},
			})
		}
	}

	const changePassword = async () => {
		var { value: password } = await Swal.fire({
			title: 'Enter your old password',
			input: 'password',
			inputPlaceholder: 'Enter your old password',
			inputAttributes: {
				maxlength: 10,
				autocapitalize: 'off',
				autocorrect: 'off',
			},
		})
		if (password) {
			let token = localStorage.getItem('token')
			let headers = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}

			Axios.patch(`${API_URL}/users/hexPass`, { password }, headers)
				.then(async (res) => {
					if (res.data.hashPassword === editData.password) {
						var { value: password } = await Swal.fire({
							title: 'Enter your  New password',
							input: 'password',
							inputPlaceholder: 'Enter your password',
							inputAttributes: {
								maxlength: 10,
								autocapitalize: 'off',
								autocorrect: 'off',
							},
						})

						if (password) {
							Axios.patch(`${API_URL}/users/changePassword/${id}`, { newPassword: password }, headers)
								.then((res) => Swal.fire(`Password has been changed`))
								.catch((err) => Swal.fire(err.message))
						}
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Wrong Password',
							text: 'Please Input Your Old Password!',
						})
					}
				})
				.catch((err) => console.log(err))
		}
	}

	return (
		<div>
			<p style={{ fontWeight: 'bold' }} className='d-flex justify-content-center'>
				{' '}
				Edit Profile
			</p>
			<Table striped>
				<thead>
					<tr>
						<th>Profile</th>
						<th>Address</th>
						<th>Phone</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<Button color='warning' onClick={changePicture}>
								Chage Picture
							</Button>
						</td>
						<td>
							<Button color='success' onClick={newAddress}>
								Add
							</Button>
						</td>
						<td>
							<Button color='success' onClick={newPhoneNumbers}>
								Add
							</Button>
						</td>
					</tr>
					<tr>
						<td>
							<Button color='warning' onClick={changePassword}>
								Change Password
							</Button>
						</td>
						<td>
							<Button color='primary' onClick={editAddress}>
								Edit
							</Button>
						</td>
						<td>
							<Button color='primary' onClick={editPhoneNumber}>
								Edit
							</Button>
						</td>
					</tr>
					<tr>
						<td></td>
						<td>
							<Button color='danger' onClick={deleteAddress}>
								Delete
							</Button>
						</td>
						<td>
							<Button color='danger' onClick={deletePhoneNumbers}>
								Delete
							</Button>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	)
}

export default EditProfile
