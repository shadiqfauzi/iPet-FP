import React from 'react'
// import logo from './logo.svg';
import './App.css'
import { Route, Switch } from 'react-router-dom'

import Header from './Components/Header'
import Footer from './Components/Footer'

import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ManageProductPage from './Pages/ManageProductPage'
import AddProductPage from './Pages/AddProductPage'

function App() {
	return (
		<div>
			<Header />
			<Switch>
				<Route path='/' component={LandingPage} exact />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/manage-product' component={ManageProductPage} />
				<Route path='/add-product' component={AddProductPage} />
			</Switch>
			<Footer />
		</div>
	)
}

export default App
