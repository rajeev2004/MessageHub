import react,{useState,useEffect,useRef} from "react";
import socket from "../socket";
import { be } from "zod/locales";
function ChatRoom(props){
    const typingTimeoutRef=useRef(null);
    const messageEndRef=useRef(null);
    const [users,setUsers]=useState([]);
    const [messages,setMessages]=useState([]);
    const [currentMessage,setCurrentMessage]=useState("");
    const [typingUsers,setTypingUsers]=useState({});
    useEffect(()=>{
        messageEndRef.current?.scrollIntoView({
            behavior:"smooth",
        })
    },[messages]);
    useEffect(()=>{
        socket.on("systemMessage",({Msg,timeStamp})=>{
            setMessages((prev)=>[...prev,{type:"system",text:Msg,timeStamp}]);
        })
        socket.on("chatMessage",({message,username,timeStamp})=>{
            setMessages((prev)=>[...prev,{type:"chat",username,text:message,timeStamp}]);
        })
        socket.on("roomUsers",(userList)=>{
            setUsers(userList);
        })
        socket.on("userTyping",({username,isTyping})=>{
            setTypingUsers((prev)=>({...prev,[username]:isTyping}))
        })
        socket.on("roomMessages",(roomMessages)=>{
            setMessages(roomMessages);
        })
        return ()=>{
            socket.off("systemMessage");
            socket.off("chatMessage");
            socket.off("roomUsers");
            socket.off("userTyping");
            socket.off("roomMessages");
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        }
    },[]);
    function sendMessage() {
        if (!currentMessage.trim()) return;
        socket.emit("chatMessage",currentMessage);
        socket.emit("typing",false);
        setCurrentMessage("");
    }
    function handleTyping(e) {
    setCurrentMessage(e.target.value);

    // Emit typing true
    socket.emit("typing", true);

    // Clear previous timer
    if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
    }

    // Set new debounce timer
    typingTimeoutRef.current = setTimeout(() => {
        socket.emit("typing", false);
    }, 1500);
}
    return (
        <div style={{ display:"flex",height:"100vh" }}>
            {/* USERS LIST */}
            <div style={{ width: "200px", borderRight: "1px solid #ccc", padding: "10px" }}>
                <h4>Users</h4>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
            </div>
            {/* CHAT AREA */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
                    {messages.map((msg, index) => {
                        if (msg.type === "system") {
                            return (
                                <div key={index} style={{ color: "#888", fontStyle: "italic" }}>
                                    {msg.text} - {new Date(msg.timeStamp).toLocaleString()}
                                </div>
                            );
                        }
                        return (
                            <div key={index}>
                                <strong>{msg.username}:</strong> {msg.text} - {new Date(msg.timeStamp).toLocaleString()}
                            </div>
                        );
                    })}
                    <div ref={messageEndRef}></div>
                </div>
                {/* MESSAGE INPUT */}
                <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ccc" }}>
                    <input
                        type="text"
                        value={currentMessage}
                        placeholder="Type a message..."
                        onChange={handleTyping}
                        style={{ flex: 1 }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") sendMessage();
                        }}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
                
            </div>
            {Object.entries(typingUsers).map(([user,isTyping])=>{
                if(!isTyping){
                    return null;
                }
                 return (
                    <div key={user} style={{ fontStyle: "italic", color: "#666" }}>
                        {user} is typing...
                    </div>
                );
            })}
            <button type="submit" onClick={props.onLeave}>Leave Room</button>
        </div>
    );
}
export default ChatRoom;