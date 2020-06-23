import React from 'react'

import CustomCarousel from './CustomCarousel'
import { API_URL } from '../../Support/API_URL'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

const MainTableBody = (props) => {
	const { e, toggleModalDelete, setDeleteProductName } = props
	return (
		<tr key={e.productId}>
			<td>{e.productId}</td>
			<td>
				<Link to={`/products/${e.productId}`}>{e.productName}</Link>
			</td>
			<td>Rp.{e.price.toLocaleString('id-ID')},00</td>
			<td>{e.invStock}</td>
			<td>{e.appStock}</td>
			<td>{e.views}</td>
			<td>{e.totalPurchased}</td>
			<td>
				<div>
					<CustomCarousel
						interval={false}
						images={e.images.map((img) => ({
							src: API_URL + img.imagePath,
						}))}
					/>
				</div>
			</td>
			<td>
				{e.category.map((cat) => (
					<div key={cat.productCategoryId}>{cat.category} </div>
				))}
			</td>
			<td>
				<Link to={`/admin/manage-product/edit/${e.productId}`}>
					<Button>Edit</Button>
				</Link>
			</td>
			<td>
				<Button
					onClick={() => {
						toggleModalDelete()
						setDeleteProductName(e)
					}}
				>
					Delete
				</Button>
			</td>
		</tr>
	)
}

export default MainTableBody
