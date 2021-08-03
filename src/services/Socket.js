import socketIOClient from "socket.io-client";
import { SOCKET_HOST } from "../app/Constants";
import Observer from "./Observables";

let ping, download, status;

const socketResponse = new Observer("socketResponse");
const connect = () => {
  console.log("CONNECT WAS CALLED");
  const socket = socketIOClient(SOCKET_HOST);
  socket.on("connect", (data) => {
    status = !0;
    socketResponse.next(data);
  });
  socket.on("response", (a) => socketResponse.next(a));
  ping = (message) => socket.emit("ping", { message });
  download = (id) => socket.emit("download", { id });
};
export { ping, download, status, socketResponse, connect };
