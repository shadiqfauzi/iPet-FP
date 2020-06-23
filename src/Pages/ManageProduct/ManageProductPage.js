import React, { useEffect, useState } from 'react'
import { Table, Container, Alert } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

import { FetchManageProductData } from '../../Redux/Action'
import ManageProductPagination from '../../Components/ManageProduct/ManageProductPagination'
import CustomLoader from '../../Components/CustomLoader'
import MainTableBody from '../../Components/ManageProduct/MainTableBody'
import DeleteModal from '../../Components/ManageProduct/DeleteModal'
import SearchForm from '../../Components/ManageProduct/SearchForm'

const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}

const ManageProductPage = (props) => {
	let query = useQuery()
	let editSuccess = query.get('edit-success') ? true : false
	let addSuccess = query.get('add-success') ? true : false

	const [searchInput, setSearchInput] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [inputMaxPrice, setInputMaxPrice] = useState('')
	const [inputMinPrice, setInputMinPrice] = useState('')
	const [sortBy, setSortBy] = useState('')
	const [deleteProductName, setDeleteProductName] = useState('')
	const [modalDelete, setModalDelete] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [searchQuery, setSearchQuery] = useState(false)
	const [editAlert, setEditAlert] = useState(editSuccess)
	const [addAlert, setAddAlert] = useState(addSuccess)

	const toggleModalDelete = () => setModalDelete(!modalDelete)

	const data = useSelector((state) => state.manageProduct.data)
	const loading = useSelector((state) => state.manageProduct.loading)
	const error = useSelector((state) => state.manageProduct.error)

	const dispatch = useDispatch()

	useEffect(() => {
		window.scrollTo(0, 0)
		dispatch(FetchManageProductData(0))
	}, [dispatch])

	const handleSearchQuery = (e) => {
		e.preventDefault()
		dispatch(FetchManageProductData(0, searchInput, inputMinPrice, inputMaxPrice, selectedCategory, sortBy !== null ? sortBy.value : undefined))
		setCurrentPage(0)
		setSearchQuery(true)
	}

	const handlePage = (page) => {
		if (!searchQuery) {
			dispatch(FetchManageProductData(page))
		} else {
			dispatch(
				FetchManageProductData(page, searchInput, inputMinPrice, inputMaxPrice, selectedCategory, sortBy !== null ? sortBy.value : undefined)
			)
		}
	}

	const tableBody = () => {
		if (data.length === 0)
			return (
				<tr>
					<td colSpan='11'>
						<div className='d-flex justify-content-center'>
							<h4>Product Not Found</h4>
						</div>
					</td>
				</tr>
			)
		return data.map((e, index) => {
			return <MainTableBody key={index} e={e} toggleModalDelete={toggleModalDelete} setDeleteProductName={setDeleteProductName} />
		})
	}

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
			footer: '<a href="#">Refresh Page</a>',
		})
	}
	return (
		<React.Fragment>
			<Container>
				<Alert isOpen={addAlert} toggle={() => setAddAlert(!addAlert)} className='mt-2' color='success'>
					Successfully added new product
				</Alert>
				<Alert isOpen={editAlert} toggle={() => setEditAlert(!editAlert)} className='mt-2' color='success'>
					Product successfully edited.
				</Alert>
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
				{loading ? (
					<CustomLoader />
				) : (
					<React.Fragment>
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
					</React.Fragment>
				)}
			</Container>
			<DeleteModal
				toggleModalDelete={toggleModalDelete}
				modalDelete={modalDelete}
				deleteProductName={deleteProductName}
				setModalDelete={setModalDelete}
				setCurrentPage={setCurrentPage}
			/>
		</React.Fragment>
	)
}

export default ManageProductPage
