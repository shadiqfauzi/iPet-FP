import React, { useState, useEffect } from 'react'
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
import { FetchCategory, AddNewCategory, EditProduct } from '../../Redux/Action'
import CustomModal from '../../Components/ManageProduct/CustomModal'
import Axios from 'axios'
import { API_URL } from '../../Support/API_URL'
import CustomLoader from '../../Components/CustomLoader'
import CustomCarousel from '../../Components/ManageProduct/CustomCarousel'
import { Redirect } from 'react-router-dom'

const EditProductPage = (props) => {
	const [productTitle, setProductTitle] = useState('')
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [isCategoryNotValid, setIsCategoryNotValid] = useState(false)
	const [userInput, setUserInput] = useState({
		productName: '',
		price: '',
		appStock: '',
		invStock: '',
		newCategory: '',
	})
	const [currentImages, setCurrentImages] = useState([])
	const [imagePreviewArr, setImagePreviewArr] = useState([])
	const [image, setImage] = useState({
		image1: {
			imageName: 'Select file...',
			imageFile: undefined,
			imagePreview: undefined,
			success: false,
			delete: false,
		},
		image2: {
			imageName: 'Select file...',
			imageFile: undefined,
			imagePreview: undefined,
			success: false,
			delete: false,
		},
		image3: {
			imageName: 'Select file...',
			imageFile: undefined,
			imagePreview: undefined,
			success: false,
			delete: false,
		},
		image4: {
			imageName: 'Select file...',
			imageFile: undefined,
			imagePreview: undefined,
			success: false,
			delete: false,
		},
		image5: {
			imageName: 'Select file...',
			imageFile: undefined,
			imagePreview: undefined,
			success: false,
			delete: false,
		},
	})
	const [finishEdit, setFinishEdit] = useState(false)

	const [modalCategory, setModalCategory] = useState(false)
	const toggleModalCategory = () => setModalCategory(!modalCategory)
	const [modalConfirm, setModalConfirm] = useState(false)
	const toggleModalConfirm = (e) => {
		if (e) {
			e.preventDefault()
			let arr = []
			for (var i = 0; i < 5; i++) {
				if (image[`image${i + 1}`].imagePreview && !image[`image${i + 1}`].delete) {
					arr.push({
						src: image[`image${i + 1}`].imagePreview,
					})
				} else {
					if (currentImages[i] && !image[`image${i + 1}`].delete) {
						arr.push({ src: API_URL + currentImages[i].imagePath })
					}
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

	const categoryList = useSelector((state) => state.manageProduct.categoryList)
	const loading = useSelector((state) => state.manageProduct.loading)

	const fetchOneProduct = async () => {
		try {
			let res = await Axios.get(`${API_URL}/manage-product/one-product/${props.match.params.id}`)
			console.log(res.data.data)
			const { productName, price, images, category, appStock, invStock } = res.data.data
			setUserInput((prevState) => ({
				...prevState,
				productName,
				price,
				appStock,
				invStock,
			}))
			let selected = category.map((val) => ({
				value: val.categoryId,
				label: val.category,
			}))
			setCurrentImages(images)
			setSelectedCategory(selected)
			setProductTitle(productName)
		} catch (err) {
			window.alert(err)
		}
	}

	useEffect(() => {
		fetchOneProduct()
	}, [])

	useEffect(() => {
		dispatch(FetchCategory())
	}, [dispatch])

	const handleInput = (e) => {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		})
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
						delete: false,
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

	const addCategory = () => {
		dispatch(AddNewCategory(userInput.newCategory))
	}

	const toggleDelete = (image, imageID) => {
		setImage((prevState) => {
			return {
				...prevState,
				[image]: {
					...prevState[image],
					delete: prevState[image].delete ? false : imageID,
				},
			}
		})
	}

	const cancelImage = (image) => {
		setImage((prevState) => {
			return {
				...prevState,
				[image]: {
					imageName: 'Select file...',
					imageFile: undefined,
					imagePreview: undefined,
					success: false,
					delete: false,
				},
			}
		})
	}

	const editProduct = () => {
		let formData = new FormData()
		let deleteImageArr = []
		for (var pair in image) {
			if (image[pair].imageFile) formData.append(`${pair}`, image[pair].imageFile)
			deleteImageArr.push(image[pair].delete)
		}
		formData.append('productName', userInput.productName)
		formData.append('price', parseInt(userInput.price))
		formData.append('invStock', parseInt(userInput.invStock))
		formData.append('appStock', parseInt(userInput.appStock))
		selectedCategory.forEach((selected, index) => {
			formData.append(`category${index + 1}`, parseInt(selected.value))
		})
		for (var i = 0; i < deleteImageArr.length; i++) {
			console.log(deleteImageArr[i])
			formData.append('deleteImageArr', deleteImageArr[i])
		}

		// for (var pairs of formData.entries()) {
		// 	console.log(pairs[0] + ', ' + pairs[1])
		// }

		dispatch(EditProduct(formData, props.match.params.id))
		toggleModalConfirm()
		setFinishEdit(true)
	}

	if (loading) {
		return <CustomLoader />
	}
	if (finishEdit) {
		return <Redirect to='/manage-product' />
	}
	return (
		<React.Fragment>
			<Container>
				<h3 className='text-center mt-5'>Edit {productTitle}</h3>
				<Form onSubmit={toggleModalConfirm}>
					<FormGroup>
						<Label for='productName'>Product Name</Label>
						<Input
							type='text'
							name='productName'
							id='productName'
							placeholder='Product Name'
							onChange={handleInput}
							value={userInput.productName}
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
								value={userInput.price}
								required
							/>
						</InputGroup>
					</FormGroup>
					<FormGroup>
						<Label for='stock'>Inventory Stock</Label>
						<Input
							type='number'
							name='invStock'
							id='invStock'
							placeholder='Inventory Stock'
							onChange={handleInput}
							value={userInput.invStock}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label for='stock'>Application Stock</Label>
						<Input
							type='number'
							name='appStock'
							id='appStock'
							placeholder='App Stock'
							onChange={handleInput}
							value={userInput.appStock}
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
						<Tooltip
							autohide={true}
							placement='bottom'
							isOpen={isCategoryNotValid && !selectedCategory}
							target='category'
						>
							Please fill out this field.
						</Tooltip>
						<FormText color='muted'>Cannot exceed 3 categories.</FormText>
					</FormGroup>
					<FormGroup>
						<Label for='image1'>First Image</Label>
						<CustomInput type='file' name='image1' id='image1' onChange={handleImage} />
						{currentImages[0] && !image.image1.imagePreview ? (
							<FormText>
								<FormText>Current Image</FormText>
								<img
									style={{ width: '10%', opacity: image.image1.delete ? '30%' : '100%' }}
									src={API_URL + currentImages[0].imagePath}
									alt='preview'
								/>
								<FormText>
									<span
										onClick={() => toggleDelete('image1', currentImages[0].productImageId)}
										style={{ width: 'auto', cursor: 'pointer' }}
									>
										{image.image1.delete ? 'Undo' : 'Delete'}
									</span>
								</FormText>
							</FormText>
						) : null}
						{image.image1.imagePreview ? (
							<FormText>
								<FormText>New Image</FormText>
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
						<Label for='image2'>Second Image</Label>
						<CustomInput type='file' name='image2' id='image2' onChange={handleImage} />
						{currentImages[1] && !image.image2.imagePreview ? (
							<FormText>
								<FormText>Current Image</FormText>
								<img
									style={{ width: '10%', opacity: image.image2.delete ? '30%' : '100%' }}
									src={API_URL + currentImages[1].imagePath}
									alt='preview'
								/>
								<FormText>
									<span
										onClick={() => toggleDelete('image2', currentImages[1].productImageId)}
										style={{ width: 'auto', cursor: 'pointer' }}
									>
										{image.image2.delete ? 'Undo' : 'Delete'}
									</span>
								</FormText>
							</FormText>
						) : null}
						{image.image2.imagePreview ? (
							<FormText>
								<FormText>New Image</FormText>
								<img style={{ width: '10%' }} src={image.image2.imagePreview} alt='preview' />
								<FormText>
									<span onClick={() => cancelImage('image2')} style={{ width: 'auto', cursor: 'pointer' }}>
										Cancel
									</span>
								</FormText>
							</FormText>
						) : null}
					</FormGroup>
					<FormGroup>
						<Label for='image3'>Third Image</Label>
						<CustomInput type='file' name='image3' id='image3' onChange={handleImage} />
						{currentImages[2] && !image.image3.imagePreview ? (
							<FormText>
								<FormText>Current Image</FormText>
								<img
									style={{ width: '10%', opacity: image.image3.delete ? '30%' : '100%' }}
									src={API_URL + currentImages[2].imagePath}
									alt='preview'
								/>
								<FormText>
									<span
										onClick={() => toggleDelete('image3', currentImages[2].productImageId)}
										style={{ width: 'auto', cursor: 'pointer' }}
									>
										{image.image3.delete ? 'Undo' : 'Delete'}
									</span>
								</FormText>
							</FormText>
						) : null}
						{image.image3.imagePreview ? (
							<FormText>
								<FormText>New Image</FormText>
								<img style={{ width: '10%' }} src={image.image3.imagePreview} alt='preview' />
								<FormText>
									<span onClick={() => cancelImage('image3')} style={{ width: 'auto', cursor: 'pointer' }}>
										Cancel
									</span>
								</FormText>
							</FormText>
						) : null}
					</FormGroup>
					<FormGroup>
						<Label for='image4'>Fourth Image</Label>
						<CustomInput type='file' name='image4' id='image4' onChange={handleImage} />
						{currentImages[3] && !image.image4.imagePreview ? (
							<FormText>
								<FormText>Current Image</FormText>
								<img
									style={{ width: '10%', opacity: image.image4.delete ? '30%' : '100%' }}
									src={API_URL + currentImages[3].imagePath}
									alt='preview'
								/>
								<FormText>
									<span
										onClick={() => toggleDelete('image4', currentImages[3].productImageId)}
										style={{ width: 'auto', cursor: 'pointer' }}
									>
										{image.image4.delete ? 'Undo' : 'Delete'}
									</span>
								</FormText>
							</FormText>
						) : null}
						{image.image4.imagePreview ? (
							<FormText>
								<FormText>New Image</FormText>
								<img style={{ width: '10%' }} src={image.image4.imagePreview} alt='preview' />
								<FormText>
									<span onClick={() => cancelImage('image4')} style={{ width: 'auto', cursor: 'pointer' }}>
										Cancel
									</span>
								</FormText>
							</FormText>
						) : null}
					</FormGroup>
					<FormGroup>
						<Label for='image5'>Fifth Image</Label>
						<CustomInput type='file' name='image5' id='image5' onChange={handleImage} />
						{currentImages[4] && !image.image5.imagePreview ? (
							<FormText>
								<FormText>Current Image</FormText>
								<img
									style={{ width: '10%', opacity: image.image5.delete ? '30%' : '100%' }}
									src={API_URL + currentImages[4].imagePath}
									alt='preview'
								/>
								<FormText>
									<span
										onClick={() => toggleDelete('image5', currentImages[4].productImageId)}
										style={{ width: 'auto', cursor: 'pointer' }}
									>
										{image.image5.delete ? 'Undo' : 'Delete'}
									</span>
								</FormText>
							</FormText>
						) : null}
						{image.image5.imagePreview ? (
							<FormText>
								<FormText>New Image</FormText>
								<img style={{ width: '10%' }} src={image.image5.imagePreview} alt='preview' />
								<FormText>
									<span onClick={() => cancelImage('image5')} style={{ width: 'auto', cursor: 'pointer' }}>
										Cancel
									</span>
								</FormText>
							</FormText>
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
					value={userInput.newCategory}
				/>
			</CustomModal>
			<CustomModal
				toggle={toggleModalConfirm}
				modal={modalConfirm}
				title='Confirm Edit Product'
				onConfirm={() => {
					editProduct()
				}}
				confirmLabel='Save'
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
					<strong>Product Name:</strong> {userInput.productName}
				</p>
				<p>
					<strong>Price:</strong> {userInput.price}
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
					<strong>Inventory Stock:</strong> {userInput.invStock}
				</p>
				<p>
					<strong>App Stock:</strong> {userInput.invStock}
				</p>
			</CustomModal>
		</React.Fragment>
	)
}

export default EditProductPage
