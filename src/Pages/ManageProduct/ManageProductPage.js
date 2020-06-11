import React, { useEffect, useState } from 'react'
import { Table, Container, Alert } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'

import { FetchManageProductData } from '../../Redux/Action'

import ManageProductPagination from '../../Components/ManageProduct/ManageProductPagination'
import CustomLoader from '../../Components/CustomLoader'
import MainTableBody from '../../Components/ManageProduct/MainTableBody'
import DeleteModal from '../../Components/ManageProduct/DeleteModal'
import SearchForm from '../../Components/ManageProduct/SearchForm'

const ManageProductPage = (props) => {
	const [searchInput, setSearchInput] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [inputMaxPrice, setInputMaxPrice] = useState('')
	const [inputMinPrice, setInputMinPrice] = useState('')
	const [sortBy, setSortBy] = useState('')
	const [deleteProductName, setDeleteProductName] = useState('')
	const [alertWindow, setAlertWindow] = useState(true)
	const [modalDelete, setModalDelete] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [searchQuery, setSearchQuery] = useState(false)

	const toggleModalDelete = () => setModalDelete(!modalDelete)

	const data = useSelector((state) => state.manageProduct.data)
	const loading = useSelector((state) => state.manageProduct.loading)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(FetchManageProductData(0))
	}, [dispatch])

	useEffect(() => {
		window.scrollTo(0, 0)
		setTimeout(() => {
			setAlertWindow(false)
		}, 5000)
	}, [props.location.state])

	const handleSearchQuery = (e) => {
		e.preventDefault()
		dispatch(
			FetchManageProductData(
				0,
				searchInput,
				inputMinPrice,
				inputMaxPrice,
				selectedCategory,
				sortBy !== null ? sortBy.value : undefined
			)
		)
		setCurrentPage(0)
		setSearchQuery(true)
	}

	const handlePage = (page) => {
		if(!searchQuery){
			dispatch(FetchManageProductData(page))
		}else{
			dispatch( 	
				FetchManageProductData(
					page,
					searchInput,
					inputMinPrice,
					inputMaxPrice,
					selectedCategory,
					sortBy !== null ? sortBy.value : undefined
				)
			)
		}
	}

	const tableBody = () => {
		return data.map((e, index) => {
			return <MainTableBody key={index} e={e} toggleModalDelete={toggleModalDelete} setDeleteProductName={setDeleteProductName} />
		})
	}

	return (
		<React.Fragment>
			{loading && <CustomLoader />}
			<Container>
				{props.location.state && alertWindow ? (
					<Alert isOpen={alertWindow} className='mt-2' color='success'>
						{props.location.state.alert}
					</Alert>
				) : null}
				<h3 className='text-center mt-5'>Manage Product</h3>
				<SearchForm
					currentPage={currentPage}
					setSearchInput={setSearchInput}
					setSelectedCategory={setSelectedCategory}
					setInputMaxPrice={setInputMaxPrice}
					setInputMinPrice={setInputMinPrice}
					setSortBy={setSortBy}
					handleSearchQuery={handleSearchQuery}
					searchInput={searchInput}
					sortBy={sortBy}
					selectedCategory={selectedCategory}
					inputMaxPrice={inputMaxPrice}
					inputMinPrice={inputMinPrice}
					setSearchQuery={setSearchQuery}
					setCurrentPage={setCurrentPage}
				/>
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
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						handlePage={handlePage}
					/>
				</div>
			</Container>
			<DeleteModal
				toggleModalDelete={toggleModalDelete}
				modalDelete={modalDelete}
				deleteProductName={deleteProductName}
				setModalDelete={setModalDelete}
			/>
		</React.Fragment>
	)
}

export default ManageProductPage
