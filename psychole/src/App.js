import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Consult from './components/Consult/Consult';
import Broadcast from './components/Broadcast/Broadcast';
import Treehole from './components/Treehole/Treehole';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/SignUp/LogIn';
import io from 'socket.io-client';
import Socket from './socket';
window.socket = io("ws://132.232.126.211:8080");
Socket.prototype.users()


function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/consult' exact component={Consult} />
        <Route path='/broadcast' exact component={Broadcast} />
        <Route path='/treehole' exact component={Treehole} />
        <Route path='/sign-up' exact component={SignUp} />
        <Route path='/log-in' exact component={LogIn} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
