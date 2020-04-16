import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
  return (
    <div>
        <Header/>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
        <Footer/>
      </div>
  );
}

export default App;
