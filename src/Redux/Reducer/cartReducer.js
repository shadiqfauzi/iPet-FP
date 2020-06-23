import { API_CART_START, API_CART_SUCCESS, API_CART_FAILED } from '../types'

const INITIAL_STATE = {
	data: [],
	loading: false,
	status: '',
	message: '',
	error: false,
}

export const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case API_CART_START:
			return {
				...state,
				loading: true,
			}
		case API_CART_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				status: action.payload.status,
				message: action.payload.message,
			}
		case API_CART_FAILED:
			return {
				...state,
				loading: false,
				error: true,
				status: '',
				message: '',
			}
		default:
			return state
	}
}
