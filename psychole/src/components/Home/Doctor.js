import React, { useState, useEffect, useContext } from 'react';
import { Avatar, Modal, Button, Divider, Tag, Image } from 'antd';
import { Rating } from '@material-ui/lab';
import { SocketContext } from '../../SocketContext';

import VideoPlayer from '../Consult/VideoPlayer';

function Doctor(props) {
  const { setCallerUserId , callUser , setCameraOn, users, setCall} = useContext(SocketContext);

  const [docCert, setDocCert] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const showSocketId = (userId) => {
    for(var i=0;i<users.length;i++){
      if(users[i].userId == userId){
        console.log(users[i].id);
        return users[i].id;
      }
    }
  }

  const showModal1 = () =>{
    setVisible1(true);
    console.log(users);
  };

  const handleOk1 = () =>{
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
      setVisible1(false);
    }, 3000);
  };

  const handleCancel1 = () =>{
    setVisible1(false);
  }
  
  const showModal2 = () =>{
    setVisible2(true);
  };

  const handleOk2 = () =>{
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
      setVisible2(false);
    }, 3000);
  };

  const handleCancel2 = () =>{
    setVisible2(false);
  }

  const showModal3 = () =>{
    setVisible3(true);
    setCameraOn(true);
  };

  const handleOk3 = () =>{
    setLoading3(true);
    callUser(showSocketId(props.userId), props.userId);
    // setTimeout(() => {
    //   setLoading3(false);
    //   setVisible3(false);
    //   setCameraOn(false);
    // }, 3000);
  };

  const handleCancel3 = () =>{
    setVisible3(false);
    setLoading3(false);
    setCameraOn(false);
  }

  const showMoreLocation = (prov, location) =>{
    if(prov == location){
      return location;
    }else{
      return (prov+'，'+location);
    }
  }

  const handleFields = (docWell) =>{
    var field = [];
    for(var i=0;i<docWell.split(';').length;i++){
      switch(docWell.split(';')[i]){
        case '1': field.push({'well':'亲子教育', 'color':'magenta'});break;
        case '2': field.push({'well':'性格情绪', 'color':'purple'});break;
        case '3': field.push({'well':'个人成长', 'color':'orange'});break;
        case '4': field.push({'well':'人际社交', 'color':'gold'});break;
        case '5': field.push({'well':'婚姻情感', 'color':'green'});break;
        case '6': field.push({'well':'焦躁抑郁', 'color':'cyan'});break;
        case '7': field.push({'well':'焦虑失眠', 'color':'blue'});break;
      }
    }
    return field;
  }

  function ImageDemo(props) {
    return (
      <Image
        width={props.imageWidth}
        src={"http://132.232.126.211:8080/images/"+ props.imageUrl}
      />
    );
  }

  useEffect(() => {
    if(props.cert==1){setDocCert('一级心理咨询师')}
    else if(props.cert==2){setDocCert('二级心理咨询师')}
    else if(props.cert==3){setDocCert('三级心理咨询师')}
    else{setDocCert('心理咨询师')};

  
  }, []);

  return (
    <>
      <li id='docCards'className='cards__item'>
        <div className='cards__item__link' >
          <figure style={{position:'relative'}} className='cards__item__pic-wrap' data-category={docCert}>
            <Avatar style={{boxShadow: '0 6px 20px rgba(56, 125, 255, 0.3)'}} size={{xs: 75, sm: 75, md: 75, lg: 75, xl: 75}} shape="circle" src={"http://132.232.126.211:8080/images/"+props.avatar} />
            <div className='doc_infor'>
                <p style={{marginBottom:'3px'}}>{props.name}</p>
                <div style={{position:'relative'}}><Rating name="read-only" size='small' value={props.score} precision={0.1} readOnly /><span style={{position:'absolute', bottom:'3.5px'}}>&nbsp;{props.score}</span></div>
            </div>
            <div className='doc_location'>
              <div style={{position:'relative'}}><img style={{width:'20px', height:'20px'}} src={'images/location.png'} /><span style={{position:'absolute', top:'1px'}}>{props.location}</span></div>
            </div>
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
          <div className='cards_button_section'>
            <Button onClick={showModal1} className='doc_button' size='small'>个人资料</Button>
            <Button onClick={props.blueButton=='通话'?showModal3:showModal2} className='doc_button' type="primary" size='small'>{props.userData.userName!=props.name ? props.blueButton : ''}</Button>
          </div>

          {/* 个人资料弹窗 */}
          <Modal
            bodyStyle={{padding:'3rem 3rem 0 3rem ', height:'40em', borderRadius:'10px', overflowY:'auto'}}
            visible={visible1}
            // title="Title"
            onOk={handleOk1}
            onCancel={handleCancel1}
            footer={[
              // <Button key="back" onClick={handleCancel1}>
              //   Return
              // </Button>,
              // <Button key="submit" type="primary" loading1={loading1} onClick={handleOk1}>
              //   Submit
              // </Button>,
            ]}
          >
            <figure style={{position:'relative'}} className='docs__infor__pic-wrap' data-category={docCert}>
              <Avatar style={{boxShadow: '0 6px 20px rgba(56, 125, 255, 0.3)'}} size={{xs: 120, sm: 120, md: 120, lg: 120, xl: 120}} shape="circle" src={"http://132.232.126.211:8080/images/"+props.avatar} />
              <div className='doc_infor_detail'>
                  <p style={{fontSize:'18px', fontWeight:'bald', marginBottom:'3px'}}>{props.name}</p>
                  <div className='doc_location_detail'>
                    <div style={{position:'relative', marginTop:'3px'}}><img style={{width:'21px', height:'21px'}} src={'images/location.png'} /><span style={{position:'absolute', marginLeft:'3px', top:'1px', fontSize:'15px'}}>{showMoreLocation(props.prov, props.location)}</span></div>
                  </div>
                  <div style={{position:'relative', marginTop:'7px'}}><Rating name="read-only" size='small' value={props.score} precision={0.1} readOnly /><span style={{position:'absolute', fontSize:'15px', bottom:'3.5px'}}>&nbsp;{props.score}</span></div>
                  <p style={{fontSize:'14px', margin:'3px'}}>平台工作时长：{props.docHour}h</p>
                  
              </div>
            </figure>
            <Divider style={{fontSize:'18px'}} plain>关于我</Divider>
            <h3>就职单位</h3>
            <Tag style={{fontSize:'13px', marginBottom:'7px'}}>{props.docHop?props.docHop:'私人医生'}</Tag>
            <h3>职业等级</h3>
            <Tag style={{fontSize:'13px', marginBottom:'7px'}}>{docCert}</Tag>
            <h3>擅长领域</h3>
            {handleFields(props.docWell).map((item)=>(<Tag color={item.color} style={{fontSize:'13px', margin:'0 12px 7px 0',}}>{item.well}</Tag>))}
            <h3>个人简介</h3>
            {props.text}
            <Divider style={{fontSize:'18px'}} plain>简历</Divider>
            <h3>教育背景</h3>
            <Tag style={{fontSize:'13px', marginBottom:'7px'}}>{props.docEdu}</Tag>
            <h3>联系电话</h3>
            <Tag style={{fontSize:'13px', marginBottom:'7px'}}>{props.userTel}</Tag>
            <h3>资格证明</h3>
            <div style={{display:'flex', width:'100%', overflow:'auto', marginBottom:'7px'}}>
              <ImageDemo  imageWidth={200} imageUrl={props.certImg} />
              <ImageDemo  imageWidth={200} imageUrl={props.eduImg} />
            </div>
            <h3>个人简历</h3>
              <ImageDemo  imageWidth={100} imageUrl={props.resume} />
          </Modal>

          {/* 预约弹窗 */}
          <Modal
            bodyStyle={{padding:'3rem 3rem 0 3rem ', height:'40em', borderRadius:'10px', overflowY:'auto'}}
            visible={visible2}
            // title="Title"
            onOk={handleOk2}
            onCancel={handleCancel2}
            footer={[
              // <Button key="back" onClick={handleCancel2}>
              //   Return
              // </Button>,
              // <Button key="submit" type="primary" loading1={loading2} onClick={handleOk2}>
              //   Submit
              // </Button>,
            ]}
          >
           <figure style={{position:'relative'}} className='docs__infor__pic-wrap' data-category={docCert}>
              <Avatar style={{boxShadow: '0 6px 20px rgba(56, 125, 255, 0.3)'}} size={{xs: 120, sm: 120, md: 120, lg: 120, xl: 120}} shape="circle" src={"http://132.232.126.211:8080/images/"+props.avatar} />
              <div className='doc_infor_detail'>
                  <p style={{fontSize:'18px', fontWeight:'bald', marginBottom:'3px'}}>{props.name}</p>
                  <div className='doc_location_detail'>
                    <div style={{position:'relative', marginTop:'3px'}}><img style={{width:'21px', height:'21px'}} src={'images/location.png'} /><span style={{position:'absolute', marginLeft:'3px', top:'1px', fontSize:'15px'}}>{showMoreLocation(props.prov, props.location)}</span></div>
                  </div>
                  <div style={{position:'relative', marginTop:'7px'}}><Rating name="read-only" size='small' value={props.score} precision={0.1} readOnly /><span style={{position:'absolute', fontSize:'15px', bottom:'3.5px'}}>&nbsp;{props.score}</span></div>
                  <p style={{fontSize:'14px', margin:'3px'}}>平台工作时长：{props.docHour}h</p>
              </div>
            </figure>
            <Divider style={{fontSize:'18px'}} plain>通话预约</Divider>

          </Modal>


          {/* 通话弹窗 */}
          <Modal
            bodyStyle={{padding:'3rem 3rem 0 3rem ', height:'40em', borderRadius:'10px', overflowY:'auto'}}
            visible={visible3}
            // title="Title"
            onOk={handleOk3}
            onCancel={handleCancel3}
            footer={[
              <Button key="back" onClick={handleCancel3}>
                取消
              </Button>,
              <Button key="submit" type="primary" loading={loading3} onClick={handleOk3}>
                通话
              </Button>,
            ]}
          >
           <figure style={{margin:'1rem 0 2rem 0', position:'relative'}} className='docs__infor__pic-wrap' data-category={docCert}>
              <Avatar style={{boxShadow: '0 6px 20px rgba(56, 125, 255, 0.3)'}} size={{xs: 120, sm: 120, md: 120, lg: 120, xl: 120}} shape="circle" src={"http://132.232.126.211:8080/images/"+props.avatar} />
              <div className='doc_infor_detail'>
                  <p style={{fontSize:'18px', fontWeight:'bald', marginBottom:'3px'}}>{props.name}</p>
                  <div className='doc_location_detail'>
                    <div style={{position:'relative', marginTop:'3px'}}><img style={{width:'21px', height:'21px'}} src={'images/location.png'} /><span style={{position:'absolute', marginLeft:'3px', top:'1px', fontSize:'15px'}}>{showMoreLocation(props.prov, props.location)}</span></div>
                  </div>
                  <div style={{position:'relative', marginTop:'7px'}}><Rating name="read-only" size='small' value={props.score} precision={0.1} readOnly /><span style={{position:'absolute', fontSize:'15px', bottom:'3.5px'}}>&nbsp;{props.score}</span></div>
                  <p style={{fontSize:'14px', margin:'3px'}}>平台工作时长：{props.docHour}h</p>
              </div>
            </figure>
            <Divider style={{fontSize:'18px'}} plain>视频通话</Divider>
            {/* <Options>
              <Notifications />
            </Options> */}
            <VideoPlayer />

          </Modal>
          
        </div>
      </li>
    </>
  );
}

export default Doctor;