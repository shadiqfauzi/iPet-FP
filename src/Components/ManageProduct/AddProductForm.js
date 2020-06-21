import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon, Tooltip } from 'reactstrap'
import Select from 'react-select'
import AddImageForm from './AddImageForm'

const AddProductForm = (props) => {
	const {
		toggleModalConfirm,
		handleInput,
		categoryList,
		handleSelectCategory,
		selectedCategory,
		toggleModalCategory,
		isCategoryNotValid,
		handleImage,
		image,
		cancelImage,
		userInput,
	} = props

	const renderImageForm = () => {
		return Object.keys(image).map((key, index) =>
			index !== 5 ? <AddImageForm key={index} image={image} handleImage={handleImage} index={index} cancelImage={cancelImage} /> : null
		)
	}

	renderImageForm()

	return (
		<Form onSubmit={toggleModalConfirm}>
			<FormGroup>
				<Label for='productName'>Product Name</Label>
				<Input type='text' id='productName' placeholder='Product Name' onChange={handleInput} value={userInput.productName} required />
			</FormGroup>
			<FormGroup>
				<Label for='productDescription'>Product Description</Label>
				<textarea
					maxLength='2000'
					name='productDescription'
					id='productDescription'
					placeholder='Product Description'
					onChange={handleInput}
					value={userInput.productDescription}
					required
					className='form-control'
					rows='5'
				/>
			</FormGroup>
			<FormGroup>
				<Label for='price'>Price</Label>
				<InputGroup size='m'>
					<InputGroupAddon addonType='prepend'>Rp.</InputGroupAddon>
					<Input type='number' id='price' placeholder='Price' onChange={handleInput} value={userInput.price} required />
				</InputGroup>
			</FormGroup>
			<FormGroup>
				<Label for='stock'>Initial Stock</Label>
				<Input type='number' id='stock' placeholder='Stock' onChange={handleInput} value={userInput.stock} required />
			</FormGroup>
			<FormGroup>
				<Label for='category'>Category</Label>
				<Select
					isMulti
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
					<Tooltip autohide={true} placement='bottom' isOpen={isCategoryNotValid && !selectedCategory} target='category'>
						Please fill out this field.
					</Tooltip>
				)}
				<FormText color='muted'>Cannot Exceed 3 Categories.</FormText>
			</FormGroup>
			{renderImageForm()}
			<FormGroup>
				{!image.image1.success && <FormText color='muted'>Please Provide Minimum Of 1 Photo.</FormText>}
				<FormText color='muted'>Only jpeg/jpg/png image format are allowed. Max 5 pictures.</FormText>
			</FormGroup>
			<Button type='submit'>Submit</Button>
		</Form>
	)
}

export default AddProductForm
