import {
	API_PRODUCT_PACKAGE_START,
	API_PRODUCT_PACKAGE_SUCCESS,
	API_PRODUCT_PACKAGE_FAILED,
	SEARCH_PRODUCT,
	ADD_PACKAGE,
	DELETE_PACKAGE,
} from '../types'

const INITIAL_STATE = {
	data: [],
	productData: [],
	loading: false,
	error: false,
	status: '',
	message: '',
}

export const productPackageReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case API_PRODUCT_PACKAGE_START:
			return {
				...state,
				loading: true,
			}
		case API_PRODUCT_PACKAGE_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload.data,
				status: action.payload.status,
				message: action.payload.message,
			}
		case API_PRODUCT_PACKAGE_FAILED:
			return {
				...state,
				loading: false,
				error: true,
				status: action.payload.status,
				message: action.payload.message,
			}
		case SEARCH_PRODUCT:
			return {
				...state,
				loading: false,
				productData: action.payload,
			}
		case ADD_PACKAGE:
			return {
				...state,
				loading: false,
				status: action.payload.status,
				message: action.payload.message,
			}
		case DELETE_PACKAGE:
			return {
				...state,
				loading: false,
				status: action.payload.status,
				message: action.payload.message,
			}
		default:
			return state
	}
}
