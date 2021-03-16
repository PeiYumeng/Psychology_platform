import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import './SignUpForm.css';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import logo_hei from '../../images/logo_hei.jpg';
import Socket from '../../socket';

function LogInForm() {
    const [logInURL, setLogInURL] = useState('http://132.232.126.211:8080/login');
    const [userName, setUserName] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [imgData, setImgData] = useState('');//头像的base64信息
    const [userImg, setUserImg] = useState('');//数据库内头像名称
    const [avatarDIY, setAvatarDIY] = useState(false);

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
                    if(res==true){
                        localStorage.setItem("userName", userName)
                        Socket.prototype.join(userName);
                        alert('登陆成功！\n欢迎来到Psychole心理黑洞诊疗室~');
                        window.location.href="/";
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
        <div className='log-container'>
            <div className="suf-box-log">
                <section className='suf-subscription'>
                    {/* <p className='suf-subscription-heading'>
                    注册
                    </p> */}
                    <div className='input-areas'>
                    {/* <form>
                        <Avatar size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 100}} shape="square" style={{marginBottom:'1em', borderRadius:'5%'}} src={logo_hei} />
                    </form> */}
                    <form>
                        <input className='suf-input-first' id ='username' type='text' placeholder='用户名' onBlur={()=>{setUserName(document.getElementById('username').value)}}/>
                    </form>
                    <form>
                        <input className='suf-input' id='password' type='password' placeholder='密码' onBlur={()=>{setUserPwd(document.getElementById('password').value)}}/>
                    </form>

                    <form>
                        <Link to = '/log-in' className='btn-mobile'>
                            <Button buttonStyle='btn--outline' onClick={clickLog}>登陆</Button>
                        </Link>
                    </form>
                    
                    </div>
                </section>
            </div>
        
        </div>
    );
}

export default LogInForm;