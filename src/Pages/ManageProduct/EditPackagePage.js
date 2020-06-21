import React, { useState, useCallback, useEffect } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import CustomModal from '../../Components/ManageProduct/CustomModal'
import { SearchProduct, FetchProductPackage, EditPackage } from '../../Redux/Action'
import { Redirect, useParams } from 'react-router-dom'

const EditPackagePage = (props) => {
	const { id } = useParams()

	const [modal, setModal] = useState(false)
	const [confirmModal, setConfirmModal] = useState(false)
	const [search, setSearch] = useState('')
	const [selectedProduct, setSelectedProduct] = useState([])
	const [nameInput, setNameInput] = useState('')
	const [redirect, setRedirect] = useState(false)

	const data = useSelector((state) => state.productPackage.data)
	const productData = useSelector((state) => state.productPackage.productData)
	const loading = useSelector((state) => state.productPackage.loading)

	const dispatch = useDispatch()

	const debounceSearch = useCallback(
		_.debounce(async (e) => {
			dispatch(SearchProduct(e))
		}, 500),
		[]
	)

	useEffect(() => {
		window.scrollTo(0, 0)
		dispatch(FetchProductPackage(parseInt(id)))
	}, [dispatch, id])

	useEffect(() => {
		if (data.length !== 0) {
			setNameInput(data[0].parcelName)
			setSelectedProduct(data[0].products)
		}
	}, [data])

	const handleChange = (e) => {
		e.persist()
		setSelectedProduct((prevState) => {
			let update = prevState
			update[e.target.name].productQty = e.target.value
			return [...update]
		})
	}

	const handleEdit = () => {
		const data = {
			parcelId: id,
			title: nameInput,
			data: selectedProduct,
		}
		dispatch(EditPackage(data))
		setConfirmModal(!confirmModal)
		setRedirect(true)
	}

	const handleEditModal = (e) => {
		e.preventDefault()
		setConfirmModal(!confirmModal)
	}

	if (redirect) return <Redirect to='/admin/manage-product/package?edit-success=1' />
	return (
		<div>
			<form onSubmit={handleEditModal}>
				<div className='form-group'>
					<label htmlFor='packageName'>Package Name</label>
					<input
						value={nameInput}
						onChange={(e) => setNameInput(e.target.value)}
						type='text'
						className='form-control'
						id='packageName'
						placeholder='Package Name'
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='products'>Products</label>
					{selectedProduct.map((prod, index) => (
						<div key={index} className='mb-2'>
							<div>
								{prod.productName} (@Rp{prod.price.toLocaleString('id-ID')},00)
							</div>
							<div style={{ width: '20%' }}>
								<label htmlFor={`product${index}`}>Quantity</label>
								<input
									value={selectedProduct[index].productQty ? selectedProduct[index].productQty : ''}
									onChange={handleChange}
									name={index}
									id={`product${index}`}
									type='number'
									className='form-control'
									required
								/>
							</div>
							<div style={{ width: '5%' }}>
								<small
									style={{ cursor: 'pointer' }}
									onClick={() => {
										setSelectedProduct((prevState) => {
											let update = prevState
											update = update.filter((p) => p.productId !== prod.productId)
											return [...update]
										})
									}}
									className='form-text text-muted'
								>
									cancel
								</small>
							</div>
						</div>
					))}
					<div>
						<button type='button' onClick={() => setModal(!modal)} className='btn btn-info'>
							Add Product
						</button>
					</div>
				</div>
				<hr />
				<div className='row justify-content-center'>
					<button type='submit' className='btn btn-primary'>
						Submit
					</button>
				</div>
			</form>
			<CustomModal
				title='Search Product'
				confirmLabel='Close'
				oneButton={true}
				toggle={() => setModal(!modal)}
				modal={modal}
				onConfirm={() => setModal(!modal)}
				buttonColor='info'
			>
				<input
					type='text'
					className='form-control'
					placeholder='Search'
					value={search}
					onChange={(e) => {
						setSearch(e.target.value)
						debounceSearch(e.target.value)
					}}
				/>
				{search ? (
					loading ? (
						<div className='mt-3 d-flex justify-content-center'>
							<div className='spinner-border text-info' role='status'>
								<span className='sr-only'>Loading...</span>
							</div>
						</div>
					) : (
						<table className='table'>
							<tbody>
								{productData &&
									productData.map((product) => (
										<tr key={product.productId}>
											<td>{product.productName}</td>
											<td>
												<button
													type='button'
													onClick={() => {
														let findDupe = selectedProduct.find((prod) => product.productId === prod.productId)
														if (findDupe) {
															window.alert('Duplicate Product')
														} else {
															setSelectedProduct((prevState) => {
																return [...prevState, product]
															})
															setModal(!modal)
															setSearch('')
														}
													}}
													className='btn btn-info'
												>
													Add
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					)
				) : (
					<div className='mt-3 d-flex justify-content-center'>Please type to begin search.</div>
				)}
			</CustomModal>
			<CustomModal
				title='Confirm Edit Package'
				confirmLabel='Edit'
				toggle={() => setConfirmModal(!confirmModal)}
				modal={confirmModal}
				onConfirm={handleEdit}
			>
				Are you sure you want to edit this package?
			</CustomModal>
		</div>
	)
}

export default EditPackagePage
