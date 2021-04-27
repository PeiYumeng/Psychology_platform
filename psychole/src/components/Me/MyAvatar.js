import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Button, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const MyAvatar = ({ avatarSRC }) => {

  const [imgData, setImgData] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: avatarSRC,
    },
  ]);
  
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
    // <div style={{textAlign:'center'}}>
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
    //   <Button type="primary" size='medium' style={{marginTop:'1em'}}>上传</Button>
    // </div>
  );
};

export default MyAvatar