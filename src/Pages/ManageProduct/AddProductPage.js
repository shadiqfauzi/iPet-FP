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
	Tooltip,
} from 'reactstrap'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { AddProduct, AddNewCategory, FetchCategory } from '../../Redux/Action'
import { Redirect } from 'react-router-dom'

import CustomModal from '../../Components/ManageProduct/CustomModal'
import CustomCarousel from '../../Components/ManageProduct/CustomCarousel'
import CustomLoader from '../../Components/CustomLoader'

const AddProductPage = (props) => {
	const [productNameInput, setProductNameInput] = useState('')
	const [priceInput, setPriceInput] = useState('')
	const [stockInput, setStockInput] = useState('')
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [isCategoryNotValid, setIsCategoryNotValid] = useState(false)
	const [imagePreviewArr, setImagePreviewArr] = useState([])
	const [image, setImage] = useState({
		image1: {
			imageName: 'Select file...',
			imageFile: undefined,
			imagePreview: undefined,
			success: false,
		},
		image2: {
			imageName: 'Select file...',
			imageFile: undefined,
			imagePreview: undefined,
			success: false,
		},
		image3: {
			imageName: 'Select file...',
			imageFile: undefined,
			imagePreview: undefined,
			success: false,
		},
		image4: {
			imageName: 'Select file...',
			imageFile: undefined,
			imagePreview: undefined,
			success: false,
		},
		image5: {
			imageName: 'Select file...',
			imageFile: undefined,
			imagePreview: undefined,
			success: false,
		},
	})
	const [newCategoryInput, setNewCategoryInput] = useState('')

	const [modalCategory, setModalCategory] = useState(false)
	const toggleModalCategory = () => setModalCategory(!modalCategory)

	const [modalConfirm, setModalConfirm] = useState(false)
	const toggleModalConfirm = (e) => {
		if (e) {
			e.preventDefault()
			let arr = []
			for (var keys in image) {
				if (image[keys].imagePreview) {
					arr.push({
						src: image[keys].imagePreview,
					})
				}
			}
			setImagePreviewArr(arr)
		}
		if (selectedCategory) {
			setModalConfirm(!modalConfirm)
		} else {
			setIsCategoryNotValid(true)
			window.scrollTo(0, 0)
		}
	}

	const dispatch = useDispatch()

	const handleInput = (e) => {
		if (e.target.name === 'productName') {
			setProductNameInput(e.target.value)
		} else if (e.target.name === 'price') {
			setPriceInput(e.target.value)
		} else if (e.target.name === 'stock') {
			setStockInput(e.target.value)
		} else {
			setNewCategoryInput(e.target.value)
		}
	}

	const handleSelectCategory = (selectedValue) => {
		if (selectedCategory !== null) {
			if (selectedCategory.length < 3 || selectedValue.length <= 3) {
				setSelectedCategory(selectedValue)
			}
		} else setSelectedCategory(selectedValue)
	}

	const handleImage = (e) => {
		e.persist()
		if (e.target.files[0]) {
			setImage((prevState) => {
				return {
					...prevState,
					[e.target.name]: {
						imageFile: e.target.files[0],
						imageName: e.target.files[0].name,
						imagePreview: URL.createObjectURL(e.target.files[0]),
						success: true,
					},
				}
			})
		} else {
			setImage((prevState) => {
				return {
					...prevState,
					[e.target.name]: prevState[e.target.name],
				}
			})
		}
	}

	const cancelImage = (image) => {
		setImage((prevState) => {
			return {
				...prevState,
				[image]: {
					imageName: 'Select file...',
					imageFile: undefined,
					imagePreview: undefined,
					success: true,
					delete: false,
				},
			}
		})
	}

	const addProduct = () => {
		let formData = new FormData()
		for (var pair in image) {
			if (image[pair].imageFile) formData.append(`${pair}`, image[pair].imageFile)
		}
		formData.append('productName', productNameInput)
		formData.append('price', priceInput)
		formData.append('invStock', stockInput)
		formData.append('appStock', stockInput)
		selectedCategory.forEach((selected, index) => {
			formData.append(`category${index + 1}`, selected.value)
		})

		// for (var pairs of formData.entries()) {
		// 	console.log(pairs[0] + ', ' + pairs[1])
		// }

		dispatch(AddProduct(formData))
	}

	const addCategory = () => {
		dispatch(AddNewCategory(newCategoryInput))
	}

	useEffect(() => {
		dispatch(FetchCategory())
	}, [dispatch])

	const categoryList = useSelector((state) => state.manageProduct.categoryList)
	const loading = useSelector((state) => state.manageProduct.loading)

	const message = useSelector((state) => state.manageProduct.message)

	console.log(selectedCategory)

	if (loading) {
		return <CustomLoader />
	}
	if (message === 'Successfully added new product') {
		if (modalConfirm === true) {
			setModalConfirm(false)
		}
		return <Redirect to={{ pathname: '/manage-product', state: { alert: message } }} />
	}
	return (
		<React.Fragment>
			<Container>
				<h3 className='text-center mt-5'>Add Product</h3>
				<Form onSubmit={toggleModalConfirm}>
					<FormGroup>
						<Label for='productName'>Product Name</Label>
						<Input
							type='text'
							name='productName'
							id='productName'
							placeholder='Product Name'
							onChange={handleInput}
							value={productNameInput}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label for='price'>Price</Label>
						<InputGroup size='m'>
							<InputGroupAddon addonType='prepend'>Rp.</InputGroupAddon>
							<Input
								type='number'
								name='price'
								id='price'
								placeholder='Price'
								onChange={handleInput}
								value={priceInput}
								required
							/>
						</InputGroup>
					</FormGroup>
					<FormGroup>
						<Label for='stock'>Initial Stock</Label>
						<Input
							type='number'
							name='stock'
							id='stock'
							placeholder='Stock'
							onChange={handleInput}
							value={stockInput}
							required
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
							placeholder='Select 1 or more categories'
							onChange={handleSelectCategory}
							value={selectedCategory}
							noOptionsMessage={() => (
								<div>
									<p>No such category.</p>
									<Button onClick={toggleModalCategory}>Add a new category.</Button>
								</div>
							)}
						/>
						{isCategoryNotValid && (
							<Tooltip
								autohide={true}
								placement='bottom'
								isOpen={isCategoryNotValid && !selectedCategory}
								target='category'
							>
								Please fill out this field.
							</Tooltip>
						)}
						<FormText color='muted'>Cannot Exceed 3 Categories.</FormText>
					</FormGroup>
					<FormGroup>
						<Label for='image1'>First Image</Label>
						<CustomInput type='file' name='image1' id='image1' onChange={handleImage} required />
						{!image.image1.success && <FormText color='muted'>Please Provide Minimum Of 1 Photo.</FormText>}
						{image.image1.imagePreview ? (
							<FormText>
								<img style={{ width: '10%' }} src={image.image1.imagePreview} alt='preview' />
								<FormText>
									<span onClick={() => cancelImage('image1')} style={{ width: 'auto', cursor: 'pointer' }}>
										Cancel
									</span>
								</FormText>
							</FormText>
						) : null}
					</FormGroup>
					<FormGroup>
						{image.image1.success ? (
							<React.Fragment>
								<Label for='image2'>Second Image</Label>
								<CustomInput type='file' name='image2' id='image2' onChange={handleImage} />
								{image.image2.imagePreview ? (
									<FormText>
										<img style={{ width: '10%' }} src={image.image2.imagePreview} alt='preview' />
										<FormText>
											<span
												onClick={() => cancelImage('image2')}
												style={{ width: 'auto', cursor: 'pointer' }}
											>
												Cancel
											</span>
										</FormText>
									</FormText>
								) : null}
							</React.Fragment>
						) : null}
					</FormGroup>
					<FormGroup>
						{image.image2.success ? (
							<React.Fragment>
								<Label for='image3'>Third Image</Label>
								<CustomInput type='file' name='image3' id='image3' onChange={handleImage} />
								{image.image3.imagePreview ? (
									<FormText>
										<img style={{ width: '10%' }} src={image.image3.imagePreview} alt='preview' />
										<FormText>
											<span
												onClick={() => cancelImage('image3')}
												style={{ width: 'auto', cursor: 'pointer' }}
											>
												Cancel
											</span>
										</FormText>
									</FormText>
								) : null}
							</React.Fragment>
						) : null}
					</FormGroup>
					<FormGroup>
						{image.image3.success ? (
							<React.Fragment>
								<Label for='image4'>Fourth Image</Label>
								<CustomInput type='file' name='image4' id='image4' onChange={handleImage} />
								{image.image4.imagePreview ? (
									<FormText>
										<img style={{ width: '10%' }} src={image.image4.imagePreview} alt='preview' />
										<FormText>
											<span
												onClick={() => cancelImage('image4')}
												style={{ width: 'auto', cursor: 'pointer' }}
											>
												Cancel
											</span>
										</FormText>
									</FormText>
								) : null}
							</React.Fragment>
						) : null}
					</FormGroup>
					<FormGroup>
						{image.image4.success ? (
							<React.Fragment>
								<Label for='image5'>Fifth Image</Label>
								<CustomInput type='file' name='image5' id='image5' onChange={handleImage} />
								{image.image5.imagePreview ? (
									<FormText>
										<img style={{ width: '10%' }} src={image.image5.imagePreview} alt='preview' />
										<FormText>
											<span
												onClick={() => cancelImage('image5')}
												style={{ width: 'auto', cursor: 'pointer' }}
											>
												Cancel
											</span>
										</FormText>
									</FormText>
								) : null}
							</React.Fragment>
						) : null}
					</FormGroup>
					<FormGroup>
						<FormText color='muted'>Only jpeg/jpg/png image format are allowed. Max 5 pictures.</FormText>
					</FormGroup>
					<Button type='submit'>Submit</Button>
				</Form>
			</Container>
			<CustomModal
				toggle={toggleModalCategory}
				modal={modalCategory}
				title='Add New Category'
				onConfirm={() => {
					toggleModalCategory()
					addCategory()
				}}
				confirmLabel='Add'
			>
				<Label for='newCategory'>New Category</Label>
				<Input
					type='text'
					name='newCategory'
					id='newCategory'
					placeholder='Category'
					onChange={handleInput}
					value={newCategoryInput}
				/>
			</CustomModal>
			<CustomModal
				toggle={toggleModalConfirm}
				modal={modalConfirm}
				title='Confirm Add New Product'
				onConfirm={() => {
					addProduct()
				}}
				confirmLabel='Add'
			>
				{toggleModalConfirm ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<CustomCarousel ride={false} interval={false} images={imagePreviewArr} />
					</div>
				) : null}
				<hr />
				<p>
					<strong>Product Name:</strong> {productNameInput}
				</p>
				<p>
					<strong>Price:</strong> {priceInput}
				</p>
				<p>
					<strong>Category:</strong>{' '}
					{selectedCategory
						? selectedCategory.map((val, i) =>
								selectedCategory.length - 1 !== i ? val.label + ', ' : val.label
						  )
						: null}
				</p>
				<p>
					<strong>Stock:</strong> {stockInput}
				</p>
			</CustomModal>
		</React.Fragment>
	)
}

export default AddProductPage
