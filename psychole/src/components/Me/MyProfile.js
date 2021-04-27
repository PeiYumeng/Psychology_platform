import React, { useEffect, useContext, useState } from 'react';
import './Me.css';
import { Avatar, Tag, Dropdown, Menu, Modal, Button, Divider, Row, Col} from 'antd';
import { Rating } from '@material-ui/lab';
import { SocketContext } from '../../SocketContext';

function MyProfile() {
    const { userData } = useContext(SocketContext);
    const userProv = userData.userProCity?userData.userProCity.split(';')[0]:'';
    const userLocation = userData.userProCity?userData.userProCity.split(';')[1]:'';

    const showMoreLocation = (prov, location) =>{
        if(prov == location){
          return location;
        }else{
          return (prov+'，'+location);
        }
      }

    return (
        <div style={{textAlign:'center'}}>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>昵称： </span><div style={{width:'60%', display:'inline-block', textAlign:'left'}}>{userData.userName}</div></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>性别： </span><div style={{width:'60%', display:'inline-block', textAlign:'left'}}>{userData.userGender}</div></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>年龄： </span><div style={{width:'60%', display:'inline-block', textAlign:'left'}}>{userData.userAge}</div></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>电话： </span><div style={{width:'60%', display:'inline-block', textAlign:'left'}}>{userData.userTel}</div></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>邮箱： </span><div style={{width:'60%', display:'inline-block', textAlign:'left'}}>{userData.userEmail}</div></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>城市： </span><div style={{width:'60%', display:'inline-block', textAlign:'left'}}>{showMoreLocation(userProv, userLocation)}</div></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>信用： </span><div style={{width:'60%', display:'inline-block', textAlign:'left'}}>{userData.userScore}</div></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>简介： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <p className="basic_infor"><div style={{width:'70%', display:'inline-block', textAlign:'left', border:'solid 2px #aaaaaa', padding:'0.5em'}}>{userData.userIntro==null?'您还没有简介！可在“修改资料”中添加~':userData.userIntro}</div></p>
        </div>
    )
}

export default MyProfile
