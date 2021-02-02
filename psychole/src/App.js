import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import Products from './components/Products/Products';
import SignUp from './components/SignUp/SignUp';

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
      </Switch>
    </Router>
    </>
  );
}

export default App;
