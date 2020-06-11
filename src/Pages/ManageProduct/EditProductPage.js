import React, { useState, useEffect, useCallback } from 'react'
import { Container, Label, Input } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

import { FetchCategory, AddNewCategory, EditProduct } from '../../Redux/Action'
import CustomModal from '../../Components/ManageProduct/CustomModal'
import { API_URL } from '../../Support/API_URL'
import CustomLoader from '../../Components/CustomLoader'
import CustomCarousel from '../../Components/ManageProduct/CustomCarousel'
import EditProductForm from '../../Components/ManageProduct/EditProductForm'

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

	const fetchOneProduct = useCallback(async () => {
		try {
			let res = await Axios.get(`${API_URL}/manage-product/one-product/${props.match.params.id}`)
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
	}, [props.match.params.id])

	useEffect(() => {
		fetchOneProduct()
	}, [fetchOneProduct])

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
			formData.append('deleteImageArr', deleteImageArr[i])
		}
		dispatch(EditProduct(formData, props.match.params.id))
		toggleModalConfirm()
		setFinishEdit(true)
	}

	if (loading) return <CustomLoader />
	if (finishEdit) return <Redirect to='/manage-product' />
	return (
		<React.Fragment>
			<Container>
				<h3 className='text-center mt-5'>Edit {productTitle}</h3>
				<EditProductForm
				toggleModalConfirm={toggleModalConfirm}
				handleInput={handleInput}
				userInput={userInput}
				categoryList={categoryList}
				handleSelectCategory={handleSelectCategory}
				selectedCategory={selectedCategory}
				toggleModalCategory={toggleModalCategory}
				isCategoryNotValid={isCategoryNotValid}
				handleImage={handleImage}
				currentImages={currentImages}
				image={image}
				toggleDelete={toggleDelete}
				cancelImage={cancelImage}
				/>
			</Container>
			<CustomModal
				toggle={toggleModalCategory}
				modal={modalCategory}
				title='Add New Category'
				onConfirm={() => {
					toggleModalCategory()
					dispatch(AddNewCategory(userInput.newCategory))
				}}
				confirmLabel='Add'
			>
				<Label for='newCategory'>New Category</Label>
				<Input type='text' name='newCategory' id='newCategory' placeholder='Category' onChange={handleInput} value={userInput.newCategory} />
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
					{selectedCategory ? selectedCategory.map((val, i) => (selectedCategory.length - 1 !== i ? val.label + ', ' : val.label)) : null}
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