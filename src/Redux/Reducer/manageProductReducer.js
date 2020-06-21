import { API_MANAGE_PRODUCT_START, FETCH_PRODUCTS, FETCH_CATEGORY, API_MANAGE_PRODUCT_SUCCESS, API_MANAGE_PRODUCT_FAILED, TOGGLE_ADDSUCCESS } from '../types'

const INITIAL_STATE = {
	data: [],
	categoryList: [],
	totalActiveProducts: 0,
	loading: false,
	error: false,
	status: '',
	message: '',
	addSuccess: false,
}

export const manageProductReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case API_MANAGE_PRODUCT_START:
			return {
				...state,
				loading: true,
			}
		case FETCH_PRODUCTS:
			return {
				...state,
				data: action.payload.results,
				totalActiveProducts: action.payload.totalActiveProducts,
			}
		case FETCH_CATEGORY:
			return {
				...state,
				categoryList: action.payload.data,
			}
		case API_MANAGE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				status: action.payload.status,
				message: action.payload.message,
				addSuccess: action.payload.addSuccess ? action.payload.addSuccess : state.addSuccess
			}
		case API_MANAGE_PRODUCT_FAILED:
			return {
				...state,
				loading: false,
				error: true,
				status: action.payload.status,
				message: action.payload.message,
			}
		case TOGGLE_ADDSUCCESS:
			return{
				...state,
				addSuccess: false
			}
		default:
			return state
	}
}
