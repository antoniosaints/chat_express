import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { HOST_WS } from "../imports/constants.js";
import { addNewMessage } from "../handlers/messageHandler.js";

const socket = io(HOST_WS);

socket.on("message", (msg) => {
  console.log(JSON.parse(msg));
  addNewMessage(msg);
});

export { socket };
