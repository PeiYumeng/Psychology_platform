import React, { useContext } from 'react';
// import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';

import { SocketContext } from '../../SocketContext';
import './VideoPlayer.css';


const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  return (
    <div className="videos_container">
      {/* Our Own Video */}
      {/* {stream && ( */}
        <div className="video_container">
          <video className="my_video" playsInline muted ref={myVideo} autoPlay />
        </div>
      {/* // )} */}

      {/* User's Video */}
      {/* {callAccepted && !callEnded && (
        <div style={{width:'100%'}}>
          <video playsInline ref={userVideo} autoPlay />
        </div>
      // )} */}
    </div>
  );
};

export default VideoPlayer;