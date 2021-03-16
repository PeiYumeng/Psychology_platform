import React, {useEffect} from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import Products from './components/Products/Products';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/SignUp/LogIn';
import Test from './components/Test'
import io from 'socket.io-client';
import Socket from './socket';
window.socket = io("ws://132.232.126.211:8080");
Socket.prototype.users()


function App() {

  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/services' exact component={Services} />
        <Route path='/products' exact component={Products} />
        <Route path='/sign-up' exact component={SignUp} />
        <Route path='/log-in' exact component={LogIn} />
        <Route path='/test' exact component={Test} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
