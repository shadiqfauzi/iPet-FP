import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import DynamicTable from '../../Components/TransactionStatus/DynamicTable'
import { fetchTransactionStatus } from '../../Redux/Action'
import CustomLoader from '../../Components/CustomLoader'
import TransactionStatusPagination from '../../Components/TransactionStatus/TransactionStatusPagination'

const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}

const TransactionStatusPage = (props) => {
	let query = useQuery()
	let status = query.get('status')

	const [userInput, setUserInput] = useState({
		username: '',
		maxDate: '',
		minDate: '',
	})
	const [toggleInput, setToggleInput] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)

	const loading = useSelector((state) => state.transactionStatus.loading)
	const data = useSelector((state) => state.transactionStatus.data)
	const error = useSelector((state) => state.transactionStatus.error)

	const dispatch = useDispatch()

	useEffect(() => {
		setCurrentPage(0)
		window.scrollTo(0, 0)
		dispatch(fetchTransactionStatus(status, null, userInput, currentPage))
		// eslint-disable-next-line
	}, [dispatch, status])

	const handleInput = (e) => {
		setUserInput({
			...userInput,
			[e.target.id]: e.target.value,
		})
	}

	const handleSearch = (e) => {
		e.preventDefault()
		dispatch(fetchTransactionStatus(status, null, userInput))
	}

	const handleReset = () => {
		setUserInput({
			username: '',
			maxDate: '',
			minDate: '',
		})
		dispatch(fetchTransactionStatus(status))
	}

	const handlePage = (page) => {
		dispatch(fetchTransactionStatus(status, null, userInput, page))
	}

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
			footer: '<a href="#">Refresh Page</a>',
		})
	}
	return (
		<div>
			<div className='col-6 p-0'>
				{!toggleInput && (
					<div className='mb-3'>
						<button onClick={() => setToggleInput(!toggleInput)} className='btn btn-info'>
							{' '}
							Show Filters{' '}
						</button>
					</div>
				)}
				{toggleInput && (
					<form onSubmit={handleSearch}>
						<div className='col-12 p-0 mb-2'>
							<label htmlFor='username'>Username</label>
							<input
								onChange={handleInput}
								value={userInput.username}
								type='text'
								className='form-control'
								id='username'
								placeholder='Search Username'
							></input>
						</div>
						<div className='row col-12 p-0 m-0 mb-3'>
							<div className='col-6 p-0 pr-2'>
								<label htmlFor='minDate'>Start Date</label>
								<input onChange={handleInput} value={userInput.minDate} type='date' className='form-control' id='minDate'></input>
							</div>
							<div className='col-6 p-0 pl-2'>
								<label htmlFor='maxDate'>End Date</label>
								<input onChange={handleInput} value={userInput.maxDate} type='date' className='form-control' id='maxDate'></input>
							</div>
						</div>
						<button type='submit' className='btn btn-primary mb-3'>
							Search
						</button>
						<button onClick={handleReset} type='button' className='btn btn-warning ml-2 mb-3'>
							Reset
						</button>
						<button onClick={() => setToggleInput(!toggleInput)} type='button' className='btn btn-info ml-2 mb-3'>
							{' '}
							Hide Filters{' '}
						</button>
					</form>
				)}
			</div>
			{loading ? <CustomLoader /> : <DynamicTable data={data} />}
			<div className='d-flex justify-content-center'>
				<TransactionStatusPagination currentPage={currentPage} setCurrentPage={setCurrentPage} handlePage={handlePage} />
			</div>
		</div>
	)
}

export default TransactionStatusPage
