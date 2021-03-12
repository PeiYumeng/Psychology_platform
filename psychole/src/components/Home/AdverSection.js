import React from 'react';
import '../../App.css';
import {Carousel} from 'antd';
import { Button } from '../Button';
import '../HeroSection.css';

const broImage1 = "url('/images/img-home.jpg') center center/cover no-repeat";
const broImage2 = "url('/images/img-1.jpg') center center/cover no-repeat";
const broImage3 = "url('/images/img-2.jpg') center center/cover no-repeat";
const broImage4 = "url('/images/img-8.jpg') center center/cover no-repeat";
const broImage5 = "url('/images/img-9.jpg') center center/cover no-repeat";

const contentStyle = (broImage) => {
  return{height: '25rem',
  color: '#fff',
  lineHeight: '25rem',
  letterSpacing: '5px',
  textAlign: 'center',
  background: broImage,};
};

function AdverSection() {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h1 style={contentStyle(broImage1)}>体验Psychole新功能</h1>
        </div>
        <div>
          <h1 style={contentStyle(broImage2)}>加入Psychole大家庭</h1>
        </div>
        <div>
          <h1 style={contentStyle(broImage3)}>参与Psychole认证</h1>
        </div>
        <div>
          <h1 style={contentStyle(broImage4)}>直播活动1</h1>
        </div>
        <div>
          <h1 style={contentStyle(broImage5)}>直播活动2</h1>
        </div>
      </Carousel>
    </div>
  );
}

export default AdverSection;