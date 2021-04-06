import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Button, Input, Space} from 'antd';
import './DocSection.css';
import Doctor from './Doctor';
import {useLocation} from 'react-router';

function DocSection() {
  const userlocation = useLocation();

  const [initFlag, setInitFlag] = useState(true);//初次渲染的标志
  const [current, setCurrent] = useState('online');
  const [docGender, setDocGender] = useState('');
  const [genderTitle, setGenderTitle] = useState('性别');
  const [docField, setDocField] = useState('');
  const [fieldTitle, setFieldTitle] = useState('擅长领域');
  const [docLocate, setDocLocate] = useState('');
  const [locateTitle, setLocateTitle] = useState('所在地');
  const [searchValue, setSearchValue] = useState('');
  const [blueButton, setBlueButton] = useState('通话');
  const [userData, setUserData] = useState({});

  const [offlineURL, setOfflineURL] = useState('http://132.232.126.211:8080/doctor_offline');
  const [onlineURL, setOnlineURL] = useState('http://132.232.126.211:8080/doctor_online');
  const [userURL, setUserURL] = useState('http://132.232.126.211:8080/userInfor');

  const [onDoctor, setOnDoctor] = useState([]);
  const [onDoctorLast, setOnDoctorLast] = useState([]);//线上医生中不属于线上的
  const [offDoctor, setOffDoctor] = useState([]);
  const [offDoctorLast, setOffDoctorLast] = useState([]);//线下医生中不属于线下的

  const [docResult, setDocResult] = useState([]);
  const [docLastResult, setDocLastResult] = useState([]);

  const {Search} = Input;

  const onSearch = (value) => setSearchValue(value);

  const handleClick = e =>{
    // console.log('click ', e);
    setCurrent(e.key);
  }


  const gender = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocGender('');setGenderTitle('性别')}}>全部</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocGender('男');setGenderTitle('男性')}}>男性</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocGender('女');setGenderTitle('女性')}}>女性</a>
      </Menu.Item>
    </Menu>
  );

  const wellSection = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocField('');setFieldTitle('擅长领域')}}>全部领域</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocField('1');setFieldTitle('亲子教育')}}>亲子教育</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocField('2');setFieldTitle('性格情绪')}}>性格情绪</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocField('3');setFieldTitle('个人成长')}}>个人成长</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocField('4');setFieldTitle('人际社交')}}>人际社交</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocField('5');setFieldTitle('婚姻情感')}}>婚姻情感</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocField('6');setFieldTitle('焦躁抑郁')}}>焦躁抑郁</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocField('7');setFieldTitle('焦虑失眠')}}>焦虑失眠</a>
      </Menu.Item>
    </Menu>
  );

  
  const location = (
    <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocLocate('');setLocateTitle('所在地')}}>
          &nbsp;&nbsp;全 &nbsp;&nbsp;&nbsp;部
          </a>
        </Menu.Item>
      <Menu.ItemGroup title='在我附近'>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocLocate('同省份');setLocateTitle('同省份')}}>
            同省份
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocLocate('同城市');setLocateTitle('同城市')}}>
            同城市
          </a>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title='热门地区'>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocLocate('京津冀');setLocateTitle('京津冀')}}>
            京津冀
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocLocate('江浙沪');setLocateTitle('江浙沪')}}>
            江浙沪
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocLocate('东三省');setLocateTitle('东三省')}}>
            东三省
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={()=>{setDocLocate('港澳台');setLocateTitle('港澳台')}}>
            港澳台
          </a>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

        

  const docFilter = (gender, field, locate, search, doc, docLast) =>{

    var docArr = [];
    for(var i=0;i<doc.length;i++){
      var docTitle='';
      if(doc[i].userProCity.indexOf('河北')!=-1){docTitle+='同省份;'}
      if(doc[i].userProCity.indexOf('石家庄')!=-1){docTitle+='同城市;'}
      if(doc[i].userProCity.indexOf('北京')!=-1||doc[i].userProCity.indexOf('天津')!=-1||doc[i].userProCity.indexOf('河北')!=-1){docTitle+='京津冀;'}
      if(doc[i].userProCity.indexOf('江苏')!=-1||doc[i].userProCity.indexOf('浙江')!=-1||doc[i].userProCity.indexOf('上海')!=-1){docTitle+='江浙沪;'}
      if(doc[i].userProCity.indexOf('黑龙江')!=-1||doc[i].userProCity.indexOf('吉林')!=-1||doc[i].userProCity.indexOf('辽宁')!=-1){docTitle+='东三省;'}
      if(doc[i].userProCity.indexOf('香港')!=-1||doc[i].userProCity.indexOf('澳门')!=-1||doc[i].userProCity.indexOf('台湾')!=-1){docTitle+='港澳台;'}
      if(doc[i].userGender.indexOf(gender)!=-1 && doc[i].docWell.indexOf(field)!=-1 && docTitle.indexOf(locate)!=-1 &&(doc[i].userName.indexOf(search)!=-1 || doc[i].userProCity.indexOf(search)!=-1)){
        docArr.push(doc[i])
      }
    }
    setDocResult(docArr);

    var docLastArr = [];
    for(var i=0;i<docLast.length;i++){
      var docTitle2='';
      if(docLast[i].userProCity.indexOf('河北')!=-1){docTitle2+='同省份;'}
      if(docLast[i].userProCity.indexOf('石家庄')!=-1){docTitle2+='同城市;'}
      if(docLast[i].userProCity.indexOf('北京')!=-1||docLast[i].userProCity.indexOf('天津')!=-1||docLast[i].userProCity.indexOf('河北')!=-1){docTitle2+='京津冀;'}
      if(docLast[i].userProCity.indexOf('江苏')!=-1||docLast[i].userProCity.indexOf('浙江')!=-1||docLast[i].userProCity.indexOf('上海')!=-1){docTitle2+='江浙沪;'}
      if(docLast[i].userProCity.indexOf('黑龙江')!=-1||docLast[i].userProCity.indexOf('吉林')!=-1||docLast[i].userProCity.indexOf('辽宁')!=-1){docTitle2+='东三省;'}
      if(docLast[i].userProCity.indexOf('香港')!=-1||docLast[i].userProCity.indexOf('澳门')!=-1||docLast[i].userProCity.indexOf('台湾')!=-1){docTitle2+='港澳台;'}
      if(docLast[i].userGender.indexOf(gender)!=-1 && docLast[i].docWell.indexOf(field)!=-1 && docTitle2.indexOf(locate)!=-1 &&(docLast[i].userName.indexOf(search)!=-1 || docLast[i].userProCity.indexOf(search)!=-1)){
        docLastArr.push(docLast[i])
      }
    }
    setDocLastResult(docLastArr);
}


  useEffect(() => {

    fetch(offlineURL)
        .then(res=>res.json())
        .then(res=>{
          setOffDoctor(res);
        });
    
    fetch(onlineURL)
        .then(res=>res.json())
        .then(res=>{
          setOnDoctor(res);
          if (initFlag) {
            setDocResult(res);
            setDocLastResult([]);
          }//初次渲染
          setInitFlag(false);
        });

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


    if(current=='online'){
      setDocResult(onDoctor);
      setDocLastResult(onDoctorLast);
      setBlueButton('通话');
      docFilter(docGender, docField, docLocate, searchValue, onDoctor, onDoctorLast);

    }
    else if(current=='offline'){
      setDocResult(offDoctor);
      setDocLastResult(offDoctorLast);
      setBlueButton('预约');
      docFilter(docGender, docField, docLocate, searchValue, offDoctor, offDoctorLast);

    }

    

  }, [current, docGender, docField, docLocate, searchValue]);

  
  return (
    <div className='cards'>
      <div className="menu_container">
        <h2 className='menu_title'>医生</h2>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="online">
          在线
        </Menu.Item>
        <Menu.Item key="offline">
          线下
        </Menu.Item>
      </Menu></div>

      <div className="filter_container">
        <Dropdown overlay={gender} placement="bottomLeft" arrow>
        <Button style={{margin:'1em'}}>{genderTitle}</Button>
        </Dropdown>
        <Dropdown overlay={wellSection} placement="bottomCenter" arrow>
          <Button style={{margin:'1em'}}>{fieldTitle}</Button>
        </Dropdown>
        <Dropdown overlay={location} placement="bottomRight" arrow>
          <Button style={{margin:'1em'}}>{locateTitle}</Button>
        </Dropdown>
      </div>

      <div className="search_container"><Search placeholder="姓名、所在地" allowClear onSearch={onSearch} /></div>

      <div className="bigger_container">
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
            {
              docResult.map((item)=>(
                <Doctor name={item.userName} avatar={item.userImg} prov={item.userProCity.split(';')[0]} location={item.userProCity.split(';')[1]} cert={item.docCert} score={item.docScore} text={item.userIntro} docHop={item.docHop} docEdu={item.docEdu} docWell={item.docWell} docHour={item.docHour} userTel={item.userTel} eduImg={item.docEduimg} certImg={item.docCertimg} resume={item.docResume} blueButton={blueButton} setBlueButton={setBlueButton} userData={userData}/>
              ))
            }
            </ul>
            <ul style={{opacity:'0.5'}} className='cards__items'>
            {
              docLastResult.map((item)=>(
                <Doctor name={item.userName} avatar={item.userImg} prov={item.userProCity.split(';')[0]} location={item.userProCity.split(';')[1]} cert={item.docCert} score={item.docScore} text={item.userIntro} docHop={item.docHop} docEdu={item.docEdu} docWell={item.docWell} docHour={item.docHour} userTel={item.userTel} eduImg={item.docEduimg} certImg={item.docCertimg} resume={item.docResume} blueButton={blueButton} setBlueButton={setBlueButton} userData={userData}/>
              ))
            }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocSection;