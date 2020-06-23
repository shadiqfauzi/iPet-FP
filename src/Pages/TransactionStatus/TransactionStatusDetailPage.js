import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import Swal from 'sweetalert2'

import { fetchTransactionStatus, changeTrxStatus } from '../../Redux/Action'
import CustomModal from '../../Components/ManageProduct/CustomModal'
import CustomLoader from '../../Components/CustomLoader'
import RenderDetail from '../../Components/TransactionStatus/RenderDetail'
import { API_URL } from '../../Support/API_URL'

const TransactionStatusDetailPage = (props) => {
	const { transactionId } = useParams()

	const data = useSelector((state) => state.transactionStatus.data)
	const loading = useSelector((state) => state.transactionStatus.loading)
	const error = useSelector((state) => state.transactionStatus.error)

	const [modal, setModal] = useState(false)
	const [approveModal, setApproveModal] = useState(false)
	const [rejectModal, setRejectModal] = useState(false)
	const [message, setMessage] = useState('')
	const [availability, setAvailability] = useState(true)

	const dispatch = useDispatch()

	useEffect(() => {
		window.scrollTo(0, 0)
		dispatch(fetchTransactionStatus('', transactionId))
	}, [dispatch, transactionId])

	const handleChangeStatus = (stat) => {
		dispatch(changeTrxStatus(data[0].transactionId, stat, stat === 'approve' ? data : { message }))
	}

	if (loading) return <CustomLoader />
	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
			footer: '<a href="#">Refresh Page</a>',
		})
	}
	return (
		<React.Fragment>
			<div>
				<RenderDetail data={data} modal={modal} setModal={setModal} setAvailability={setAvailability} />
				{data[0] && data[0].pending === 1 && (
					<div>
						<div className='mt-3 row justify-content-center'>
							<p className='font-weight-bold'>Action</p>
						</div>
						<div className='row justify-content-around'>
							<Button onClick={() => setApproveModal(!approveModal)} color='success' disabled={!availability}>
								Approve
							</Button>
							<Button onClick={() => setRejectModal(!rejectModal)} color='danger'>
								Reject
							</Button>
						</div>
					</div>
				)}
			</div>
			<CustomModal
				title='Payment Image'
				oneButton={true}
				confirmLabel='Close'
				toggle={() => setModal(!modal)}
				modal={modal}
				onConfirm={() => setModal(!modal)}
			>
				<div style={{ width: '100%' }}>
					{data[0] && (
						<div className='container'>
							<img style={{ width: '100%' }} src={API_URL + data[0].paymentImg} alt='Payment' />
							<div className='row justify-content-center'>
								<button className='btn btn-link'>
									{' '}
									<a href={API_URL + data[0].paymentImg} target='_blank' rel='noopener noreferrer'>
										View Original
									</a>
								</button>
							</div>
						</div>
					)}
				</div>
			</CustomModal>
			<CustomModal
				title='Confirm Approve Transaction'
				confirmLabel='Approve'
				toggle={() => setApproveModal(!approveModal)}
				modal={approveModal}
				onConfirm={() => {
					handleChangeStatus('approve')
					setApproveModal(false)
				}}
				buttonColor='success'
			>
				<div>
					<p>Are you sure you want to approve this transaction?</p>
					<p>This action will also send the user a reciept of this transaction.</p>
				</div>
			</CustomModal>
			<CustomModal
				title='Confirm Reject Transaction'
				confirmLabel='Reject'
				toggle={() => setRejectModal(!rejectModal)}
				modal={rejectModal}
				onConfirm={() => {
					handleChangeStatus('reject')
					setRejectModal(false)
				}}
				buttonColor='danger'
			>
				<div>
					<p>Are you sure you want to reject this transaction?</p>
					<p>Please state the reason for the reject.</p>
					<textarea
						onChange={(e) => setMessage(e.target.value)}
						value={message}
						className='form-control'
						id='exampleFormControlTextarea1'
						rows='4'
					></textarea>
				</div>
			</CustomModal>
		</React.Fragment>
	)
}

export default TransactionStatusDetailPage
