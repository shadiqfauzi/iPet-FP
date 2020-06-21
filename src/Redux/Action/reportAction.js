import Axios from 'axios'
import { API_URL } from '../../Support/API_URL'
import { API_REPORT_START, API_REPORT_FAILED, API_REPORT_SUCCESS } from '../types'

export const FetchReport = (reportId, productId) => {
	return async (dispatch) => {
		dispatch({
			type: API_REPORT_START,
		})
		try {
			let res = await Axios.get(`${API_URL}/report/?id=${reportId}${productId ? `&productId=${productId}` : null}`)
			let { data, message, status } = res.data
			dispatch({
				type: API_REPORT_SUCCESS,
				payload: {
					data,
					message,
					status,
				},
			})
		} catch (err) {
			console.log(err)
			dispatch({
				type: API_REPORT_FAILED,
				payload: {
					message: err.message,
					status: err.name,
				},
			})
		}
	}
}
