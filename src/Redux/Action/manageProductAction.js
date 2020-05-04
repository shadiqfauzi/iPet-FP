import Axios from 'axios'
import { API_URL } from '../../Support/API_URL'

export const FetchManageProductData = (
	search,
	minPrice,
	maxPrice,
	category
) => {
	return async (dispatch) => {
		dispatch({
			type: 'API_MANAGE_PRODUCT_START',
		})
		try {
			let url = `${API_URL}/manage-product`
			if (search || minPrice || maxPrice) {
				url += `?`
				if (search) url += `search=${search}`
				if (search && minPrice) url += `&`
				if (minPrice) url += `minPrice=${parseInt(minPrice)}`
				if ((search && maxPrice) || (minPrice && maxPrice)) url += `&`
				if (maxPrice) url += `maxPrice=${parseInt(maxPrice)}`
			}
			let res = await Axios.get(url)
			let { data, message, status } = res.data
			if (category) {
				let filtered = data.results
				category.forEach((cat) => {
					filtered = filtered.filter((filter) => {
						let condition = false
						filter.category.forEach((datcat) => {
							if (cat.label === datcat.category) {
								condition = true
							}
						})
						return condition
					})
				})
				data.results = filtered
			}
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
			let insert = await Axios.post(
				`${API_URL}/manage-product/`,
				formData,
				headers
            )
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
					message: err.name,
					status: err.message,
				},
			})
		}
	}
}
