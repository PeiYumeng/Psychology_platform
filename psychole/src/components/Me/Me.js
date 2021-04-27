import React, { useEffect, useContext, useState } from 'react';
import './Me.css';
import { Avatar, Dropdown, Menu, Modal, Button, Divider, Row, Col} from 'antd';
import { SocketContext } from '../../SocketContext';
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';
import EditAvatar from './EditAvatar';
import MyCert from './MyCert';
import ArrangeConsult from './ArrangeConsult';
import ArrangeBroadcast from './ArrangeBroadcast';

const { SubMenu } = Menu;

function Me() {
    const { userData } = useContext(SocketContext);
    const [isMobile, setIsMoblie] = useState(false);
    const [isAOn, setIsAOn] = useState(true);
    const [isBOn, setIsBOn] = useState(false);
    const [isCOn, setIsCOn] = useState(false);
    const [isDOn, setIsDOn] = useState(false);
    const [isFirst, setIsFirst] = useState (true);
    const [isSecond, setIsSecond] = useState (false);
    const [isThird, setIsThird] = useState (false);

    const returnStatus = (cert) => {
        if(cert==1){return ('一级心理咨询师')}
        else if(cert==2){return ('二级心理咨询师')}
        else if(cert==3){return ('三级心理咨询师')}
        else{return ('普通用户')};
    }

    const handleClick = e => {
        // console.log('click ', e);
        if(e.key.indexOf('A')!=-1){
            setIsAOn(true);setIsBOn(false);setIsCOn(false);setIsDOn(false);
        }else if(e.key.indexOf('B')!=-1){
            setIsAOn(false);setIsBOn(true);setIsCOn(false);setIsDOn(false);
        }else if(e.key.indexOf('C')!=-1){
            setIsAOn(false);setIsBOn(false);setIsCOn(true);setIsDOn(false);
        }else{
            setIsAOn(false);setIsBOn(false);setIsCOn(false);setIsDOn(true);
        }
        if(e.key.indexOf('1')!=-1){
            setIsFirst(true);setIsSecond(false);setIsThird(false);
        }else if(e.key.indexOf('2')!=-1){
            setIsFirst(false);setIsSecond(true);setIsThird(false);
        }else{
            setIsFirst(false);setIsSecond(false);setIsThird(true);
        }
    };

    useEffect(() => {
        if (window.innerWidth <= 960){
            setIsMoblie(true);
        }else{
            setIsMoblie(false);
        }
      });

      useEffect(() => {

      }, []);

    return (
        <>
            <div className="bio_section">
                <div className="my_avatar">
                    <Avatar style={{border:'solid 5px white', boxShadow: '0 6px 20px rgba(24, 24, 24, 0.17)'}} size={{xs: 150, sm: 150, md: 150, lg: 150, xl: 150}} shape="circle" src={"http://132.232.126.211:8080/images/"+userData.userImg} />
                </div>
            </div>
            <div className="my_name">
                <div style={{textAlign:'center'}}>
                    <h1 style={{letterSpacing:'2px', marginBottom:'2px'}}>{userData.userName}</h1>
                    <p>{returnStatus(userData.docCert)}</p>
                </div>
            </div>
            {/* PC模式 */}
            {!isMobile && <Row className="infor_section">
                <Col span="4"></Col>
                <Col span="5">
                    <Menu
                        onClick={handleClick}
                        style={{ width:'90%', margin:'2em', boxShadow: '0 6px 20px rgba(24, 24, 24, 0.17)'}}
                        defaultSelectedKeys={['A1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1"  title="我的资料">
                            <Menu.Item key="A1">查看资料</Menu.Item>
                            <Menu.Item key="A2">修改资料</Menu.Item>
                            <Menu.Item key="A3">修改头像</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title="我的预约">
                            <Menu.Item key="B1">咨询预约</Menu.Item>
                            <Menu.Item key="B2">直播预约</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title="我的关注">
                            <Menu.Item key="C1">Option 6</Menu.Item>
                            <Menu.Item key="C2">Option 7</Menu.Item>
                        </SubMenu> 
                        <SubMenu key="sub4" title="医生版块">
                            <Menu.Item key="D1">我的认证</Menu.Item>
                            <Menu.Item key="D2">安排咨询</Menu.Item>
                            <Menu.Item key="D3">安排直播</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Col>
                <Col span="10">
                <div style={{ backgroundColor:'white', width:'100%', margin:'2em', boxShadow: '0 6px 20px rgba(24, 24, 24, 0.17)', padding:'2em 3em 2em 3em'}}>
                    {isAOn && isFirst && <MyProfile />}
                    {isAOn && isSecond && <EditProfile />}
                    {isAOn && isThird && <EditAvatar avatarSRC={"http://132.232.126.211:8080/images/"+userData.userImg}/>}
                    {isDOn && isFirst && <MyCert />}
                    {isDOn && isSecond && <ArrangeConsult />}
                    {isDOn && isThird && <ArrangeBroadcast />}
                </div>
                </Col>
                <Col span="4"></Col>
            </Row>}

            {/* 手机模式 */}
            {isMobile && <>
            <Row className="infor_section_mobile">
                <Col span="24">
                    <Menu
                        onClick={handleClick}
                        style={{ width:'100%',  boxShadow: '0 6px 20px rgba(24, 24, 24, 0.17)'}}
                        defaultSelectedKeys={['A1']}
                        mode="horizontal"
                    >
                        <SubMenu key="sub1"  title="我的资料">
                            <Menu.Item key="A1">查看资料</Menu.Item>
                            <Menu.Item key="A2">修改资料</Menu.Item>
                            <Menu.Item key="A3">修改头像</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title="我的预约">
                            <Menu.Item key="B1">咨询预约</Menu.Item>
                            <Menu.Item key="B2">直播预约</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title="我的关注">
                            <Menu.Item key="C1">Option 6</Menu.Item>
                            <Menu.Item key="C2">Option 7</Menu.Item>
                        </SubMenu> 
                        <SubMenu key="sub4" title="医生版块">
                            <Menu.Item key="D1">我的认证</Menu.Item>
                            <Menu.Item key="D2">安排咨询</Menu.Item>
                            <Menu.Item key="D3">安排直播</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <div style={{ backgroundColor:'white', width:'100%', marginTop:'2em', boxShadow: '0 6px 20px rgba(24, 24, 24, 0.17)', padding:'2em 3em 2em 3em'}}>
                        {isAOn && isFirst && <MyProfile />}
                        {isAOn && isSecond && <EditProfile />}
                        {isAOn && isThird && <EditAvatar avatarSRC={"http://132.232.126.211:8080/images/"+userData.userImg}/>}
                        {isDOn && isFirst && <MyCert />}
                        {isDOn && isSecond && <ArrangeConsult />}
                        {isDOn && isThird && <ArrangeBroadcast />}
                    </div>
                </Col>
            </Row></>}


        </>
    )
}

export default Me
