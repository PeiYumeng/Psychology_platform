import React, { useState, useEffect } from 'react';
import './SignUpForm.css';
import { Button } from '../Button';
import CitySelector from './CitySelector';
import { Link } from 'react-router-dom';

function SignUpForm() {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [userTel, setUserTel] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userProcity, setUserProcity] = useState('');
    const [userIntro, setUserIntro] = useState('');
    const [userScore, setUserScore] = useState('');
    const [userImg, setUserImg] = useState('');
    const [userState, setUserState] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userAge, setUserAge] = useState('');
    const [prov, setProv] = useState('');
    const [city, setCity] = useState('');

    const clickReg = () => {
        console.log(userName);
        console.log(userPwd);
        console.log(userTel);
        console.log(userProcity);
    };

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
                        <input className='suf-input' id ='username' type='text' placeholder='用户名' onBlur={()=>{setUserName(document.getElementById('username').value)}}/>
                    </form>
                    <form>
                        <input className='suf-input' id='password' type='password' placeholder='密码' onBlur={()=>{setUserPwd(document.getElementById('password').value)}}/>
                    </form>
                    <form>
                        <input className='suf-input' id='phone' type='tel' placeholder='手机号' onBlur={()=>{setUserTel(document.getElementById('phone').value)}}/>
                    </form>
                    <CitySelector prov={prov} city={city} setProv={setProv} setCity={setCity} setUserProcity={setUserProcity}/>
                    <form>
                        <Button buttonStyle='btn--outline' onClick={clickReg}>注册</Button>
                    </form>
                    </div>
                </section>
            </div>
        
        </div>
    );
}

export default SignUpForm;