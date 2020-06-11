import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon, Tooltip } from 'reactstrap'
import Select from 'react-select'

import EditImageForm from './EditImageForm'

const EditProductForm = (props) => {
	const {
		toggleModalConfirm,
		handleInput,
		userInput,
		categoryList,
		handleSelectCategory,
		selectedCategory,
		toggleModalCategory,
		isCategoryNotValid,
		handleImage,
		currentImages,
		image,
		toggleDelete,
		cancelImage,
	} = props

	const renderImageForm = () => {
		return Object.keys(image).map((key, index) =>
			index !== 5 ? (
				<EditImageForm
					currentImages={currentImages}
					toggleDelete={toggleDelete}
					key={index}
					image={image}
					handleImage={handleImage}
					index={index}
					cancelImage={cancelImage}
				/>
			) : null
		)
	}

	return (
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
					<Input type='number' name='price' id='price' placeholder='Price' onChange={handleInput} value={userInput.price} required />
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
				<Tooltip autohide={true} placement='bottom' isOpen={isCategoryNotValid && !selectedCategory} target='category'>
					Please fill out this field.
				</Tooltip>
				<FormText color='muted'>Cannot exceed 3 categories.</FormText>
			</FormGroup>
			{renderImageForm()}
			<FormGroup>
				<FormText color='muted'>Only jpeg/jpg/png image format are allowed. Max 5 pictures.</FormText>
			</FormGroup>
			<Button type='submit'>Submit</Button>
		</Form>
	)
}

export default EditProductForm
