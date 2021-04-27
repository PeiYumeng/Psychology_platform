import React, { useState, useEffect, useContext } from 'react';
import { ButtonDIY } from './Button';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown, Menu, Modal, Button, Divider} from 'antd';
import logo from '../images/logo.png';
import UserCard from './Home/UserCard';
import { SocketContext } from '../SocketContext';
import './Navbar.css';

function Navbar() {
  const { userData, answerCall, call, callAccepted, getUrlPara, getCallerToRoom } = useContext(SocketContext); 
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [buttonM, setButtonM] = useState(true);
  const [userAvatar, setUserAvatar] = useState(true);
  const [userAvatarM, setUserAvatarM] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [visible1, setVisible1] = useState(true);
  const [callerData, setCallerData] = useState({});
  const [showCaller, setShowCaller] = useState(false);

  const showModal1 = () =>{
    setVisible1(true);
  };

  const handleOk1 = () =>{
    // window.open("/consultroom"+ '/answer?'+ userData.userId + '?'+callerData.userId);
    setLoading1(true);
    getCallerToRoom();
    setTimeout(() => {
      window.location.href = "/consultroom"+ '/answer?'+ userData.userId + '?'+callerData.userId;
    }, 3000);
  };

  const handleCancel1 = () =>{
    setVisible1(false);
  }

  const slowShowCaller = () => {
    if(getUrlPara().indexOf('?')!=-1){return;}
    setShowCaller(true);
  }

  const fetchCaller = (isReceived, slowShow) =>{
    if(isReceived){
      fetch('http://132.232.126.211:8080/userInfor', {
        method: 'post', 
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            "userName": call.name,
        })
      })
      .then(res=>res.json())
      .then(res=>{
          {   
              if(res.userName!=null){
                setCallerData(res);
                
                console.log(res);

                slowShow();
              }else{}
          }
      });
    }
  }

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {setClick(false);}

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

  const showMoreLocation = (procity) =>{
    var prov = procity.split(';')[0];
    var location = procity.split(';')[1];
    if(prov == location){
      return location;
    }else{
      return (prov+'，'+location);
    }
  };

  const avatarChoice = (
    <Menu>
      <Menu.Item>
        <Link to='/me'><a target="_blank" rel="noopener noreferrer" style={{color:'black'}}>个人资料</a></Link>
      </Menu.Item>
      <Menu.Item>
        <a style={{color:'black'}} target="_blank" rel="noopener noreferrer" onClick={()=>{alert('退出成功！欢迎再度光临！');window.localStorage.clear();window.location.href="/";}}>退出登录</a>
      </Menu.Item>
 
    </Menu>
  );

  useEffect(() => {

    showButton();
    
    fetchCaller(call.isReceivingCall, slowShowCaller);
  }, [call]);

  window.addEventListener('resize', showButton);

  return (
    <>
      {showCaller && !callAccepted && (
        <Modal
            bodyStyle={{marginTop:'1rem', padding:'3rem 3rem 0 3rem ', height:'20em', borderRadius:'10px', overflowY:'auto'}}
            visible={visible1}
            // title="Title"
            onOk={handleOk1}
            onCancel={handleCancel1}
            footer={[
              <Button key="back" onClick={handleCancel1}>
                拒绝
              </Button>,
              <Button key="submit" type="primary" loading={loading1} onClick={handleOk1}>
                接听
              </Button>,
            ]}
          >
            <Divider style={{fontSize:'18px'}} plain>{callerData.userName} 请求向您咨询</Divider>
            <figure onClick={()=>{console.log(callerData)}} style={{position:'relative'}} className='docs__infor__pic-wrap' >
              <Avatar style={{boxShadow: '0 6px 20px rgba(56, 125, 255, 0.3)'}} size={{xs: 120, sm: 120, md: 120, lg: 120, xl: 120}} shape="circle" src={"http://132.232.126.211:8080/images/"+callerData.userImg} />
              <div className='doc_infor_detail'>
                  <p style={{fontSize:'18px', fontWeight:'bald', marginBottom:'3px'}}>{callerData.userName}</p>
                  <div className='doc_location_detail'>
                    <div style={{position:'relative', marginTop:'3px'}}><img style={{width:'21px', height:'21px'}} src={'images/location.png'} /><span style={{position:'absolute', marginLeft:'3px', top:'1px', fontSize:'15px'}}>{showMoreLocation(callerData.userProCity)}</span></div>
                  </div>
                  <p style={{fontSize:'14px', margin:'5px 3px 3px 3px'}}>性别：{callerData.userGender}</p>
                  <p style={{fontSize:'14px', margin:'5px 3px 3px 3px'}}>信用分：{callerData.userScore}</p>
              </div>
            </figure>
          </Modal>)}

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
            {userAvatarM && <div className='card_box'><UserCard name={userData.userName} avatar={userData.userImg} location={userData.userProCity} cert={userData.docCert} status={userData.userState} creditScore={userData.userScore} setClick={setClick}/></div>}

            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                首页
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/consult'
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
          {button && <Link to = '/sign-up' className='btn-mobile'><ButtonDIY buttonStyle='btn--outline'>注册</ButtonDIY></Link>}
          {button && <Link to = '/log-in' className='btn-mobile'><ButtonDIY buttonStyle='btn--outline'>登陆</ButtonDIY></Link>}
          {userAvatar && <Dropdown overlay={avatarChoice} placement="bottomCenter" arrow><Avatar size={{xs: 45, sm: 45, md: 45, lg: 45, xl: 45}} shape="square" style={{borderRadius:'10%', cursor:'pointer'}} src={"http://132.232.126.211:8080/images/"+userData.userImg}/></Dropdown>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;