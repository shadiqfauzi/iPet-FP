const INITIAL_STATE = {
    data: [],
	categoryList: [],
	totalActiveProducts: 0,
	loading: false,
	status: '',
	message: '',
}

export const manageProductReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'API_MANAGE_PRODUCT_START':
			return {
				...state,
				loading: true,
			}
		case 'FETCH_PRODUCTS':
			return {
				...state,
				data: action.payload.results,
				totalActiveProducts: action.payload.totalActiveProducts
			}
		case 'FETCH_CATEGORY':
			return{
				...state,
				categoryList: action.payload.data
			}
		case 'API_MANAGE_PRODUCT_SUCCESS':
			return {
				...state,
				loading: false,
				status: action.payload.status,
				message: action.payload.message,
			}
		case 'API_MANAGE_PRODUCT_FAILED':
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
