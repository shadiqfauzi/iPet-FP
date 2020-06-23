const INITIAL_STATE = {
    data: [],
    loading: false,
    error: false,
    message : '',
    status: '',
    productById: {},
}

export const productViewReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'API_FETCH_DATA_START':
            return {
                ...state,
                loading: true,
            }
        case 'FETCH_PRODUCTS_LIST_SUCCESS':
            return {
                ...state,
                data: action.payload.data,
                loading: false,
                message : action.payload.message,
                status : action.payload.status
            }
        case 'FETCH_PRODUCTS_ID_SUCCESS':
            return {
                ...state,
                productById: action.payload.data,
                loading : false,
                message : action.payload.message,
                status : action.payload.status
            }
        case 'FETCH_PRODUCTS_FAILED':
            return {
                ...state,
                error: action.payload.error,
                loading: false,
            }
        default:
            return state
    }
}
