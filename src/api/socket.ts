import { io as socketio } from "socket.io-client";
import * as CONF from "./env";

const io = socketio(CONF.API_SERVER);
export default io;