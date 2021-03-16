import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import './DocSection.css';
import Doctor from './Doctor';

const { SubMenu } = Menu;

function DocSection() {
  const [offlineURL, setOfflineURL] = useState('http://132.232.126.211:8080/doctor_offline');
  const [current, setCurrent] = useState('offline');

  const handleClick = e =>{
    console.log('click ', e);
    setCurrent(e.key);
  }

  useEffect(() => {
    fetch(offlineURL)
        .then(res=>res.json())
        .then(res=>{
          console.log(res);
          // for(var i=0;i<res.length;i++){
          //     var j = res[i].userPic.indexOf('/');
          //     setUserPic("http://47.98.163.228:3004"+res[i].userPic.substr(j));
          // };
        });
  }, []);

  return (
    <div className='cards'>
      <div className="menu_container"><Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="offline">
          线下
        </Menu.Item>
        <Menu.Item key="online">
          在线
        </Menu.Item>
        <SubMenu key="SubMenu" title="所在地">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu></div>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <Doctor
              src='images/male1.jpg'
              name='王德川'
              location='北京'
              score='4.8'
              text='很高兴与大家相识，我是啦啦啦啦啦啦。很高兴与大家相识，我是啦啦啦啦啦啦。很高兴与大家相识，我是啦啦啦啦啦啦。'
              label='一级心理咨询师'
              path='/services'
            />
            <Doctor
              src='images/male3.jpg'
              name='李铭毅'
              location='沈阳'
              score='4.5'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='一级心理咨询师'
              path='/services'
            />
            <Doctor
              src='images/female1.jpg'
              name='李娜'
              location='海口'
              score='4.7'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='一级心理咨询师'
              path='/services'
            />
            <Doctor
              src='images/male2.jpg'
              name='张明'
              location='深圳'
              score='3.9'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='一级心理咨询师'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <Doctor
              src='images/female5.jpg'
              name='古田田'
              location='济南'
              score='5'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='一级心理咨询师'
              path='/services'
            />
            <Doctor
              src='images/female2.jpg'
              name='王妮娜'
              location='石家庄'
              score='2.5'
              text='Experience Football on Top of the Himilayan Mountains'
              label='一级心理咨询师'
              path='/products'
            />
            <Doctor
              src='images/male5.jpg'
              name='胡英俊'
              location='唐山'
              score='3'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='一级心理咨询师'
              path='/sign-up'
            />
            <Doctor
              src='images/female4.jpg'
              name='龚琳'
              location='杭州'
              score='4.7'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='一级心理咨询师'
              path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DocSection;