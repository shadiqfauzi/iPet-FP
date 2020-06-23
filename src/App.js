import React, { useEffect } from 'react'
// import logo from './logo.svg';
import './App.css'
import { Route, Switch } from 'react-router-dom'

import Header from './Components/Header'
import Footer from './Components/Footer'
import Profile from './Pages/Profile'
import { keepLogin } from './Redux/Action/authAction'
import { useDispatch, useSelector } from 'react-redux'
import TransHistory from './Pages/TransHistory'
import editProfile from './Pages/EditProfile'
import ManageUsers from './Pages/ManageUsers'

import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NotFound from './Pages/NotFound'
import AdminPage from './Pages/AdminPage'
import ConfirmRegister from './Pages/ConfirmRegister'
import VerifyPage from './Pages/VerifyPage'
import ProductsPage from './Pages/Products/ProductsPage'
import ProductDetail from './Pages/Products/ProductDetail'
import CartPage from './Pages/CartPage'

function App() {
	const dispatch = useDispatch()
	const roleId = useSelector((state) => state.auth.roleId)

	useEffect(() => {
		dispatch(keepLogin())
	})

	const roleCheck = () => {
		if(roleId === 1){
			return <Route path='/admin' component={AdminPage} />
		}else{
			return null
		}
	}

	return (
		<div>
			<Header />
			<Switch>
				<Route path='/' component={LandingPage} exact />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/confirm-register' component={ConfirmRegister} />
				<Route path='/verify' component={VerifyPage} />
				<Route path='/cart' component={CartPage} />
				<Route path='/profile' component={Profile} />
				<Route path='/transhistory' component={TransHistory} />
				<Route path='/editProfile' component={editProfile} />
				<Route path='/manageUsers' component={ManageUsers} />
				<Route path='/products' component={ProductsPage} exact/>
				<Route path='/products/:id' component={ProductDetail} />
				{roleCheck()}
				<Route component={NotFound} />
			</Switch>
			<Footer />
		</div>
	)
}

export default App
