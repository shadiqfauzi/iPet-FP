import { API_TRANSACTION_STATUS_START, API_TRANSACTION_STATUS_SUCCESS, API_TRANSACTION_STATUS_FAILED, FETCH_PENDING } from '../types'

const INITIAL_STATE = {
	data: [],
	totalPending: 0,
	totalData: 0,
	loading: false,
	status: '',
	message: '',
	error: false,
}

export const transactionStatusReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case API_TRANSACTION_STATUS_START:
			return {
				...state,
				loading: true,
			}
		case API_TRANSACTION_STATUS_SUCCESS:
			return {
				...state,
				data: action.payload.data.transaction,
				totalPending: action.payload.data.totalPending,
				totalData: action.payload.data.totalData,
				status: action.payload.status,
				message: action.payload.message,
				loading: false,
			}
		case API_TRANSACTION_STATUS_FAILED:
			return {
				...state,
				loading: false,
				error: true,
				status: action.payload.status,
				message: action.payload.message,
			}
		case FETCH_PENDING:
			return {
				...state,
				totalPending: action.payload,
			}
		default:
			return state
	}
}
