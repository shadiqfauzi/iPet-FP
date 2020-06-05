import React, { useEffect, useState } from 'react'
import {
	Table,
	Input,
	Button,
	Form,
	Container,
	FormGroup,
	Alert,
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import Loader from 'react-loader-spinner'

import {
	FetchManageProductData,
	DeleteManageProductData,
} from '../../Redux/Action'
import { API_URL } from '../../Support/API_URL'

import CustomModal from '../../Components/ManageProduct/CustomModal'
import CustomCarousel from '../../Components/ManageProduct/CustomCarousel'
import ManageProductPagination from '../../Components/ManageProduct/ManageProductPagination'
import { Redirect, Link } from 'react-router-dom'
import CustomLoader from '../../Components/CustomLoader'

const ManageProductPage = (props) => {
	console.log(props.location.state)
	const [searchInput, setSearchInput] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [inputMaxPrice, setInputMaxPrice] = useState('')
	const [inputMinPrice, setInputMinPrice] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [deleteProductName, setDeleteProductName] = useState('')
	const [sortBy, setSortBy] = useState('')

	const [alertWindow, setAlertWindow] = useState(true)
	const [modalDelete, setModalDelete] = useState(false)
	const toggleModalDelete = () => setModalDelete(!modalDelete)
	const [modalDeleteSuccess, setModalDeleteSuccess] = useState(false)
	const toggleModalDeleteSuccess = () =>
		setModalDeleteSuccess(!modalDeleteSuccess)

	// pagination
	// eslint-disable-next-line
	let [currentPage, setCurrentPage] = useState(1)
	const totalActiveProducts = useSelector(
		(state) => state.manageProduct.totalActiveProducts
	)

	const data = useSelector((state) => state.manageProduct.data)
	const categoryList = useSelector(
		(state) => state.manageProduct.categoryList
	)
	const loading = useSelector((state) => state.manageProduct.loading)

	// Pindahin entar CSS nya
	const styles = {
		inputContainer: {
			display: 'flex',
			flexDirection: 'row',
			width: '40%',
			margin: '20px 0',
		},
		filterContainer: {
			width: '50%',
			margin: '20px 0',
			display: isOpen ? 'block' : 'none',
		},
	}

	const sortingList = [
		{ value: 'views desc', label: 'Most Viewed' },
		{ value: 'views asc', label: 'Least Viewed' },
		{ value: 'totalPurchased desc', label: 'Most Purchased' },
		{ value: 'totalPurchased asc', label: 'Least Purchased' },
		{ value: 'price desc', label: 'Highest to Lowest Price' },
		{ value: 'price asc', label: 'Lowest to Highest Price' },
		{ value: 'productName desc', label: 'Product Name Z-a' },
		{ value: 'productName asc', label: 'Product Name a-Z' },
	]

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(FetchManageProductData())
	}, [dispatch])

	useEffect(() => {
		window.scrollTo(0, 0)
		setTimeout(() => {
			setAlertWindow(false)
		}, 5000)
	}, [props.location.state])

	const handleSearchInput = (e) => {
		setSearchInput(e.target.value)
	}

	const handleSearchQuery = (e) => {
		e.preventDefault()
		dispatch(
			FetchManageProductData(
				searchInput,
				inputMinPrice,
				inputMaxPrice,
				selectedCategory,
				sortBy !== null ? sortBy.value : undefined
			)
		)
	}

	const handleSelectCategory = (selectedValue) => {
		setSelectedCategory(selectedValue)
	}

	const handleInputPrice = (e) => {
		if (e.target.name === 'minPrice') {
			setInputMinPrice(e.target.value)
		} else {
			setInputMaxPrice(e.target.value)
		}
	}

	const handleSort = (selectedSort) => {
		setSortBy(selectedSort)
	}

	const handleReset = () => {
		// setIsOpen(false)
		setSearchInput('')
		setSelectedCategory(null)
		setInputMaxPrice('')
		setInputMinPrice('')
		setSortBy(null)
		dispatch(FetchManageProductData())
	}

	const handleDelete = (id) => {
		dispatch(DeleteManageProductData(id))
		setModalDelete(false)
	}

	const tableBody = () => {
		return data.map((e) => {
			return (
				<tr key={e.productId}>
					<td>{e.productId}</td>
					<td>{e.productName}</td>
					<td>{e.price}</td>
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
							<div key={cat.productCategoryId}>
								{cat.category}{' '}
							</div>
						))}
					</td>
					<td>
						<Link to={`/edit-product/${e.productId}`}>
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
		})
	}

	if (loading) {
		return <CustomLoader />
	}
	return (
		<React.Fragment>
			<Container>
				{props.location.state && alertWindow ? (
					<Alert
						isOpen={alertWindow}
						className='mt-2'
						color='success'
					>
						{props.location.state.alert}
					</Alert>
				) : null}
				<h3 className='text-center mt-5'>Manage Product</h3>
				<Form
					onSubmit={handleSearchQuery}
					style={styles.inputContainer}
				>
					<Input
						placeholder='Search by Name'
						onChange={handleSearchInput}
						value={searchInput}
					/>
					<Button
						className='ml-2'
						color='secondary'
						style={{ width: '50%' }}
						type='button'
						onClick={() => {
							setIsOpen(!isOpen)
						}}
					>
						{isOpen ? 'Hide Filters' : 'Show Filters'}
					</Button>
					{!isOpen ? (
						<Button className='ml-2' type='submit' color='primary'>
							Search
						</Button>
					) : null}
				</Form>
				<Form
					onSubmit={handleSearchQuery}
					style={styles.filterContainer}
				>
					<Select
						options={sortingList}
						placeholder='Sort By'
						onChange={handleSort}
						value={sortBy}
					/>
					<Select
						placeholder='Includes Category(s)'
						isMulti
						name='colors'
						options={categoryList}
						className='basic-multi-select mt-2'
						classNamePrefix='select'
						onChange={handleSelectCategory}
						value={selectedCategory}
					/>
					<FormGroup className='mt-2' style={{ display: 'flex' }}>
						<Input
							placeholder='Min Price'
							type='number'
							name='minPrice'
							onChange={handleInputPrice}
							value={inputMinPrice}
						/>
						-
						<Input
							placeholder='Max Price'
							name='maxPrice'
							type='number'
							onChange={handleInputPrice}
							value={inputMaxPrice}
						/>
					</FormGroup>
					<Button type='submit' color='primary'>
						Search
					</Button>
					<Button
						className='ml-2'
						type='button'
						color='info'
						onClick={handleReset}
					>
						Reset
					</Button>
				</Form>
				<Table>
					<thead>
						<tr>
							<th>Product ID</th>
							<th>Product Name</th>
							<th>Price</th>
							<th>Inv Stock</th>
							<th>App Stock</th>
							<th>Total Views</th>
							<th>Total Purchased</th>
							<th>Images</th>
							<th>Category</th>
							<th colSpan='2'>Action</th>
						</tr>
					</thead>
					<tbody>{tableBody()}</tbody>
				</Table>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<ManageProductPagination
						className='justify-content'
						totalActiveProducts={totalActiveProducts}
						currentPage={currentPage}
					/>
				</div>
			</Container>
			<CustomModal
				toggle={toggleModalDelete}
				modal={modalDelete}
				title='Are You Sure To Delete This Product?'
				onConfirm={() => {
					handleDelete(deleteProductName.productId)
					toggleModalDeleteSuccess()
				}}
				confirmLabel='Delete'
			>
				{deleteProductName ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<CustomCarousel
							ride={false}
							interval={false}
							images={deleteProductName.images.map((img) => ({
								src: API_URL + img.imagePath,
							}))}
						/>
					</div>
				) : null}
				<hr />
				<p>
					<strong>Product Id:</strong> {deleteProductName.productId}
				</p>
				<p>
					<strong>Product Name:</strong>{' '}
					{deleteProductName.productName}
				</p>
				<p>
					<strong>Price:</strong> {deleteProductName.price}
				</p>
				<p>
					<strong>Category:</strong>{' '}
					{deleteProductName.category
						? deleteProductName.category.map((val, i) =>
								deleteProductName.category.length - 1 !== i
									? val.category + ', '
									: val.category
						  )
						: null}
				</p>
				<p>
					<strong>Inv Stock:</strong> {deleteProductName.invStock}
				</p>
				<p>
					<strong>App Stock:</strong> {deleteProductName.appStock}
				</p>
			</CustomModal>
			<CustomModal
				toggle={toggleModalDeleteSuccess}
				modal={modalDeleteSuccess}
				title='Success'
				onConfirm={toggleModalDeleteSuccess}
				confirmLabel='OK'
				oneButton={true}
			>
				Successfully deleted {deleteProductName.productName}
			</CustomModal>
		</React.Fragment>
	)
}

export default ManageProductPage
