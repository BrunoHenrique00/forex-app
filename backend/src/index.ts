import http from 'http';
import dotenv from 'dotenv'
import getMongoClient from './util/db'
import express, { Express } from 'express';
import userRouter from './routes/user'
import tradesRouter from './routes/trades'
import { makeWebSocketServer } from './websocket';

dotenv.config()
getMongoClient(process.env.MONGODB_URL!)

const app: Express = express();
const PORT = process.env.PORT ?? 8080;

let usdPrice = 0;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** RULES OF OUR API */
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    next();
});

/** Routes */
app.use('/', userRouter);
app.use('/', tradesRouter);
app.get('/price' , (req , res ) => {
    return res.json({
        price: usdPrice
    })
})

const server = http.createServer(app);
// SOCKET SERVICE
const { io , wss } = makeWebSocketServer(server)

wss.onmessage = (message) => {
    const data = JSON.parse(message.data as any)
    usdPrice = parseFloat(data.p)
    
    io.emit("price", {
        price: usdPrice
    })
}

server.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

// export server to Test
export = server;