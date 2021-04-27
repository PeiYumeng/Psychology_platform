import React from 'react';
import '../../App.css';
import {Carousel} from 'antd';
import { Button } from '../Button';
import '../HeroSection.css';

const broImage1 = "url('/images/broad_cover1.jpg') center center/cover no-repeat";
const broImage2 = "url('/images/broad_cover2.jpg') center center/cover no-repeat";
const broImage3 = "url('/images/broad_cover3.jpg') center center/cover no-repeat";
const broImage4 = "url('/images/broad_cover4.jpg') center center/cover no-repeat";
const broImage5 = "url('/images/cover-3.jpg') center center/cover no-repeat";

const contentStyle = (broImage) => {
  return{
  width:'70%',
  height: '0',
  paddingTop:'56.25%',
  fontSize:'30px',
  color: '#fff',
  textShadow:'2px 2px 2px #555555',
  lineHeight: '14em',
  letterSpacing: '5px',
  textAlign: 'center',
  background: broImage,};
};

function BroadAdver() {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h1 style={contentStyle(broImage1)}></h1>
        </div>
        <div>
          <h1 style={contentStyle(broImage2)}></h1>
        </div>
        <div>
          <h1 style={contentStyle(broImage3)}></h1>
        </div>
        <div>
          <h1 style={contentStyle(broImage4)}></h1>
        </div>
        <div>
          <h1 style={contentStyle(broImage5)}></h1>
        </div>
      </Carousel>
    </div>
  );
}

export default BroadAdver;