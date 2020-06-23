import React from 'react'
import { API_URL } from '../../Support/API_URL'
import { Link } from 'react-router-dom'

const ProductCard = (props) => {
	const { data } = props
	return (
		<div>
			<div className='card' style={{ width: '14rem' }}>
				<img className='card-img-top' src={`${API_URL + data.images[0].imagePath}`} alt='pfoto produkqu'></img>
				<div className='card-body'>
					<h5 className='card-title'>
						{data.productName.substring(0, 25)} {data.productName.length > 25 ? '...' : null}
					</h5>
					<Link to={`/products/${data.productId}`}>
						<button className='btn btn-primary'>Details</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
