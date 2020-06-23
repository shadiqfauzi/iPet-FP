import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom'

import { FetchProductById } from '../../Redux/Action'
import { API_URL } from '../../Support/API_URL'
import { FaPlus, FaMinus, FaCartPlus } from 'react-icons/fa'
import { Button } from 'reactstrap'
import Axios from 'axios'

const ProductDetail = () => {
	const data = useSelector((state) => state.productView.productById)
	const userId = useSelector((state) => state.auth.id)

	const [finishAdd, setFinishAdd] = useState(false)

	const [qty, setQty] = useState(1)
	const [image, setImage] = useState('')

	const dispatch = useDispatch()

	const { id } = useParams()

	useEffect(() => {
		window.scrollTo(0, 0)
		dispatch(FetchProductById(id))
	}, [dispatch, id])

	const addToCart = () => {
		Axios.post(`${API_URL}/products/cart`, { productId: id, userId, qty })
			.then(() => setFinishAdd(true))
			.catch((err) => window.alert(err.message))
	}

	if (finishAdd) return <Redirect to='/cart' />
	return (
		<div className='container mt-5' style={{ minHeight: '100vh' }}>
			<hr></hr>
			{data.id && (
				<div className='row'>
					<div className='col-5'>
						<div className='col-12 m-0'>
							<img
								style={{ borderRadius: '10px' }}
								width='100%'
								src={image ? API_URL + image : API_URL + data.images[0].imagePath}
								alt='ini produk ku'
							></img>
						</div>
						<div className='col-12 mt-2'>
							<div className='row justify-content-around'>
								{data.images.map((e) => {
									return (
										<div className='col-2'>
											<img
												onClick={() => setImage(e.imagePath)}
												style={{ cursor: 'pointer', borderRadius: '5px' }}
												width='100%'
												src={API_URL + e.imagePath}
												alt='ini produk ku'
											></img>
										</div>
									)
								})}
							</div>
						</div>
					</div>
					<div className='col-7'>
						<h4>{data.productName}</h4>
						<hr></hr>
						<div className='row'>
							<div className='col-2'>
								<p>Price</p>
							</div>
							<div className='col-10'>
								<h5>Rp{data.price.toLocaleString('id-ID')},00</h5>
							</div>
						</div>
						<hr></hr>
						<div className='row'>
							<div className='col-2'>
								<p>Categories</p>
							</div>
							<div className='col-10'>
								{data.categories.map((e) => (
									<Button style={{ cursor: 'default' }} className='mr-2' size='sm' disabled>
										{e.category}
									</Button>
								))}
							</div>
						</div>
						<hr></hr>
						<div className='row'>
							<div className='col-2'>
								<p>Stock</p>
							</div>
							<div className='col-10'>
								<p>
									{data.appStock ? data.appStock : null} {data.appStock > 0 ? 'Available' : 'Out of Stock'}
								</p>
								{data.appStock ? (
									<React.Fragment>
										<Button onClick={() => setQty((prev) => prev - 1)} size='sm' disabled={qty === 1 ? true : false}>
											<FaMinus />
										</Button>
										<strong className='ml-3 mr-3'>{qty}</strong>
										<Button onClick={() => setQty((prev) => prev + 1)} size='sm' disabled={data.appStock === qty && true}>
											<FaPlus />
										</Button>
										<Button className='ml-5' size='sm' onClick={addToCart}>
											<FaCartPlus /> Add To Cart
										</Button>
									</React.Fragment>
								) : null}
							</div>
						</div>
						<hr></hr>
						<div className='row'>
							<div className='col-2'>
								<p>Description</p>
							</div>
							<div className='col-10'>
								<p>{data.productDescription}</p>
							</div>
						</div>
					</div>
				</div>
			)}
			<hr></hr>
		</div>
	)
}

export default ProductDetail
