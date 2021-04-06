import React, { useState, useEffect } from 'react';
import { Avatar, Button} from 'antd';

function UserCard(props) {

  const [docCert, setDocCert] = useState('');

  useEffect(() => {
    if(props.status==2){
      if(props.cert==1){setDocCert('一级心理咨询师')}
      else if(props.cert==2){setDocCert('二级心理咨询师')}
      else if(props.cert==3){setDocCert('三级心理咨询师')}
      else{setDocCert('心理咨询师');console.log(props.status)};
    }
    else if(props.status==1){setDocCert('认证中');}
    else{
      setDocCert('普通用户');
    }
  
  }, []);

  return (
    <>
      <li id='docCards' className='cards__item2'>
        <div className='cards__item__link2' >
          <figure style={{position:'relative'}} className='cards__item__pic-wrap2' data-category={docCert}>
            <Avatar style={{boxShadow: '0 6px 20px rgba(56, 125, 255, 0.3)'}} size={{xs: 75, sm: 75, md: 75, lg: 75, xl: 75}} shape="circle" src={"http://132.232.126.211:8080/images/"+props.avatar} />
            <div className='doc_infor2'>
                <p style={{marginBottom:'5px'}}>{props.name}</p>
                <p style={{marginBottom:'3px'}}>信用分：{props.creditScore}</p>
                {/* <div style={{position:'relative'}}><Rating name="read-only" size='small' value={props.score} precision={0.1} readOnly /><span style={{position:'absolute', bottom:'3.5px'}}>&nbsp;{props.score}</span></div> */}
            </div>
            <div className='doc_location2'>
              <div style={{position:'relative'}}><img style={{width:'20px', height:'20px'}} src={'images/location.png'} /><span style={{position:'absolute', top:'1px'}}>{props.location==undefined?props.location:props.location.split(';')[1]}</span></div>
            </div>
          </figure>
          {/* <div className='cards__item__info2'>
            <h5 className='cards__item__text2'>{props.text}</h5>
          </div> */}
          <div className='cards_button_section2'>
            <Button ghost onClick={()=>{}} className='doc_button2' size='small'>个人资料</Button>
            <Button ghost onClick={()=>{window.localStorage.clear();window.location.reload();}} className='doc_button2' size='small'>退出</Button>
          </div>    
        </div>
      </li>
    </>
  );
}

export default UserCard;