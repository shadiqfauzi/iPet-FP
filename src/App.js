import React, {useEffect} from 'react'
// import logo from './logo.svg';
import './App.css'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Profile from './Pages/Profile'
import {keepLogin} from './Redux/Action/authAction'
import { useDispatch } from 'react-redux'
import TransHistory from './Pages/TransHistory'
import editProfile from './Pages/EditProfile'
import ManageUsers from './Pages/ManageUsers'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(
        keepLogin()
      )
    })

    return (
        <div>
            <Header />
            <Switch>
                <Route path='/' component={LandingPage} exact />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/profile' component={Profile} />
                <Route path='/transhistory' component={TransHistory}/>
                <Route path='/editProfile' component={editProfile} />
                <Route path='/manageUsers' component={ManageUsers} />
            </Switch>
            <Footer />
        </div>
    )
}

export default App
