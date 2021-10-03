import { io as socketio } from "socket.io-client";

const io = socketio('http://localhost:3001');
export default io;