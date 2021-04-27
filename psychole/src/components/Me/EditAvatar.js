import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Button, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import MyAvatar from './MyAvatar';

const EditAvatar = ({ avatarSRC }) => {

  return (
    <div style={{textAlign:'center'}}>
        <MyAvatar avatarSRC={avatarSRC}/>
       <Button type="primary" size='medium' style={{marginTop:'1em'}}>上传</Button>
    </div>
  );
};

export default EditAvatar