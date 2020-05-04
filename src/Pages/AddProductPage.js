import React, { useEffect, useState } from 'react'
import {
	Container,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	CustomInput,
	FormText,
	InputGroup,
	InputGroupAddon,
} from 'reactstrap'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'

import { FetchManageProductData, AddProduct } from '../Redux/Action'
import { Redirect } from 'react-router-dom'

const AddProductPage = (props) => {
	const [productNameInput, setProductNameInput] = useState('')
	const [priceInput, setPriceInput] = useState('')
	const [stockInput, setStockInput] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [image1, setImage1] = useState({
		imageName: 'Select file...',
		imageFile: undefined,
	})
	const [image2, setImage2] = useState({
		imageName: 'Select file...',
		imageFile: undefined,
	})

	const dispatch = useDispatch()

	const handleInput = (e) => {
		if (e.target.name === 'productName') {
			setProductNameInput(e.target.value)
		} else if (e.target.name === 'price') {
			setPriceInput(e.target.value)
		} else {
			setStockInput(e.target.value)
		}
	}

	const handleSelectCategory = (selectedValue) => {
		if (selectedCategory !== null) {
			if (selectedCategory.length < 2 || selectedValue.length <= 2) {
				setSelectedCategory(selectedValue)
			}
		} else setSelectedCategory(selectedValue)
	}

	const handleImage = (e) => {
		if (e.target.files[0]) {
			if (e.target.name === 'image1') {
				setImage1({
					imageFile: e.target.files[0],
					imageName: e.target.files[0].name,
				})
			} else {
				setImage2({
					imageFile: e.target.files[0],
					imageName: e.target.files[0].name,
				})
			}
		} else {
			if (e.target.name === 'image1') {
				setImage1({
					imageName: 'Select file...',
					imageFile: undefined,
				})
			} else {
				setImage2({
					imageName: 'Select file...',
					imageFile: undefined,
				})
			}
		}
	}

	const addProduct = (e) => {
		e.preventDefault()

		let formData = new FormData()
		formData.append('image1', image1.imageFile)
		formData.append('image2', image2.imageFile)
		formData.append('productName', productNameInput)
		formData.append('price', priceInput)
		formData.append('invStock', stockInput)
		formData.append('appStock', stockInput)
		formData.append('category1', selectedCategory[0].value)
		formData.append('category2', selectedCategory[1].value)

		// for (var pair of formData.entries()) {
		// 	console.log(pair[0] + ', ' + typeof pair[1])
		// }

		dispatch(AddProduct(formData))
	}

	useEffect(() => {
		dispatch(FetchManageProductData())
	}, [dispatch])

	const categoryList = useSelector(
		(state) => state.manageProduct.categoryList
	)
	const message = useSelector((state) => state.manageProduct.message)

	if (message === 'Successfully added new product') {
		return <Redirect to='/manage-product' />
	}
	return (
		<Container>
			<h3 className='text-center mt-5'>Add Product</h3>
			<Form onSubmit={addProduct}>
				<FormGroup>
					<Label for='productName'>Product Name</Label>
					<Input
						type='text'
						name='productName'
						id='productName'
						placeholder='Diaper Anjing Kucing Polkadot'
						onChange={handleInput}
						value={productNameInput}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='price'>Price</Label>
					<InputGroup size='m'>
						<InputGroupAddon addonType='prepend'>
							Rp.
						</InputGroupAddon>
						<Input
							type='number'
							name='price'
							id='price'
							placeholder='100000'
							onChange={handleInput}
							value={priceInput}
						/>
					</InputGroup>
				</FormGroup>
				<FormGroup>
					<Label for='stock'>Initial Stock</Label>
					<Input
						type='number'
						name='stock'
						id='stock'
						placeholder='10'
						onChange={handleInput}
						value={stockInput}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='category'>Category</Label>
					<Select
						// defaultValue={[colourOptions[2], colourOptions[3]]}
						isMulti
						name='category'
						options={categoryList}
						id='category'
						className='basic-multi-select'
						classNamePrefix='select'
						placeholder='Select 2 Categories'
						onChange={handleSelectCategory}
						value={selectedCategory}
					/>
					<FormText color='muted'>
						Needs and cannot exceed 2 categories.
					</FormText>
				</FormGroup>
				<FormGroup>
					<Label for='image1'>First Image</Label>
					<CustomInput
						type='file'
						name='image1'
						id='image1'
						onChange={handleImage}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='image2'>Second Image</Label>
					<CustomInput
						type='file'
						name='image2'
						id='image2'
						onChange={handleImage}
					/>
					<FormText color='muted'>
						Only jpeg/jpg/png image format are allowed.
					</FormText>
				</FormGroup>
				<Button type='submit'>Submit</Button>
			</Form>
		</Container>
	)
}

export default AddProductPage
