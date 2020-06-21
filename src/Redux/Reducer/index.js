import { combineReducers } from 'redux'
import { manageProductReducer } from './manageProductReducer'
import { productViewReducer } from './productViewReducer'

export default combineReducers({
    manageProduct: manageProductReducer,
    productView: productViewReducer,
})
