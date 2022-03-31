// import express, { Express } from 'express';
// import userRouter from './routes/user'
// import tradesRouter from './routes/trades'
// import { Server } from 'socket.io';

// const app: Express = express();
// let usdPrice = 0;

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// /** RULES OF OUR API */
// app.use((req, res, next) => {
//     // set the CORS policy
//     res.header('Access-Control-Allow-Origin', '*');
//     // set the CORS headers
//     res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
//     // set the CORS method headers
//     next();
// });

// /** Routes */
// app.use('/', userRouter);
// app.use('/', tradesRouter);
// app.get('/price' , (req , res ) => {
//     return res.json({
//         price: usdPrice
//     })
// })

// // SOCKET SERVICE
// const io = new Server(app ,{
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });
// const wss = new WebSocket("wss://stream.binance.com:9443/ws/gbpusdt@trade")

// wss.onmessage = (message) => {
//     const data = JSON.parse(message.data as any)
//     usdPrice = parseFloat(data.p)
//     io.emit("price", {
//         price: usdPrice
//     })
// }

// export = app;