import react,{useState,useEffect} from "react";
import socket from "./socket";
import JoinRoom from "./component/joinRoom";
import ChatRoom from "./component/chatRoom";
function App(){
  const [joined,setJoined]=useState(false);
  const [username,setUsername]=useState("");
    const [room,setRoom]=useState("");
    function onJoin({username,room}){
      setUsername(username);
      setRoom(room);
      socket.connect();
      socket.on("connect",()=>{
        socket.emit("joinRoom",{username,room});
      });
      setJoined(true);
    }
    function leaveRoom(){
      socket.disconnect();
      setJoined(false);
      setUsername("");
      setRoom("");
    }
  return(
    <div>
      {!joined?(
        <JoinRoom onJoin={onJoin}/>
      ):(
        <div>
          <p>user {username} has joined the room {room}</p>
          <ChatRoom onLeave={leaveRoom} />
        </div>
      )}
      
    </div>
  )
}
export default App;