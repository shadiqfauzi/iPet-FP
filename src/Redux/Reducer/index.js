import { combineReducers } from 'redux'
import { manageProductReducer } from './manageProductReducer'
import { productViewReducer } from './productViewReducer'
import { authReducer } from './authReducer';

export default combineReducers({
    auth : authReducer,
    manageProduct: manageProductReducer,
    productView: productViewReducer,
})
