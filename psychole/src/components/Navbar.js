import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown, Menu } from 'antd';
import logo from '../images/logo.png';
import UserCard from './Home/UserCard';
import './Navbar.css';

function Navbar() {
  const [userData, setUserData] = useState({});

  const [userURL, setUserURL] = useState('http://132.232.126.211:8080/userInfor');
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [buttonM, setButtonM] = useState(true);
  const [userAvatar, setUserAvatar] = useState(true);
  const [userAvatarM, setUserAvatarM] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {setClick(false); console.log(window.localStorage)}

  
  const consultLink = {
    pathname:"/consult",
    state:{
      userData:userData,
    }
  };


  const showButton = () => {
    if (window.innerWidth <= 960) {
        setButton(false);
        setUserAvatar(false);
      if(window.localStorage.length!=0){
        setButtonM(false);
        setUserAvatarM(true);
      }else{
        setButtonM(true);
        setUserAvatarM(false);
      }
    } else {
      setUserAvatarM(false);
      if(window.localStorage.length!=0){
        setButton(false);
        setUserAvatar(true);
      }
      else{
        setButton(true);
        setButtonM(true);
      }
    }
  };

  const avatarChoice = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" >个人资料</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{window.localStorage.clear();window.location.reload();}}>退出登录</a>
      </Menu.Item>
 
    </Menu>
  );

  useEffect(() => {
    console.log(userData);
    if(window.localStorage.length==0){}else{
      fetch(userURL, {
        method: 'post', 
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            "userName": window.localStorage.userName,
        })
      })
      .then(res=>res.json())
      .then(res=>{
          {   
              if(res.userName!=null){
                setUserData(res);
              }else{}
          }
      });
    }

    showButton();
    
  }, [userData]);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <Avatar size={{xs: 55, sm: 55, md: 55, lg: 55, xl: 55}} shape="circle" src={logo} />
            <div style={{marginLeft:'10px'}}><p className='nav-title1'>Psychole</p> <p className='nav-title2'>心理黑洞诊疗室</p></div>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            {/* <Avatar size={{xs: 40, sm: 40, md: 40, lg: 40, xl: 40}} shape="square" style={{borderRadius:'5%'}} src={"http://132.232.126.211:8080/images/"+userData.userImg} /> */}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {userAvatarM && <div className='card_box'><UserCard name={userData.userName} avatar={userData.userImg} location={userData.userProCity} cert={userData.docCert} status={userData.userState} creditScore={userData.userScore}/></div>}

            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                首页
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to={consultLink}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                咨询
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/broadcast'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                直播
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/treehole'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                树洞
              </Link>
            </li>

            {buttonM && <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                注册
              </Link>
            </li>}

            {buttonM && <li>
              <Link
                to='/log-in'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                登陆
              </Link>
            </li>}

          </ul>
          {button && <Link to = '/sign-up' className='btn-mobile'><Button buttonStyle='btn--outline'>注册</Button></Link>}
          {button && <Link to = '/log-in' className='btn-mobile'><Button buttonStyle='btn--outline'>登陆</Button></Link>}
          {userAvatar && <Dropdown overlay={avatarChoice} placement="bottomCenter" arrow><Avatar size={{xs: 45, sm: 45, md: 45, lg: 45, xl: 45}} shape="square" style={{borderRadius:'10%', cursor:'pointer'}} src={"http://132.232.126.211:8080/images/"+userData.userImg}/></Dropdown>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;