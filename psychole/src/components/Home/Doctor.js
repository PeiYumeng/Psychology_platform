import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { Rating } from '@material-ui/lab';
import { Button } from '../Button';

function Doctor(props) {
  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link' >
          <figure style={{position:'relative'}} className='cards__item__pic-wrap' data-category={props.label}>
            <Avatar style={{boxShadow: '0 6px 20px rgba(56, 125, 255, 0.3)'}} size={{xs: 75, sm: 75, md: 75, lg: 75, xl: 75}} shape="circle" src={props.src} />
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
          <div className='cards_button_section'></div>
        </div>
      </li>
    </>
  );
}

export default Doctor;