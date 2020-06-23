import React, { useState } from 'react'
import { Input, Button, Form, FormGroup } from 'reactstrap'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { FetchManageProductData } from '../../Redux/Action'

const SearchForm = (props) => {
	const {
		setSearchInput,
		setSelectedCategory,
		setInputMaxPrice,
		setInputMinPrice,
		setSortBy,
		handleSearchQuery,
		searchInput,
		sortBy,
		selectedCategory,
		inputMaxPrice,
		inputMinPrice,
		setSearchQuery,
		setCurrentPage,
	} = props

	const [isOpen, setIsOpen] = useState(false)

	const categoryList = useSelector((state) => state.manageProduct.categoryList)
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

	const styles = {
		inputContainer: {
			display: 'flex',
			flexDirection: 'row',
			width: '100%',
			margin: '20px 0',
		},
		filterContainer: {
			width: '50%',
			margin: '20px 0',
			display: isOpen ? 'block' : 'none',
		},
		searchInput: {
			width: '50%',
		},
	}

	const dispatch = useDispatch()

	const handleSearchInput = (e) => {
		setSearchInput(e.target.value)
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
		setSearchInput('')
		setSelectedCategory(null)
		setInputMaxPrice('')
		setInputMinPrice('')
		setSortBy(null)
		setSearchQuery(false)
		setCurrentPage(0)
		dispatch(FetchManageProductData(0))
	}

	return (
		<div className='d-flex'>
			<div className='col-10'>
				<Form onSubmit={handleSearchQuery} style={styles.inputContainer}>
					<Input style={styles.searchInput} placeholder='Search by Name' onChange={handleSearchInput} value={searchInput} />
					<Button
						className='ml-2'
						color='secondary'
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
				<Form onSubmit={handleSearchQuery} style={styles.filterContainer}>
					<Select options={sortingList} placeholder='Sort By' onChange={handleSort} value={sortBy} />
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
						<Input placeholder='Min Price' type='number' name='minPrice' onChange={handleInputPrice} value={inputMinPrice} />
						-
						<Input placeholder='Max Price' name='maxPrice' type='number' onChange={handleInputPrice} value={inputMaxPrice} />
					</FormGroup>
					<Button type='submit' color='primary'>
						Search
					</Button>
					<Button className='ml-2' type='button' color='info' onClick={handleReset}>
						Reset
					</Button>
				</Form>
			</div>
			<div className='d-flex col-2 align-items-center'>
				<Link to='/admin/manage-product/add'>
					<Button>Add New Product</Button>
				</Link>
			</div>
		</div>
	)
}

export default SearchForm
