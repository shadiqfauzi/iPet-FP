import React, { useState, useEffect } from 'react'
import { Button, Card, CardImg, CardText, CardBody } from 'reactstrap'
import { useSelector } from 'react-redux'
import { API_URL } from '../Support/API_URL'
import Axios from 'axios'
import { Link } from 'react-router-dom'

const Profile = () => {
	const [formInput, setFormInput] = useState({
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
				.then((res) => setFormInput(res.data.data))
				.catch((err) => console.log(err))
		}
	}, [id])

	return (
		<div className='d-flex justify-content-center'>
			<div style={{ width: '15%' }} classNam='d-flex justify-content-center'>
				<Card>
					<CardImg
						top
						width='100%'
						src={formInput.profilePicture ? API_URL + formInput.profilePicture : API_URL + '/images/display_picture/Default.png'}
						alt='Card image cap'
					/>
					<CardBody>
						<div className='d-flex flex-column bd-highlight mb-3'>
							<CardText style={{ fontWeight: 'bold' }} className='float-left'>
								Username
							</CardText>
							<CardText className='d-flex justify-content-end'>{formInput.username}</CardText>
							<CardText style={{ fontWeight: 'bold' }} className='float-left'>
								Email
							</CardText>
							<CardText className='d-flex justify-content-end'>{formInput.email}</CardText>

							<CardText style={{ fontWeight: 'bold' }} className='float-left'>
								Address
							</CardText>
							{formInput.address.map((val) => {
								return <CardText className='d-flex justify-content-end'>{val.address}</CardText>
							})}
							<CardText style={{ fontWeight: 'bold' }} className='float-left'>
								Phone Number
							</CardText>
							{formInput.phoneNumbers.map((val) => {
								return <CardText className='d-flex justify-content-end'>{val.phoneNumber}</CardText>
							})}
						</div>
						<Link to='editProfile'>
							<Button>Edit Profile</Button>
						</Link>
					</CardBody>
				</Card>
			</div>
		</div>
	)
}

export default Profile
