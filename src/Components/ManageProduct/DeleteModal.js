import React, { useState } from 'react'

import CustomModal from './CustomModal'
import CustomCarousel from './CustomCarousel'
import { API_URL } from '../../Support/API_URL'
import { useDispatch } from 'react-redux'
import { DeleteManageProductData } from '../../Redux/Action'

const DeleteModal = (props) => {
	const { toggleModalDelete, modalDelete, deleteProductName, setModalDelete } = props

	const [modalDeleteSuccess, setModalDeleteSuccess] = useState(false)
	const toggleModalDeleteSuccess = () => setModalDeleteSuccess(!modalDeleteSuccess)

	const dispatch = useDispatch()

	const handleDelete = (id) => {
		dispatch(DeleteManageProductData(id))
		setModalDelete(false)
	}

	return (
		<React.Fragment>
			<CustomModal
				toggle={toggleModalDelete}
				modal={modalDelete}
				title='Are You Sure To Delete This Product?'
				onConfirm={() => {
					handleDelete(deleteProductName.productId)
					toggleModalDeleteSuccess()
				}}
				confirmLabel='Delete'
			>
				{deleteProductName ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<CustomCarousel
							ride={false}
							interval={false}
							images={deleteProductName.images.map((img) => ({
								src: API_URL + img.imagePath,
							}))}
						/>
					</div>
				) : null}
				<hr />
				<p>
					<strong>Product Id:</strong> {deleteProductName.productId}
				</p>
				<p>
					<strong>Product Name:</strong> {deleteProductName.productName}
				</p>
				<p>
					<strong>Price:</strong> {deleteProductName.price}
				</p>
				<p>
					<strong>Category:</strong>{' '}
					{deleteProductName.category
						? deleteProductName.category.map((val, i) =>
								deleteProductName.category.length - 1 !== i ? val.category + ', ' : val.category
						  )
						: null}
				</p>
				<p>
					<strong>Inv Stock:</strong> {deleteProductName.invStock}
				</p>
				<p>
					<strong>App Stock:</strong> {deleteProductName.appStock}
				</p>
			</CustomModal>
			<CustomModal
				toggle={toggleModalDeleteSuccess}
				modal={modalDeleteSuccess}
				title='Success'
				onConfirm={toggleModalDeleteSuccess}
				confirmLabel='OK'
				oneButton={true}
			>
				Successfully deleted {deleteProductName.productName}
			</CustomModal>
		</React.Fragment>
	)
}

export default DeleteModal
