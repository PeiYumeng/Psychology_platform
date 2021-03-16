import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import logo from '../images/logo.png';
import './Navbar.css';
// import io from 'socket.io-client';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [button2, setButton2] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // const socket = io("ws://132.232.126.211:8080");


  
  const servicesLink = {
    pathname:"/services",
    state:{
      name:'Lucas',
    }
  };


  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
      setButton2(false);
    } else {
      setButton(true);
      setButton2(true);
    }
  };

  useEffect(() => {
    showButton();
    
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <Avatar size={{xs: 55, sm: 55, md: 55, lg: 55, xl: 55}} shape="circle" style={{borderRadius:'5%'}} src={logo} />
            <div style={{marginLeft:'10px'}}><p className='nav-title1'>Psychole</p> <p className='nav-title2'>心理黑洞诊疗室</p></div>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                首页
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to={servicesLink}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                注册
              </Link>
            </li>

            <li>
              <Link
                to='/log-in'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                登陆
              </Link>
            </li>

          </ul>
          {button && <Link to = '/sign-up' className='btn-mobile'><Button buttonStyle='btn--outline'>注册</Button></Link>}
          {button2 && <Link to = '/log-in' className='btn-mobile'><Button buttonStyle='btn--outline'>登陆</Button></Link>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;