import { API_REPORT_START, API_REPORT_SUCCESS, API_REPORT_FAILED } from '../types'

const INITIAL_STATE = {
	data: {},
	loading: false,
	error: false,
	status: '',
	message: '',
}

export const reportReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case API_REPORT_START:
			return {
				...state,
				loading: true,
			}
		case API_REPORT_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				status: action.payload.status,
				message: action.payload.message,
			}
		case API_REPORT_FAILED:
			return {
				...state,
				loading: false,
				error: true,
				status: action.payload.status,
				message: action.payload.message,
			}
		default:
			return state
	}
}
