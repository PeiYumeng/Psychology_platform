import React, { createContext, useState, useRef, useEffect } from 'react';
import  io  from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

// const socket = io('http://localhost:5000');
const socket = io("ws://132.232.126.211:8080");

const ContextProvider = ({ children }) => {
  const [initFlag, setInitFlag] = useState(true);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState(null);
  const [callerUserId, setCallerUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [cameraOn, setCameraOn] = useState(false);
  const [isInRoom, SetIsInRoom] = useState(false);
  const [userData, setUserData] = useState({});
  const [userURL, setUserURL] = useState('http://132.232.126.211:8080/userInfor');
  const [onlyShowRoom, setOnlyShowRoom] = useState(false);
  const [hasUser, setHasUser] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const getUrlPara = () => {
    var url = document.location.toString();
    var num = 0;
    for(var i=0;i<url.length;i++){
      if(url.charAt(i)=='/') num++;
    }
    var para = url.split('/')[num];
    return para;
  }

  useEffect(() => {
    if(window.localStorage.length==0){}else{
      fetch(userURL, {
        method: 'post', 
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            "userName": window.localStorage.userName,
        })
      })
      .then(res=>res.json())
      .then(res=>{
          {   
              if(res.userName!=null){
                setUserData(res);
                setName(res.userName);
                setUserId(res.userId);
                setStatus(res.userState);
              }else{}
          }
      });
    }

    socket.on('me', (id) => setMe(id));

    if(userId!='' && status != null){
      if(initFlag){
        socket.on('callUser', ({ from, name: callerName, signal }) => {
          setCall({ isReceivingCall: true, from, name: callerName, signal });
        });

        if(getUrlPara().indexOf('?')!=-1){
          var myId = getUrlPara().split('?')[1];
          SetIsInRoom(true);
          socket.emit('join', { userId: myId, status, isInRoom: true }, (error) => {
            if(error) {
              alert(error);
            }
          });
        }else{
          socket.emit('join', { userId, status, isInRoom }, (error) => {
            if(error) {
              alert(error);
            }
          });
        }
           
        const timer = setInterval(()=>{  
          socket.on('users', (onUsers)=> setUsers(onUsers));
        },1000);
      }
      setInitFlag(false);
    }

    if(cameraOn){
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);

          myVideo.current.srcObject = currentStream;
        });
    }
  }, [userId, status, cameraOn]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    // console.log(call);

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const getCallerToRoom = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;


  };

  const callUser = (id, userId) => {

    setOnlyShowRoom(true);

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      window.location.href = "/consultroom"+ '/call?'+ userData.userId + '?'+ userId;
      console.log('accepted');
      // setCallAccepted(true);

      // peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const callUser2 = (id) => {
    if(id=='' || id==undefined) return;

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;

  };


  const leaveCall = () => {
    if(connectionRef.current!=undefined){
    connectionRef.current.destroy();
  }

    window.location.href = '/';
  };

  return (
    <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, callUser2, leaveCall, answerCall, setCameraOn, userData, users, setCall, onlyShowRoom, setOnlyShowRoom, getUrlPara, callerUserId, setCallerUserId, getCallerToRoom, hasUser, setHasUser }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };