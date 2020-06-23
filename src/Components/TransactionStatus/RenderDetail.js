import React from 'react'
import { Button } from 'reactstrap'
import { API_URL } from '../../Support/API_URL'

const RenderDetail = (props) => {
	const { data, modal, setModal, setAvailability } = props

	let statusRender = ''
	let color = ''
	if (data[0]) {
		if (data[0].pending) {
			color = 'info'
			statusRender = 'Pending'
		} else if (data[0].reject) {
			color = 'danger'
			statusRender = 'Rejected'
		} else {
			color = 'success'
			statusRender = 'Approved'
		}
	}

	const renderAvailability = (item) => {
		if (data[0].pending) {
			if (item.invStock < item.qty) {
				setAvailability(false)
				return (
					<Button style={{ cursor: 'default' }} color='warning' className='mb-3 mt-2' disabled>
						Not Enough Stock<br></br> <span>Inventory Stock: {item.invStock}</span>
					</Button>
				)
			} else {
				return null
			}
		} else {
			return null
		}
	}

	return (
		<ul className='list-group list-group-flush'>
			{data.map((val) => (
				<React.Fragment key={val.transactionId}>
					<li className='list-group-item'>
						<p className='font-weight-bold'>Transaction ID</p> {val.transactionId}
					</li>
					<li className='list-group-item'>
						<p className='font-weight-bold'>Status</p>
						<Button size='sm' style={{ cursor: 'default' }} color={color} disabled>
							{statusRender}
						</Button>
						{data[0].reject ? (
							<React.Fragment>
								<p className='font-weight-bold mt-3'>Reason</p>
								<p>{data[0].rejectMessage}</p>
							</React.Fragment>
						) : null}
					</li>
					<li className='list-group-item'>
						<p className='font-weight-bold'>Date</p> {val.date}
					</li>
					<li className='list-group-item'>
						<p className='font-weight-bold'>Username</p> {val.username}
					</li>
					<li className='list-group-item'>
						<p className='font-weight-bold'>Email</p> {val.email}
					</li>
					<li className='list-group-item'>
						<p className='font-weight-bold'>Payment Image</p>{' '}
						{!val.paymentImg ? (
							<span>No Payment Image</span>
						) : (
							<span onClick={() => setModal(!modal)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
								Open Image
							</span>
						)}
					</li>
					<li className='list-group-item'>
						<p className='font-weight-bold'>Purchased Item(s)</p>
						{val.cart.map((item, index) => (
							<React.Fragment key={item.productId}>
								<div className='ml-4'>
									{item.productName}
									<div>
										Quantity: {item.qty}(@Rp{item.price.toLocaleString('id-ID')},00)
									</div>
									<div>SubTotal: Rp{(item.qty * item.price).toLocaleString('id-ID')},00</div>
									{renderAvailability(item)}
								</div>
								{index !== val.cart.length - 1 && <hr className='m-0'></hr>}
							</React.Fragment>
						))}
					</li>
					<li className='list-group-item'>
						<p className='font-weight-bold'>Grand Total</p> Rp{val.totalPrice.toLocaleString('id-ID')},00
					</li>
					{data[0].receiptPath && (
						<li className='list-group-item'>
							<p className='font-weight-bold'>Receipt</p>{' '}
							<span onClick={() => {}} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
								<a href={API_URL + data[0].receiptPath} target='_blank' rel='noopener noreferrer'>
									Open Receipt
								</a>
							</span>
						</li>
					)}
				</React.Fragment>
			))}
		</ul>
	)
}

export default RenderDetail
