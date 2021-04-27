import React, { useState, useEffect } from 'react';
import './SignUpForm.css';
import { Button } from '../Button';
import CitySelector from './CitySelector';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import logo_hei from '../../images/logo_hei.jpg';
import girl from '../../images/girl.jpg';
import boy from '../../images/boy.jpg';

function SignUpForm() {
    const [signUpURL, setSignUpURL] = useState('http://132.232.126.211:8080/register');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [userTel, setUserTel] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userProcity, setUserProcity] = useState('');
    const [userIntro, setUserIntro] = useState('');
    const [userScore, setUserScore] = useState('');
    const [imgData, setImgData] = useState('');//头像的base64信息
    const [userImg, setUserImg] = useState('');//数据库内头像名称
    const [userState, setUserState] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userAge, setUserAge] = useState('');
    const [prov, setProv] = useState('');
    const [city, setCity] = useState('');
    const [avatarDIY, setAvatarDIY] = useState(false);

    const [fileList, setFileList] = useState([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: logo_hei,
        },
      ]);

    const clickReg = () => {
        if(userName=='' || userPwd ==''){
            alert('请填完信息再注册！');
        }else{
            fetch(signUpURL, {
                method: 'post', 
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    "userName":userName,
                    "userPwd":userPwd,
                    "userTel":userTel,
                    "userEmail":userEmail,
                    "userProcity":userProcity,
                    "userGender":userGender,
                    "userAge":userAge,
                    "imgData":imgData,
                    "avatarDIY":avatarDIY,
                })
            })
            .then(res => res.text()) // convert to plain text
            .then(text => console.log(text)); // then log it out

                // .then(res=>res.json())
                // .then(res=>{
                //     {   
                //         setUserId(res[0]);
                //         console.log(res[0]);
                //     }
                // });
            alert('注册成功！\n点击"确认"进入登陆界面~');
            window.location.href="/log-in";
        }
    }


    const genderChange = () => {
        var index = document.getElementById('gender').selectedIndex;
        setUserGender(document.getElementById('gender')[index].value);
        if(avatarDIY==false){
            if(document.getElementById('gender')[index].value=='男'){
                setUserImg('boy.jpg');
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: boy,
                    },
                ])
            }
            else if(document.getElementById('gender')[index].value=='女'){
                setUserImg('girl.jpg');
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: girl,
                    },
                ])
            }
            else{
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: logo_hei,
                    },
                ])
            }
        }
    }


    useEffect(() => {
        
    }, []);
    
    return (
        <div className='suf-container'>
            <div className="suf-box">
                <section className='suf-subscription'>
                    {/* <p className='suf-subscription-heading'>
                    注册
                    </p> */}
                    <div className='input-areas'>
                    <form>
                        <Avatar fileList={fileList} setFileList={setFileList} setAvatarDIY={setAvatarDIY} setImgData={setImgData}/>
                    </form>
                    <form>
                        <input className='suf-input-first' id ='username' type='text' placeholder='用户名' onBlur={()=>{setUserName(document.getElementById('username').value)}}/>
                    </form>
                    <form>
                        <input className='suf-input' id='password' type='password' placeholder='密码' onBlur={()=>{setUserPwd(document.getElementById('password').value)}}/>
                    </form>
                    <form>
                        <select className='suf-select' id='gender' onChange={genderChange}>
                            <option>性别&nbsp;&nbsp;&nbsp;&nbsp;</option>
                            <option>男</option>
                            <option>女</option>
                        </select>
                        <input className='suf-input2' id='age' type='number' placeholder='年龄' onBlur={()=>{setUserAge(document.getElementById('age').value)}}/>
                    </form>
                    <CitySelector prov={prov} city={city} setProv={setProv} setCity={setCity} setUserProcity={setUserProcity}/>
                    <form>
                        <input className='suf-input' id='phone' type='tel' placeholder='手机号' onBlur={()=>{setUserTel(document.getElementById('phone').value)}}/>
                    </form>
                    <form>
                        <input className='suf-input' id='email' type='email' placeholder='邮箱' onBlur={()=>{setUserEmail(document.getElementById('email').value)}}/>
                    </form>
                    <form>
                        <Link to = '/sign-up' className='btn-mobile'>
                            <Button buttonStyle='btn--outline' onClick={clickReg}>注册</Button>
                        </Link>
                    </form>
                    
                    </div>
                </section>
            </div>
        
        </div>
    );
}

export default SignUpForm;