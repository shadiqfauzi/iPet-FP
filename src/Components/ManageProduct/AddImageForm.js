import React from 'react'
import { FormGroup, Label, CustomInput, FormText } from 'reactstrap'

const AddImageForm = (props) => {
	const { image, index, handleImage, cancelImage } = props

	return (
		<FormGroup>
			{image[`image${index}`].success ? (
				<React.Fragment>
					<Label for={`image${index + 1}`}>Image No.{index + 1}</Label>
					<CustomInput
						type='file'
						name={`image${index + 1}`}
						id={`image${index + 1}`}
						onChange={handleImage}
						required={!index ? true : false}
					/>
					{image[`image${index + 1}`].imagePreview ? (
						<FormText>
							<img style={{ width: '10%' }} src={image[`image${index + 1}`].imagePreview} alt='preview' />
							<FormText>
								<span onClick={() => cancelImage(`image${index + 1}`)} style={{ width: 'auto', cursor: 'pointer' }}>
									Cancel
								</span>
							</FormText>
						</FormText>
					) : null}
				</React.Fragment>
			) : null}
		</FormGroup>
	)
}

export default AddImageForm
