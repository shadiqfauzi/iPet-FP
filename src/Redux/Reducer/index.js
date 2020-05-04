import { combineReducers } from 'redux';
import { manageProductReducer } from './manageProductReducer'

export default combineReducers({
    manageProduct: manageProductReducer
})