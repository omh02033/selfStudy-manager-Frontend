import { io as socketio } from "socket.io-client";
import "./env";

const io = socketio(process.env.API_SERVER as string);
export default io;