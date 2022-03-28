import http from 'http';
import express, { Express } from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv'
import getMongoClient from './util/db'
import userRouter from './routes/user'

const PORT = process.env.PORT ?? 8080;
dotenv.config()
getMongoClient()

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

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

// SOCKET SERVICE
io.on('connection', (socket) => {
    console.log('a user connected');
});

/** Routes */
app.use('/', userRouter);

server.listen(PORT, () => console.log(`The server is running on port ${PORT}`));