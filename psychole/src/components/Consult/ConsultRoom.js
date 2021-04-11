import React, { useState, useEffect, useContext } from 'react';

import { SocketContext } from '../../SocketContext';
import VideoPlayer2 from './VideoPlayer2';


const ConsultRoom = () => {
  const { setCameraOn, setOnlyShowRoom, callUser2, getUrlPara, users, answerCall, call} = useContext(SocketContext);
  const callOrAnswer = getUrlPara().split('?')[0];
  const callerUserId = getUrlPara().split('?')[2];
  const [callerId, setCallerId] = useState('');

  const showSocketId = (userId) => {
    for(var i=0;i<users.length;i++){
      if(users[i].userId == userId){
        return users[i].id;
      }
    }
  }

  useEffect(() => {
    setCameraOn(true);
    setOnlyShowRoom(true);
    
    if(callOrAnswer=='call')callUser2(callerId);
  }, [callerId]);

  useEffect(()=>{
    setCallerId(showSocketId(callerUserId));
  }, [users]);

  useEffect(()=>{
    if(callOrAnswer=='answer' && call.from!=null) answerCall();
  }, [call]);

  return (
    <div >
      <VideoPlayer2 />
    </div>
  );
};

export default ConsultRoom;
