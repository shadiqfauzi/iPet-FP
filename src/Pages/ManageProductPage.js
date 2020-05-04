import React, { useEffect, useState } from 'react'
import { Table, Input, Button, Form, Container, FormGroup } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

import { FetchManageProductData } from '../Redux/Action'
import { API_URL } from '../Support/API_URL'

const ManageProductPage = () => {
	const [searchInput, setSearchInput] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [inputMaxPrice, setInputMaxPrice] = useState('')
	const [inputMinPrice, setInputMinPrice] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	const data = useSelector((state) => state.manageProduct.data)
	const categoryList = useSelector(
		(state) => state.manageProduct.categoryList
	)

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
		{ value: '38', label: 'Most Viewed' },
		{ value: '39', label: 'Most Bought' },
		{ value: '40', label: 'Least Viewed' },
		{ value: '41', label: 'Least Bought' },
		{ value: '42', label: 'Highest to Lowest Price' },
		{ value: '43', label: 'Lowest to Highest Price' },
		{ value: '44', label: 'Name Descending' },
		{ value: '45', label: 'Name Ascending' },
	]

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(FetchManageProductData())
	}, [dispatch])

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
				selectedCategory
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

	const handleReset = () => {
		// setIsOpen(false)
		setSearchInput('')
		setSelectedCategory('')
		setInputMaxPrice('')
		setInputMinPrice('')
		dispatch(FetchManageProductData())
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
					<td>
						{e.images.map((img) => (
							<div
								key={img.productImageId}
								style={{
									width: '100px',
									height: '100px',
									overflow: 'hidden',
								}}
							>
								<img
									src={API_URL + img.imagePath}
									alt='productImage'
									width='100%'
								/>
							</div>
						))}
					</td>
					<td>
						{e.category.map((cat) => (
							<div key={cat.productCategoryId}>
								{cat.category}{' '}
							</div>
						))}
					</td>
				</tr>
			)
		})
	}

	return (
		<Container>
			<h3 className='text-center mt-5'>Manage Product</h3>
			<Form onSubmit={handleSearchQuery} style={styles.inputContainer}>
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
			<Form onSubmit={handleSearchQuery} style={styles.filterContainer}>
				<Select options={sortingList} placeholder='Sort By' />
				<Select
					placeholder='Includes Category(s)'
					isMulti
					name='colors'
					options={categoryList}
					className='basic-multi-select mt-2'
					classNamePrefix='select'
					onChange={handleSelectCategory}
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
				<Button type='button' color='info' onClick={handleReset}>
					Reset
				</Button>
				<Button className='ml-2' type='submit' color='primary'>
					Search
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
						<th>Images</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>{tableBody()}</tbody>
			</Table>
		</Container>
	)
}

export default ManageProductPage
