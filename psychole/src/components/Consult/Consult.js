import React, { useState, useEffect } from 'react';
import '../../App.css';
import DocSection from '../Home/DocSection';
import {useLocation} from 'react-router';

export default function Consult(userData) {
    const location = useLocation();
    // console.log(location.state);
    return (
        <>
            <h3 className='consult'>你好，{location.state.userData.userName}</h3>
            {/* <p></p>
            <DocSection /> */}
        </>
    );
}