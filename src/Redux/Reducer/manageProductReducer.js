const INITIAL_STATE = {
    data: [],
    categoryList: [],
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
                categoryList: action.payload.categoryList
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
