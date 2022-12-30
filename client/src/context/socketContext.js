import socketIO from "socket.io-client";
import { createContext } from "react";

export const socket = socketIO.connect("http://localhost:4000");
export const SocketContext = createContext()