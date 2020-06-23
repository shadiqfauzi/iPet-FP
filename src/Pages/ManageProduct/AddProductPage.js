import React, { useEffect, useState } from 'react'
import { Container, Label, Input } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AddProduct, AddNewCategory, FetchCategory } from '../../Redux/Action'
import { Redirect } from 'react-router-dom'

import CustomModal from '../../Components/ManageProduct/CustomModal'
import CustomCarousel from '../../Components/ManageProduct/CustomCarousel'
import CustomLoader from '../../Components/CustomLoader'
import AddProductForm from '../../Components/ManageProduct/AddProductForm'
import ImageState from '../../Models/image-state'

const AddProductPage = (props) => {
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [userInput, setUserInput] = useState({
		productName: '',
		price: '',
		stock: '',
		newCategory: '',
		productDescription: '',
	})
	const [isCategoryNotValid, setIsCategoryNotValid] = useState(false)
	const [imagePreviewArr, setImagePreviewArr] = useState([])
	const [image, setImage] = useState({
		image0: { success: true },
		image1: new ImageState(),
		image2: new ImageState(),
		image3: new ImageState(),
		image4: new ImageState(),
		image5: new ImageState(),
	})
	const [finishAdd, setFinishAdd] = useState(false)

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
		setUserInput({
			...userInput,
			[e.target.id]: e.target.value,
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

	const cancelImage = (imageNumber) => {
		setImage({
			...image,
			[imageNumber]: {
				imageName: 'Select file...',
				imageFile: undefined,
				imagePreview: undefined,
				success: true,
			},
		})
	}

	const addProduct = () => {
		let formData = new FormData()
		for (var pair in image) {
			if (image[pair].imageFile) formData.append(`${pair}`, image[pair].imageFile)
		}
		formData.append('productName', userInput.productName)
		formData.append('price', userInput.price)
		formData.append('invStock', userInput.stock)
		formData.append('appStock', userInput.stock)
		formData.append('productDescription', userInput.productDescription)
		for (const [index, selected] of selectedCategory.entries()) {
			formData.append(`category${index + 1}`, selected.value)
		}
		dispatch(AddProduct(formData))
		setFinishAdd(true)
	}

	const addCategory = () => {
		dispatch(AddNewCategory(userInput.newCategory))
	}

	useEffect(() => {
		window.scrollTo(0, 0)
		dispatch(FetchCategory())
	}, [dispatch])

	const categoryList = useSelector((state) => state.manageProduct.categoryList)
	const loading = useSelector((state) => state.manageProduct.loading)

	if (loading) {
		return <CustomLoader />
	} else if (finishAdd) {
		if (modalConfirm === true) {
			setModalConfirm(false)
		}
		return <Redirect to='/admin/manage-product?add-success=1' />
	} else {
		return (
			<React.Fragment>
				<Container>
					<h3 className='text-center mt-5'>Add Product</h3>
					<AddProductForm
						toggleModalConfirm={toggleModalConfirm}
						handleInput={handleInput}
						userInput={userInput}
						categoryList={categoryList}
						handleSelectCategory={handleSelectCategory}
						selectedCategory={selectedCategory}
						toggleModalCategory={toggleModalCategory}
						isCategoryNotValid={isCategoryNotValid}
						handleImage={handleImage}
						image={image}
						cancelImage={cancelImage}
					/>
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
						<strong>Product Name:</strong> {userInput.productName}
					</p>
					<p>
						<strong>Product Description:</strong> {userInput.productDescription}
					</p>
					<p>
						<strong>Price:</strong> {userInput.price}
					</p>
					<p>
						<strong>Category:</strong>{' '}
						{selectedCategory
							? selectedCategory.map((val, i) => (selectedCategory.length - 1 !== i ? val.label + ', ' : val.label))
							: null}
					</p>
					<p>
						<strong>Stock:</strong> {userInput.stock}
					</p>
				</CustomModal>
			</React.Fragment>
		)
	}
}

export default AddProductPage
