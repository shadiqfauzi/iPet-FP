import Axios from 'axios'
import { API_URL } from '../../Support/API_URL'
import { API_TRANSACTION_STATUS_START, API_TRANSACTION_STATUS_FAILED, API_TRANSACTION_STATUS_SUCCESS } from '../types'

export const fetchTransactionStatus = (transactionStatus, id, queries, currentPage) => {
	return async (dispatch) => {
		dispatch({
			type: API_TRANSACTION_STATUS_START,
		})
		try {
			let body = {
				id,
				currentPage: currentPage ? currentPage : 0,
				...queries,
			}
			if (transactionStatus) body[transactionStatus] = 1
			const res = await Axios.post(`${API_URL}/transaction-status`, body)
			const { data, status, message, totalPending, totalData } = res.data
			dispatch({
				type: API_TRANSACTION_STATUS_SUCCESS,
				payload: {
					data,
					totalPending,
					totalData,
					status,
					message,
				},
			})
		} catch (err) {
			dispatch({
				type: API_TRANSACTION_STATUS_FAILED,
				payload: {
					message: err.message,
					status: err.name,
				},
			})
		}
	}
}

export const changeTrxStatus = (id, status, data) => {
	return async (dispatch) => {
		dispatch({
			type: API_TRANSACTION_STATUS_START,
		})
		try {
			console.log(status)
			let body = {
				transactionId: id,
				approve: status === 'approve' && 1,
				reject: status === 'reject' && 1,
				API_URL,
			}
			if (data) {
				body.data = data
			}
			await Axios.post(`${API_URL}/transaction-status/change-status/`, body)
			dispatch(fetchTransactionStatus('', id))
		} catch (err) {
			dispatch({
				type: API_TRANSACTION_STATUS_FAILED,
				payload: {
					message: err.message,
					status: err.name,
				},
			})
		}
	}
}
