import React from 'react'
import { Table, Button } from 'reactstrap'
import { Link, useRouteMatch } from 'react-router-dom'

const DynamicTable = (props) => {
	const { path } = useRouteMatch()

	const { data } = props

	const renderTable = () => {
		return data.map((transaction) => {
			let status = ''
			let color = ''
			if (transaction.pending) {
				status = 'Pending'
				color = 'info'
			} else if (transaction.approval) {
				status = 'Approved'
				color = 'success'
			} else if (transaction.reject) {
				status = 'Rejected'
				color = 'danger'
			}
			return (
				<tr key={transaction.transactionId}>
					<th>{transaction.transactionId}</th>
					<th>{transaction.date}</th>
					<td>{transaction.username}</td>
					<td>{transaction.email}</td>
					<td>Rp{transaction.totalPrice.toLocaleString('id-ID')},-</td>
					<td>
						<Button size='sm' style={{ cursor: 'default' }} color={color} disabled>
							{status}
						</Button>
					</td>
					<td>
						<Link to={`${path}/detail/${transaction.transactionId}`}>
							<Button size='sm' color='primary'>
								Details
							</Button>
						</Link>
					</td>
				</tr>
			)
		})
	}

	return (
		<Table size='sm'>
			<thead>
				<tr>
					<th>Transaction ID</th>
					<th>Date</th>
					<th>Username</th>
					<th>Email</th>
					<th>Grand Total</th>
					<th colSpan='2'>Status</th>
				</tr>
			</thead>
			<tbody>
				{data.length === 0 ? (
					<tr>
						<td colSpan='7'>
							<div className='d-flex justify-content-center'>
								<h4>No Such Data</h4>
							</div>
						</td>
					</tr>
				) : (
					renderTable()
				)}
			</tbody>
		</Table>
	)
}

export default DynamicTable
