import {io} from "socket.io-client";
const socket=io("https://messagehub-ys5t.onrender.com",{
    autoConnect:false
})
export function connectSocket(token) {
    socket.auth = { token };
    socket.connect();
}
export default socket;
