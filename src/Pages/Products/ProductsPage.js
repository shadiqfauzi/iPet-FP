import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchProduct } from '../../Redux/Action'
import ProductCard from '../../Components/Products/ProductCard'

const ProductsPage = () => {
	const dispatch = useDispatch()

	const data = useSelector((state) => state.productView.data)

	useEffect(() => {
		dispatch(FetchProduct())
	}, [dispatch])

	const renderCards = () => {
		return data.map((product) => {
			return (
				<div key={product.productId} className='col-3 mt-3 mb-3'>
					<ProductCard data={product} />
				</div>
			)
		})
	}

	return (
		<div className='container'>
			<div className='row col-12'>{data && renderCards()}</div>
		</div>
	)
}

export default ProductsPage
