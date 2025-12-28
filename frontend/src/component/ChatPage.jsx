import socket,{connectSocket} from "../socket";
import { useState } from "react";
import JoinRoom from "./JoinRoom";
import ChatRoom from "./ChatRoom";
function ChatPage() {
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

  return !joined ? (
    <JoinRoom onJoin={onJoin} />
  ) : (
    <ChatRoom onLeave={leaveRoom} />
  );
}
export default ChatPage;