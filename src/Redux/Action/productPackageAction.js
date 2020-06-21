import Axios from 'axios'
import {
	API_PRODUCT_PACKAGE_START,
	API_PRODUCT_PACKAGE_FAILED,
	API_PRODUCT_PACKAGE_SUCCESS,
	SEARCH_PRODUCT,
	ADD_PACKAGE,
	EDIT_PACKAGE,
	DELETE_PACKAGE,
} from '../types'
import { API_URL } from '../../Support/API_URL'

export const FetchProductPackage = (id) => {
	return async (dispatch) => {
		dispatch({
			type: API_PRODUCT_PACKAGE_START,
		})
		try {
			const res = await Axios.get(`${API_URL}/manage-product/product-package`)
			let { data, status, message } = res.data
			console.log(data)
			if (id) {
				data = data.filter((data) => {
					return data.id === id
				})
			}
			dispatch({
				type: API_PRODUCT_PACKAGE_SUCCESS,
				payload: {
					data,
					status,
					message,
				},
			})
		} catch (err) {
			dispatch({
				type: API_PRODUCT_PACKAGE_FAILED,
				payload: {
					message: err.message,
					status: err.name,
				},
			})
		}
	}
}

export const SearchProduct = (query) => {
	return async (dispatch) => {
		dispatch({
			type: API_PRODUCT_PACKAGE_START,
		})
		try {
			const res = await Axios.get(`${API_URL}/manage-product/search-product?search=${query}`)
			if (res.data.data.length === 0) {
				dispatch({
					type: SEARCH_PRODUCT,
					payload: { notFound: true },
				})
			} else {
				dispatch({
					type: SEARCH_PRODUCT,
					payload: res.data.data,
				})
			}
		} catch (err) {
			dispatch({
				type: API_PRODUCT_PACKAGE_FAILED,
				payload: {
					message: err.message,
					status: err.name,
				},
			})
		}
	}
}

export const AddPackage = (data) => {
	return async (dispatch) => {
		dispatch({
			type: API_PRODUCT_PACKAGE_START,
		})
		try {
			let res = await Axios.post(`${API_URL}/manage-product/add-package`, data)
			const { message, status } = res.data
			dispatch({
				type: ADD_PACKAGE,
				payload: {
					message,
					status,
				},
			})
		} catch (err) {
			dispatch({
				type: API_PRODUCT_PACKAGE_FAILED,
				payload: {
					message: err.message,
					status: err.name,
				},
			})
		}
	}
}

export const EditPackage = (data) => {
	return async (dispatch) => {
		dispatch({
			type: API_PRODUCT_PACKAGE_START,
		})
		try {
			let res = await Axios.post(`${API_URL}/manage-product/edit-package`, data)
			const { message, status } = res.data
			dispatch({
				type: EDIT_PACKAGE,
				payload: {
					message,
					status,
				},
			})
		} catch (err) {
			dispatch({
				type: API_PRODUCT_PACKAGE_FAILED,
				payload: {
					message: err.message,
					status: err.name,
				},
			})
		}
	}
}

export const DeletePackage = (parcelId) => {
	return async (dispatch) => {
		dispatch({
			type: API_PRODUCT_PACKAGE_START,
		})
		try {
			let res = await Axios.post(`${API_URL}/manage-product/delete-package`, { parcelId })
			const { message, status } = res.data
			dispatch({
				type: DELETE_PACKAGE,
				payload: {
					message,
					status,
				},
			})
		} catch (err) {
			dispatch({
				type: API_PRODUCT_PACKAGE_FAILED,
				payload: {
					message: err.message,
					status: err.name,
				},
			})
		}
	}
}
