import {io} from "socket.io-client";
const socket=io("http://localhost:3000",{
    autoConnect:false
})
export function connectSocket(token) {
    socket.auth = { token };
    socket.connect();
}
export default socket;
