function Socket(){
    this.users=[];
} 
Socket.prototype = {
    constructor:Socket,
    join:function(data){
        window.socket.emit('join',data)
    },
    users:function(){
        window.socket.emit('info',localStorage.getItem("userName"))
        window.socket.on('users',(data)=>{
            console.log(data);
            this.setState={
                users:data
            }
        })
    }
}
export default Socket;