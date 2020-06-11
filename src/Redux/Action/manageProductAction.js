import Axios from 'axios'
import { API_URL } from '../../Support/API_URL'

export const FetchManageProductData = (currentPage, search, minPrice, maxPrice, category, sortBy) => {
	return async (dispatch) => {
		await dispatch(FetchCategory())
		dispatch({
			type: 'API_MANAGE_PRODUCT_START',
		})
		try {
			let url = `${API_URL}/manage-product`
			if (search || minPrice || maxPrice || sortBy || category || currentPage + 1) {
				url += `?`
				if (search) url += `search=${search}`
				if (search && minPrice) url += `&`
				if (minPrice) url += `minPrice=${parseInt(minPrice)}`
				if ((search && maxPrice) || (minPrice && maxPrice)) url += `&`
				if (maxPrice) url += `maxPrice=${parseInt(maxPrice)}`
				if ((search && sortBy) || (minPrice && sortBy) || (maxPrice && sortBy)) url += `&`
				if (sortBy) url += `sortBy=${encodeURI(sortBy)}`
				if ((search && category) || (minPrice && category) || (maxPrice && category) || (sortBy && category)) url += `&`
				if (category) url += `category=${encodeURIComponent(JSON.stringify(category))}&`
				if (search || minPrice || maxPrice || sortBy) url += `&`
				url += `offset=${currentPage * 5}`
			}
			let res = await Axios.get(url)
			let { data, message, status } = res.data
			dispatch({
				type: 'FETCH_PRODUCTS',
				payload: data,
			})
			dispatch({
				type: 'API_MANAGE_PRODUCT_SUCCESS',
				payload: {
					message,
					status,
				},
			})
		} catch (err) {
			dispatch({
				type: 'API_MANAGE_PRODUCT_FAILED',
				payload: {
					message: err.name,
					status: err.message,
				},
			})
		}
	}
}

export const AddProduct = (formData) => {
	return async (dispatch) => {
		dispatch({
			type: 'API_MANAGE_PRODUCT_START',
		})
		try {
			let headers = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
			let insert = await Axios.post(`${API_URL}/manage-product/`, formData, headers)
			let { message, status } = insert.data
			dispatch({
				type: 'API_MANAGE_PRODUCT_SUCCESS',
				payload: {
					message,
					status,
				},
			})
		} catch (err) {
			dispatch({
				type: 'API_MANAGE_PRODUCT_FAILED',
				payload: {
					status: err.message,
					message: err.name,
				},
			})
		}
	}
}

export const EditProduct = (formData, id) => {
	return async (dispatch) => {
		dispatch({
			type: 'API_MANAGE_PRODUCT_START',
		})
		try {
			let headers = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
			let update = await Axios.patch(`${API_URL}/manage-product/${id}`, formData, headers)
			let { data, status } = update.data
			dispatch({
				type: 'API_MANAGE_PRODUCT_SUCCESS',
				payload: {
					message: data,
					status,
				},
			})
		} catch (err) {
			dispatch({
				type: 'API_MANAGE_PRODUCT_FAILED',
				payload: {
					status: err.message,
					message: err.name,
				},
			})
		}
	}
}

export const DeleteManageProductData = (id) => {
	return async (dispatch) => {
		dispatch({
			type: 'API_MANAGE_PRODUCT_START',
		})
		try {
			let success = await Axios.delete(`${API_URL}/manage-product/delete-product/${id}`)
			let { message, status } = success
			dispatch({
				type: 'API_MANAGE_PRODUCT_SUCCESS',
				payload: {
					message,
					status,
				},
			})
			dispatch(FetchManageProductData())
		} catch (err) {
			dispatch({
				type: 'API_MANAGE_PRODUCT_FAILED',
				payload: {
					message: err.name,
					status: err.message,
				},
			})
		}
	}
}

export const FetchCategory = () => {
	return async (dispatch) => {
		dispatch({
			type: 'API_MANAGE_PRODUCT_START',
		})
		try {
			let result = await Axios.get(`${API_URL}/manage-product/fetch-category`)
			let { data, message, status } = result.data
			dispatch({
				type: 'FETCH_CATEGORY',
				payload: { data },
			})
			dispatch({
				type: 'API_MANAGE_PRODUCT_SUCCESS',
				payload: {
					message,
					status,
				},
			})
		} catch (err) {
			dispatch({
				type: 'API_MANAGE_PRODUCT_FAILED',
				payload: {
					message: err.name,
					status: err.message,
				},
			})
		}
	}
}

export const AddNewCategory = (category) => {
	return async (dispatch) => {
		dispatch({
			type: 'API_MANAGE_PRODUCT_START',
		})
		try {
			let success = await Axios.post(`${API_URL}/manage-product/new-category`, { category })
			let { message, status } = success
			await dispatch({
				type: 'API_MANAGE_PRODUCT_SUCCESS',
				payload: {
					message,
					status,
				},
			})
			dispatch(FetchCategory())
		} catch (err) {
			dispatch({
				type: 'API_MANAGE_PRODUCT_FAILED',
				payload: {
					message: err.name,
					status: err.message,
				},
			})
		}
	}
}
