import React, { useEffect, useContext, useState } from 'react';
import './Me.css';
import { Input, Select, Tag, Button } from 'antd';
import { SocketContext } from '../../SocketContext';

const { Option } = Select;
const { TextArea } = Input;


function ArrangeBroadcast() {
    const { userData } = useContext(SocketContext);
    const [ isDoctor, setIsDoctor ] = useState(false);

    useEffect(()=>{
        if(userData.userState==2){
            setIsDoctor(true);
        }else{
            setIsDoctor(false);
        }
    }, [])


    return (
        <>
        {/* 不是医生 */}
        {!isDoctor && <div style={{textAlign:'center'}}>
            <p className="basic_infor">您好，<span style={{fontWeight:'bold'}}>{userData.userName}</span>。您现在是普通用户，暂不能使用此功能</p>
            <p className="basic_infor">已经是持证心理咨询师？请去<span style={{fontWeight:'bold'}}> 我的认证 </span>提交申请</p> 
        </div>}


        {/* 是医生 */}
        {isDoctor && <div style={{textAlign:'center'}}>
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
        </div>}
        </>
    )
}

export default ArrangeBroadcast
