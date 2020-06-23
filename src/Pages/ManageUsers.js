import React, { useState, useEffect } from 'react'
import { Table, Button } from 'reactstrap'
import { API_URL } from '../Support/API_URL'
import { useSelector } from 'react-redux'
import Axios from 'axios'

const ManageUsers = () => {
	const [data, setData] = useState([])

	const roleId = useSelector((state) => state.auth.roleId)
	useEffect(() => {
		if (roleId === 1) {
			Axios.get(`${API_URL}/users/fetchAllUsers`)
				.then((res) => {
					setData(res.data.data)
				})
				.catch((err) => console.log(err))
		}
	}, [roleId])

	const handleBan = (id) => {
		Axios.patch(`${API_URL}/users/banUser/${id}`)
			.then((respond) => {
				Axios.get(`${API_URL}/users/fetchAllUsers`)
					.then((res) => setData(res.data.data))
					.catch((err) => console.log(err))
			})
			.catch((err) => console.log(err.message))
	}
	const handleUnBan = (id) => {
		Axios.patch(`${API_URL}/users/unbanUser/${id}`)
			.then((respond) => {
				Axios.get(`${API_URL}/users/fetchAllUsers`)
					.then((res) => setData(res.data.data))
					.catch((err) => console.log(err))
			})
			.catch((err) => console.log(err.message))
	}

	const renderusername = () => {
		return data.map((val) => {
			return (
				<React.Fragment key={val.id}>
					<tr className='table-success' key={val.id}>
						<td colSpan='4'>{val.username}</td>
						<td> {val.email} </td>
						<td>
							{val.status === 0 ? (
								<Button color='primary' onClick={() => handleBan(val.id)}>
									{' '}
									Ban{' '}
								</Button>
							) : (
								<Button color='danger' onClick={() => handleUnBan(val.id)}>
									{' '}
									Unban{' '}
								</Button>
							)}
						</td>
					</tr>
					<tr>
						<td colSpan='5'></td>
					</tr>
				</React.Fragment>
			)
		})
	}

	return (
		<div>
			{data.length === 0 ? (
				<h1 style={{ textAlign: 'center' }}>You don't have any Users</h1>
			) : (
				<div>
					<h1>Manage User</h1>
					<Table style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
						<thead>
							<tr>
								<th colSpan='4'>Username</th>
								<th>Email</th>
								<th>Status </th>
							</tr>
						</thead>
						<tbody>{renderusername()}</tbody>
					</Table>
				</div>
			)}
		</div>
	)
}

export default ManageUsers
