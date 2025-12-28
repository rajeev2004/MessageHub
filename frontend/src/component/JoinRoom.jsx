import react,{useState} from "react";
function JoinRoom(props){
    const [username,setUsername]=useState("");
    const [room,setRoom]=useState("");
    // function handleChange(e){
    //     setUsername(e.target.value);
    // }
    function joinRoomFunction(e){
        e.preventDefault();
        if(username && room){
            props.onJoin({username,room});
        }else{
            alert("Enter form details")
        }
    }
    return (
        <form onSubmit={joinRoomFunction}>
            <input type="text" value={username} placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)} required/>
            <input type="text" value={room} placeholder="Enter room" onChange={(e)=>setRoom(e.target.value)} required/>
            <button type="submit">JOIN ROOM</button>
        </form>
    )
   
}
export default JoinRoom;