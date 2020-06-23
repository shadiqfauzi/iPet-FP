import { combineReducers } from 'redux'
import { manageProductReducer } from './manageProductReducer'
import { productViewReducer } from './productViewReducer'
import { authReducer } from './authReducer'
import { transactionStatusReducer } from './transactionStatusReducer'
import { productPackageReducer } from './productPackageReducer'
import { reportReducer } from './reportReducer'
import { cartReducer } from './cartReducer'

export default combineReducers({
	manageProduct: manageProductReducer,
	productView: productViewReducer,
	auth: authReducer,
	productPackage: productPackageReducer,
	transactionStatus: transactionStatusReducer,
	report: reportReducer,
	cart: cartReducer,
})
