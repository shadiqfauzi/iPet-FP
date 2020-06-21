import Axios from 'axios'
import { API_URL } from '../../Support/API_URL'

export const fetchProduct = () => {
    return async (dispatch) => {
        dispatch({
            type: 'API_FETCH_DATA_START',
        })
        try {
            let url = `${API_URL}/products/getAll`
            let res = await Axios.get(url)

            let { data, status, message } = res.data

            dispatch({
                type: 'FETCH_PRODUCTS_LIST_SUCCESS',
                payload: {
                    data,
                    status,
                    message,
                },
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: 'FETCH_PRODUCTS_FAILED',
                payload: {
                    error: err.message,
                },
            })
        }
    }
}

export const fetchProductById = (id) => {
    return async (dispatch) => {
        dispatch({
            type: 'API_FETCH_DATA_START',
        })
        try {
            let url = `${API_URL}/products/getAll/${id}`
            console.log(url)
            let res = await Axios.get(url)

            let { data, status, message } = res.data

            dispatch({
                type: 'FETCH_PRODUCTS_ID_SUCCESS',
                payload: {
                    data,
                    status,
                    message,
                },
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: 'FETCH_PRODUCTS_FAILED',
                payload: {
                    error: err.message,
                },
            })
        }
    }
}
