import React from 'react'
import { FormGroup, Label, CustomInput, FormText } from 'reactstrap'

import { API_URL } from '../../Support/API_URL'

const EditImageForm = (props) => {
	const { image, currentImages, handleImage, cancelImage, toggleDelete, index } = props

	return (
		<FormGroup>
				<Label for={`image${index+1}`}>Image No.{index+1}</Label>
				<CustomInput type='file' name={`image${index+1}`} id={`image${index+1}`} onChange={handleImage} />
				{currentImages[index] && !image[`image${index+1}`].imagePreview ? (
					<FormText>
						<FormText>Current Image</FormText>
						<img
							style={{ width: '10%', opacity: image[`image${index+1}`].delete ? '30%' : '100%' }}
							src={API_URL + currentImages[index].imagePath}
							alt='preview'
						/>
						<FormText>
							<span
								onClick={() => toggleDelete(`image${index+1}`, currentImages[index].productImageId)}
								style={{ width: 'auto', cursor: 'pointer' }}
							>
								{image[`image${index+1}`].delete ? 'Undo' : 'Delete'}
							</span>
						</FormText>
					</FormText>
				) : null}
				{image[`image${index+1}`].imagePreview ? (
					<FormText>
						<FormText>New Image</FormText>
						<img style={{ width: '10%' }} src={image[`image${index+1}`].imagePreview} alt='preview' />
						<FormText>
							<span onClick={() => cancelImage(`image${index+1}`)} style={{ width: 'auto', cursor: 'pointer' }}>
								Cancel
							</span>
						</FormText>
					</FormText>
				) : null}
			</FormGroup>
	)
}

export default EditImageForm
