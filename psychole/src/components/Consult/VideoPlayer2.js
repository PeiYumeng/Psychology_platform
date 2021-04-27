import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import {Button} from 'antd';

import { SocketContext } from '../../SocketContext';
import './VideoPlayer2.css';


const VideoPlayer2 = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, leaveCall } = useContext(SocketContext);

  return (
    <Grid container >
      {stream && (
        <Paper >
          <div>
            <video className="my_video2" playsInline muted ref={myVideo} autoPlay  />
          </div>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper >
          <div>
            <video className="my_video3" playsInline ref={userVideo} autoPlay  />
          </div>
        </Paper>
      )}
      <Button className="videoButton" type="danger" size="large" onClick={leaveCall}>挂断</Button>
    </Grid>
  );
};

export default VideoPlayer2;