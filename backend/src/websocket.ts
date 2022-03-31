import http from 'http'
import { Server } from "socket.io";
import WebSocket from 'ws';
// SOCKET SERVICE
export function makeWebSocketServer(server: http.Server){
    const io = new Server(server ,{
        cors: {
            origin: "http://localhost:3000"
        }
    });
    const wss = new WebSocket("wss://stream.binance.com:9443/ws/gbpusdt@trade")
    return {
        io,
        wss
    }
}