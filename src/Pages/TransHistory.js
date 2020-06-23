import React, { useState, useEffect } from 'react'
import { TabContent, Table, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { API_URL } from '../Support/API_URL'
import Axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'

const TransHistory = () => {
	const [data, setData] = useState([])
	const [activeTab, setActiveTab] = useState('1')

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab)
	}

	const id = useSelector((state) => state.auth.id)

	useEffect(() => {
		if (id) {
			Axios.get(`${API_URL}/users/fetchTransHistory/${id}`)
				.then((res) => setData(res.data.data))
				.catch((err) => console.log(err))
		}
	}, [id])

	const showDetail = (products, totalPrice, date) => {
		let innerHtml = `<strong><p>Pembelian pada tanggal: ${date}</p></strong><hr />`
		products.forEach((val) => {
			innerHtml += `${val.image.map((e) => {
				return `
            <img width='30%' src='${API_URL + e.imagePath}' alt='foto'/>
            `
			})}
          <h5>${val.productName}</h5>
          <p>Quantity: ${val.qty} (@ Rp.${val.price.toLocaleString()})</p>
          <p>Subtotal: Rp. ${(val.qty * val.price).toLocaleString()}</p>
          <hr/>
          `
		})
		innerHtml += `<strong>Grand Total: Rp. ${totalPrice.toLocaleString()}</strong>`
		Swal.fire({
			html: innerHtml,
		})
	}

	const handleUploadPayment = async (transId) => {
		const { value: file } = await Swal.fire({
			title: 'Select image',
			input: 'file',
			inputAttributes: {
				accept: 'image/*',
				'aria-label': 'Upload your profile picture',
			},
		})

		if (file) {
			let formData = new FormData()
			formData.append('image', file)
			formData.append('transactionId', transId)
			let headers = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
			Axios.post(`${API_URL}/products/upload-payment`, formData, headers)
				.then(() =>
					Axios.get(`${API_URL}/users/fetchTransHistory/${id}`)
						.then((res) => setData(res.data.data))
						.catch((err) => console.log(err))
				)
				.catch((err) => window.alert(err.message))
		}
	}

	const renderTransaction = (status) => {
		return data.map((val) => {
			if (val[status]) {
				return (
					<React.Fragment key={val.id}>
						<tr className='table-success' key={val.id}>
							<td colSpan='4'>{moment(val.date).format('YYYY-MM-DD h:mm:ss')}</td>
							<td>Rp. {val.totalPrice.toLocaleString()}</td>
						</tr>
						<tr>
							{!val.approval ? (
								<td colSpan={1}>
									<Button
										className='float-left'
										color='primary'
										onClick={() => {
											handleUploadPayment(val.id)
										}}
										disabled={val.paymentImg && !val.reject ? true : false}
									>
										{val.paymentImg && !val.reject ? 'Image Uploaded' : 'Upload Payment Image'}
									</Button>
								</td>
							) : null}
							{val.reject ? (
								<td colSpan='1'>
									<Button onClick={() => Swal.fire(`${val.rejectMessage}`)}>Show Reject Message</Button>
								</td>
							) : null}
							<td colSpan={val.approval ? 4 : 3}>
								<Button className='float-right' color='primary' onClick={() => showDetail(val.products, val.totalPrice, val.date)}>
									Click For Details ({val.products.length} {val.products.length > 1 ? 'items' : 'item'})
								</Button>
							</td>
						</tr>
					</React.Fragment>
				)
			} else {
				return null
			}
		})
	}

	console.log(data)

	return (
		<div>
			<div className='container mt-5' style={{ minHeight: '100vh' }}>
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === '1' })}
							onClick={() => {
								toggle('1')
							}}
						>
							Pending
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === '2' })}
							onClick={() => {
								toggle('2')
							}}
						>
							Rejected
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === '3' })}
							onClick={() => {
								toggle('3')
							}}
						>
							Finished
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab}>
					<TabPane tabId='1'>
						<Row>
							<Col sm='12'>
								<Table style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
									<thead>
										<tr>
											<th colSpan='4'>Tanggal</th>
											<th>Total Belanja</th>
										</tr>
									</thead>
									<tbody>{renderTransaction('pending')}</tbody>
								</Table>
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId='2'>
						<Row>
							<Col sm='12'>
								<Table style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
									<thead>
										<tr>
											<th colSpan='4'>Tanggal</th>
											<th>Total Belanja</th>
										</tr>
									</thead>
									<tbody>{renderTransaction('reject')}</tbody>
								</Table>
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId='3'>
						<Row>
							<Col sm='12'>
								<Table style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
									<thead>
										<tr>
											<th colSpan='4'>Tanggal</th>
											<th>Total Belanja</th>
										</tr>
									</thead>
									<tbody>{renderTransaction('approval')}</tbody>
								</Table>
							</Col>
						</Row>
					</TabPane>
				</TabContent>
			</div>
		</div>
	)
}

export default TransHistory
