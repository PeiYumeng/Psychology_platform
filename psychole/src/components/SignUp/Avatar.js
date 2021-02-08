import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Upload } from 'antd';
import { Button } from '../Button';
import ImgCrop from 'antd-img-crop';

const Avatar = ({fileList, setFileList, setAvatarDIY, setImgData}) => {
  
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setAvatarDIY(true);
    if(newFileList[0]){
      setImgData(newFileList[0].thumbUrl);
    }
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <>
      <ImgCrop rotate>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          id="avatar"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
      <form style={{color:'white'}}>
        {/* 默认头像&nbsp;&nbsp; */}
        {/* <Button buttonStyle='btn--outline'>替换头像</Button> */}
      </form>
    </>
  );
};

export default Avatar