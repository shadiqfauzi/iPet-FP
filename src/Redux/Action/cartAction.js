import Axios from 'axios'
import { API_URL } from '../../Support/API_URL'
import { API_CART_START, API_CART_FAILED, API_CART_SUCCESS } from '../types'

export const FetchCartByUserId = (id) => {
	return async (dispatch) => {
		dispatch({
			type: API_CART_START,
		})
		try {
			const res = await Axios.get(`${API_URL}/products/cart/${id}`)
			let { data, message, status } = res.data
			dispatch({
				type: API_CART_SUCCESS,
				payload: {
					data,
					message,
					status,
				},
			})
		} catch (err) {
			dispatch({
				type: API_CART_FAILED,
				payload: {
					message: err.message,
					status: err.name,
				},
			})
		}
	}
}
