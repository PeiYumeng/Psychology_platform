import React, { useEffect, useContext } from 'react';
import '../../App.css';
import BroadAdver from './BroadAdver';
// import DocSection from './DocSection';
import { SocketContext } from '../../SocketContext';

function Broadcast (){
    const { setHasUser, setOnlyShowRoom } = useContext(SocketContext);

    useEffect(()=>{

    }, []);

    return(
        <>
            <BroadAdver />
            {/* <DocSection /> */}
        </>
    )
}

export default Broadcast;