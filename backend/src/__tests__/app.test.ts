import mongoose from 'mongoose'
import request from 'supertest'
import app from '../index'
import Trades from '../models/Trades'
import User from '../models/Users'

interface UserProps {
    _id: string
    email: string
}

const fakeEmail = "fake@fake.com"

afterAll(async () => {
    await Trades.deleteOne({ userId: 'fake'})
    await User.deleteOne({ email: fakeEmail})
    return console.log("Deleted all data tests!")
});

describe("Test the /user path", () => {
    test("Create a new user", async () => {
        await request(app)
        .post("/user")
        .send({ email: fakeEmail})
        .then(response => {
            expect(response.statusCode).toBe(201);
        });
    });

    test("Log in with a valid user", async () => {
        await request(app)
        .post("/user/login")
        .send({ email: fakeEmail})
        .then(response => {
            expect(response.statusCode).toBe(200);
        });
    });

    test("Register a user that already exists", async () => {
        await request(app)
        .post("/user")
        .send({ email: fakeEmail })
        .then(response => {
            expect(response.statusCode).toBe(404);
        });
    });

    test("Log in with a user that dont exist", async () => {
        await request(app)
        .post("/user/login")
        .send({ email: "fake user"})
        .then(response => {
            expect(response.statusCode).toBe(404);
        });
    });
});

describe("Test the /trades path", () => {

    const newUser = new User({
        email: fakeEmail
    })

    test("Get all trades of a user", async () => {
        newUser.save(async (err: mongoose.CallbackError , user: UserProps) => {
            if(err){
                return
            }
            await request(app)
            .get(`/trades/${user._id}`)
            .then(response => {
                expect(response.statusCode).toBe(200)
            });
        })
    });

    test("Register a trade of a user", async () => {
        newUser.save(async (err: mongoose.CallbackError , user: UserProps) => {
            if(err){
                return
            }
            const tradePayload = { 
                userId: 'fake',
                amount: 0,
                price: 0,
                originalCurrency: "fake"
            }
            await request(app)
            .post(`/trades`)
            .send(tradePayload)
            .then(response => {
                expect(response.statusCode).toBe(201)
            });
        })
    });
});

describe("Test the /price path", () => {

    test("Get the current price of USD", async () => {
        await request(app)
        .get(`/price`)
        .then(response => {
            expect(JSON.parse(response.text)).toEqual(
                expect.objectContaining({
                    price: expect.any(Number)
                })
            )
        });
});
});