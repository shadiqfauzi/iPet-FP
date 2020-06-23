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

	// const changePicture = async() => {

	//     const { value: file } = await Swal.fire({
	//         title: 'Select image',
	//         input: 'file',
	//         inputAttributes: {
	//           'accept': 'image/*',
	//           'aria-label': 'Upload your profile picture'
	//         }
	//       })

	//       if (file) {

	//           const reader = new FileReader()
	//           reader.onload = (e) => {
	//             let token = localStorage.getItem('token')
	//             let headers = {
	//                 headers : {
	//                     'Authorization' : `Bearer ${token}`,
	//                     'Content-Type'  : 'multipart/form-data'
	//                 }
	//             }
	//             let blob = dataURItoBlob(e.target.result)
	//             let formData = new FormData()
	//             formData.append('image', blob)
	//             for (var pair of formData.entries()) {
	//               console.log(pair[0]+ ', ' + pair[1]);
	//           }

	//             Axios.patch(`${API_URL}/users/changePicture/${id}`, formData, headers )
	//             .then(res => {
	//               Swal.fire({
	//                 title: 'Your uploaded picture',
	//                 imageUrl: e.target.result,
	//                 imageAlt: 'The uploaded picture'
	//               })

	//         })
	//         .catch(err => Swal.fire(err.message))
	//             console.log(e)
	//           }

	//           reader.readAsDataURL(file)
	//         }
	//         // Axios.patch(`${API_URL}/users/changePicture/${id}`,{file}, headers)
	//         // .then(res => {
	//         // })
	//         // .catch(err => Swal.fire(err.message))
	// }

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
		console.log(address)
		if (address) {
			Axios.post(`${API_URL}/users/addAddress`, { address, userId: editData.id })
				.then((res) => Swal.fire(`Your new address is ${address}`))
				.catch((err) => console.log(err))
		}
	}

	const renderAddress = () => {
		return editData.address.map((val) => {
			return { val }
		})
	}

	const deleteAddress = async () => {
		const { value: address } = await Swal.fire({
			title: 'Select Address',
			input: 'select',
			inputOptions: {
				Address: {
					renderAddress,
				},
			},
			inputPlaceholder: 'Select a address',
			showCancelButton: true,
			inputValidator: (value) => {
				return new Promise((resolve) => {
					if (value === 'oranges') {
						resolve()
					} else {
						resolve('You need to select oranges :)')
					}
				})
			},
		})

		if (address) {
			Swal.fire(`You selected: ${address}`)
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
							<Button color='warning'>Chage Picture</Button>
						</td>
						<td>
							<Button color='success' onClick={newAddress}>
								Add
							</Button>
						</td>
						<td>
							<Button color='success'>Add</Button>
						</td>
					</tr>
					<tr>
						<td>
							<Button color='warning' onClick={changePassword}>
								Change Password
							</Button>
						</td>
						<td>
							<Button color='primary'>Edit</Button>
						</td>
						<td>
							<Button color='primary'>Edit</Button>
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
							<Button color='danger'>Delete</Button>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	)
}

export default EditProfile

// <div class="container border border-light">
// <p style={{fontWeight : "bold"}} className="d-flex justify-content-center"> Edit Profile</p>
//     <div class="row">
//         <div class="col-sm border border-dark">
//         <p style={{fontWeight : "bold"}}> Address </p>
//             <div class="d-flex flex-column bd-highlight mb-3">
//                 <div class="p-2 bd-highlight">Flex item 1</div>
//                 <div class="p-2 bd-highlight">Flex item 2</div>
//                 <div class="p-2 bd-highlight">Flex item 3</div>
//                 </div>
//         </div>
//         <div class="col-sm border border-dark">
//         <p style={{fontWeight : "bold"}}> Phone Number </p>
//             <div class="d-flex flex-column bd-highlight mb-3">
//                 <div class="p-2 bd-highlight">Flex item 1</div>
//                 <div class="p-2 bd-highlight">Flex item 2</div>
//                 <div class="p-2 bd-highlight">Flex item 3</div>
//                 </div>
//         </div>
//         <div class="col-sm border border-dark">
//             <div class="d-flex flex-column bd-highlight mb-3">
//                 <div class="p-2 bd-highlight">Flex item 1</div>
//                 <div class="p-2 bd-highlight">Flex item 2</div>
//                 <div class="p-2 bd-highlight">Flex item 3</div>
//                 </div>
//         </div>
//     </div>
//     </div>
