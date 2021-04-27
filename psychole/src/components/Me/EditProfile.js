import React, { useEffect, useContext, useState } from 'react';
import './Me.css';
import { Input, Select, Avatar, Tag, Dropdown, Menu, Modal, Button, Divider, Row, Col} from 'antd';
import { Rating } from '@material-ui/lab';
import { SocketContext } from '../../SocketContext';

const {Option} = Select;
const { TextArea } = Input;

function EditProfile() {
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
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>昵称： </span><Input style={{width:'60%'}} defaultValue={userData.userName}></Input></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>性别： </span>
                <Select style={{width:'60%', textAlign:'left'}} defaultValue={userData.userGender}>
                <Option value="男">男</Option>
                <Option value="女">女</Option>
                </Select>
            </p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>年龄： </span><Input style={{width:'60%'}} defaultValue={userData.userAge}></Input></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>电话： </span><Input style={{width:'60%'}} defaultValue={userData.userTel}></Input></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>邮箱： </span><Input style={{width:'60%'}} defaultValue={userData.userEmail}></Input></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>简介： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <p className="basic_infor"><TextArea style={{width:'70%', display:'inline-block', textAlign:'left', padding:'0.5em'}} defaultValue={userData.userIntro} rows={4}></TextArea></p>
            <Button type="primary" size='medium'>修改</Button>

        </div>
    )
}

export default EditProfile
