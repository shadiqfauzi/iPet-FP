import React, { useEffect, useState } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FetchProductPackage, DeletePackage } from '../../Redux/Action'
import { Button } from 'reactstrap'
import { API_URL } from '../../Support/API_URL'
import CustomCarousel from '../../Components/ManageProduct/CustomCarousel'
import CustomModal from '../../Components/ManageProduct/CustomModal'

const ProductPackageDetail = (props) => {
	const { id } = useParams()

	const [redirect, setRedirect] = useState(false)
	const [modal, setModal] = useState(false)

	const dispatch = useDispatch()

	const data = useSelector((state) => state.productPackage.data)

	useEffect(() => {
		window.scrollTo(0, 0)
		dispatch(FetchProductPackage(parseInt(id)))
	}, [dispatch, id])

	const countPrice = () => {
		let price = 0
		for (const product of data[0].products) {
			price += product.price * product.productQty
		}
		return price.toLocaleString('id-ID')
	}

	const handleDelete = () => {
		dispatch(DeletePackage(id))
		setModal(false)
		setRedirect(true)
	}

	if (redirect) return <Redirect to='/admin/manage-product/package?delete-success=1' />
	return (
		<React.Fragment>
			<ul className='list-group list-group-flush'>
				{data.map((val) => (
					<React.Fragment key={val.id}>
						<li className='list-group-item'>
							<p className='font-weight-bold mb-0'>Package ID: {val.id}</p>
						</li>
						<li className='list-group-item'>
							<p className='font-weight-bold mb-0'>Package Name</p> {val.parcelName}
						</li>
						<li className='list-group-item'>
							<p className='font-weight-bold mb-0'>Status</p>
							<Button size='sm' style={{ cursor: 'default' }} color={val.available ? 'success' : 'warning'} disabled>
								{val.available ? 'Available' : 'Not Available'}
							</Button>
						</li>
						<li className='list-group-item'>
							<p className='font-weight-bold mb-0'>Products</p>
							{val.products.map((item, index) => (
								<React.Fragment key={item.productId}>
									<div className='ml-4'>
										Product Name: {item.productName}
										<div>
											Product Images:{' '}
											<div className='mt-3 mb-3'>
												{
													<CustomCarousel
														interval={false}
														images={item.images.map((img) => ({
															src: API_URL + img.imagePath,
														}))}
													/>
												}
											</div>
										</div>
										<div>Price: Rp{item.price.toLocaleString('id-ID')},00</div>
										<div>Quantity Needed: {item.productQty}</div>
										<div>App Stock: {item.appStock}</div>
										<div>Inventory Stock: {item.invStock}</div>
										{!item.active && (
											<div>
												<Button size='sm' className='mb-3 mt-1' style={{ cursor: 'default' }} color={'danger'} disabled>
													Prodcut Deleted
												</Button>
											</div>
										)}
										{item.productQty > item.invStock && (
											<div>
												<Button size='sm' className='mb-3 mt-1' style={{ cursor: 'default' }} color={'warning'} disabled>
													Stock Not Enough
												</Button>
											</div>
										)}
									</div>
									{index !== val.products.length - 1 && <hr className='m-0'></hr>}
								</React.Fragment>
							))}
						</li>
						<li className='list-group-item'>
							<p className='font-weight-bold mb-0'>Package Total Price</p> Rp{data[0] && countPrice()},00
						</li>
						<li className='list-group-item'>
							<p className='font-weight-bold mb-0'>Action</p>
							<div className='row justify-content-around'>
								<Link to={`/admin/manage-product/edit-package/${id}`}>
									<Button color='info'>Edit</Button>
								</Link>
								<Button onClick={() => setModal(!modal)} color='danger'>
									Delete
								</Button>
							</div>
						</li>
					</React.Fragment>
				))}
			</ul>
			<CustomModal
				toggle={() => setModal(!modal)}
				modal={modal}
				title='Confirm Delete Product'
				onConfirm={handleDelete}
				confirmLabel='Delete'
				buttonColor='danger'
			>
				Are you sure you want to delete this package?
			</CustomModal>
		</React.Fragment>
	)
}

export default ProductPackageDetail
