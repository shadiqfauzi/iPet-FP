import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom'
import Home from './Pages/Home'
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
  return (
    <div>
        <Header/>
        <Route path='/' component={Home} exact />
        <Footer/>
      </div>
  );
}

export default App;
