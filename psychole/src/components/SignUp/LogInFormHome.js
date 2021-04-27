import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import './SignUpForm.css';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
// import Socket from '../../socket';

function LogInFormHome() {
    const [logInURL, setLogInURL] = useState('http://132.232.126.211:8080/login');
    const [userName, setUserName] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [imgData, setImgData] = useState('');//头像的base64信息
    const [userImg, setUserImg] = useState('');//数据库内头像名称
    const [avatarDIY, setAvatarDIY] = useState(false);

    const logSucceed = (userData, callback) =>{
        console.log(userData);
        callback();
    }

    const backToHome = () =>{
        alert('登陆成功！\n欢迎来到Psychole心理黑洞诊疗室~');
        window.location.href="/";
    }

    const clickLog = () => {
        if(userName=='' || userPwd ==''){
            alert('请输入用户名和密码！');
        }else{
            fetch(logInURL, {
                method: 'post', 
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    "userName":userName,
                    "userPwd":userPwd,
                })
            })
            .then(res=>res.json())
            .then(res=>{
                {   
                    if(res!=false){
                        logSucceed(res[0], backToHome);
                        localStorage.setItem("userName", userName)
                        
                    }else{
                        alert('用户名或密码错误！\n请再试一次');
                    }
                }
            });
        }

    }

    useEffect(() => {
        
    }, []);
    
    return (
        
        <div className='log-container-home'>
            <div className="suf-box-log-home">
                <section className='suf-subscription'>
                    <div className='input-areas'>
                    <form>
                        <Avatar size={{xs: 100, sm: 100, md: 100, lg: 100, xl: 100}} shape="circle" style={{marginBottom:'0.5em'}} src={logo} />
                        <p className='suf-subscription-heading-home'>Psychole 心理黑洞诊疗室</p>
                    </form>
                    <form>
                        <input className='suf-input-first' id ='username' type='text' placeholder='用户名' onBlur={()=>{setUserName(document.getElementById('username').value)}}/>
                    </form>
                    <form>
                        <input className='suf-input' id='password' type='password' placeholder='密码' onBlur={()=>{setUserPwd(document.getElementById('password').value)}}/>
                    </form>
                    <form>
                        <Link to = '/' className='btn-mobile'>
                            <Button buttonStyle='btn--outline' onClick={clickLog}>已有帐号 &nbsp;&nbsp;&nbsp;登陆</Button>
                        </Link>
                    </form>
                    <br/>
                    <form >
                        <Link to = '/sign-up' className='btn-mobile'>
                            <Button buttonStyle='btn--outline' >没有账号 &nbsp;&nbsp;&nbsp;注册</Button>
                        </Link>
                    </form>
                    
                    </div>
                </section>
            </div>
        
        </div>
    );
}

export default LogInFormHome;