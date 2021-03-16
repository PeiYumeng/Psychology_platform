import React from 'react';
import '../../App.css';
import {useLocation} from 'react-router';

export default function Services() {
    const location = useLocation();
    // console.log(location.state);
    return (
        <>
            <h3 className='services'>你好，{location.state.name}</h3>
        </>
    );
}