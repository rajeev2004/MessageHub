import socket,{connectSocket} from "../socket";
import { useState } from "react";
import JoinRoom from "./JoinRoom";
import ChatRoom from "./ChatRoom";
import "./Chatpage.css";
function ChatPage({setToken}) {
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  function onJoin({ username, room }) {
    setUsername(username);
    setRoom(room);
    connectSocket(localStorage.getItem("token"));
    socket.connect();
    socket.emit("joinRoom", { username, room });

    setJoined(true);
  }

  function leaveRoom() {
    socket.disconnect();
    setJoined(false);
  }

  return (
    <div className="chat-page">
      {!joined ? (
        <JoinRoom onJoin={onJoin} setToken={setToken} />
      ) : (
        <ChatRoom onLeave={leaveRoom} />
      )}
    </div>
  );
}
export default ChatPage;