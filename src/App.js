import React, { useEffect } from 'react'
// import logo from './logo.svg';
import './App.css'
import { Route, Switch } from 'react-router-dom'

import Header from './Components/Header'
import Footer from './Components/Footer'
import Profile from './Pages/Profile'
import { keepLogin } from './Redux/Action/authAction'
import { useDispatch } from 'react-redux'
import TransHistory from './Pages/TransHistory'
import editProfile from './Pages/EditProfile'
import ManageUsers from './Pages/ManageUsers'

import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ManageProductPage from './Pages/ManageProductPage'
import AddProductPage from './Pages/AddProductPage'
import ProductsPage from './Pages/ProductsPage'
import NotFound from './Pages/NotFound'
import ProductDetail from './Pages/ProductDetail'
import Cart from './Pages/Cart'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(keepLogin())
	})
	return (
		<div>
			<Header />
			<Switch>
				<Route path='/' component={LandingPage} exact />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/products-detail/:id' component={ProductDetail} />
				<Route path='/cart' component={Cart} />
				<Route path='/profile' component={Profile} />
				<Route path='/transhistory' component={TransHistory} />
				<Route path='/editProfile' component={editProfile} />
				<Route path='/manageUsers' component={ManageUsers} />
				<Route path='/manage-product' component={ManageProductPage} />
				<Route path='/add-product' component={AddProductPage} />
				<Route path='/products' component={ProductsPage} />
				<Route component={NotFound} />
			</Switch>
			<Footer />
		</div>
	)
}

export default App
