import { combineReducers } from 'redux'
import { manageProductReducer } from './manageProductReducer'
import { transactionStatusReducer } from './transactionStatusReducer'
import { productPackageReducer } from './productPackageReducer'
import { reportReducer } from './reportReducer'

export default combineReducers({
	manageProduct: manageProductReducer,
	productPackage: productPackageReducer,
	transactionStatus: transactionStatusReducer,
	report: reportReducer,
})
