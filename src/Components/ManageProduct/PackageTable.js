import React from 'react'
import { Table, Button } from 'reactstrap'
import { useRouteMatch, Link } from 'react-router-dom'

const PackageTable = (props) => {
	const { path } = useRouteMatch()
	const { data } = props

	const renderTable = () => {
		return data.map((e) => (
			<tr key={e.id}>
				<th>{e.id}</th>
				<td>{e.parcelName}</td>
				<td>
					<Button size='sm' style={{ cursor: 'default' }} color={e.available ? 'success' : 'warning'} disabled>
						{e.available ? 'Available' : 'Not Available'}
					</Button>
				</td>
				<td>
					<Link to={`${path}/detail/${e.id}`}>
						<Button size='sm' color='primary'>
							Details
						</Button>
					</Link>
				</td>
			</tr>
		))
	}

	return (
		<Table size='sm'>
			<thead>
				<tr>
					<th>Package ID</th>
					<th>Package Name</th>
					<th colSpan='2'>Status</th>
				</tr>
			</thead>
			<tbody>{renderTable()}</tbody>
		</Table>
	)
}

export default PackageTable
