"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const cors = require("cors");
const categories = require("./data/categories.json");
const hotels = require("./data/travelight.json");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// middleware
app.use(cors());
app.use(express_1.default.json());
// mongo credentials
// Username: adminTravelight
// Password: 8HfJ014ijrVFXa9N
const uri = 'mongodb+srv://adminTravelight:8HfJ014ijrVFXa9N@cluster0.5ty8ljz.mongodb.net/?retryWrites=true&w=majority';
const client = new mongodb_1.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: mongodb_1.ServerApiVersion.v1,
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const userCollection = client.db('adminTravelight').collection('users');
        app.post('/users', (req) => {
            const user = req.body;
            console.log(user);
        });
    }
    finally {
    }
});
run().catch((err) => console.log(err));
const users = [
    { id: 1, name: 'some1', email: 'some1@gmail.com' },
    { id: 2, name: 'some2', email: 'some2@gmail.com' },
    { id: 3, name: 'some3', email: 'some3@gmail.com' },
];
app.get('/', (_req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/hotel', (req, res) => {
    res.send(categories);
});
app.get('/users', (req, res) => {
    res.send(users);
});
app.get('/hotels/:id', (req, res) => {
    const { id } = req.params;
    const selectedHotel = hotels.find((item) => item._id === id);
    res.send(selectedHotel);
});
app.get('/category/:id', (req, res) => {
    const { id } = req.params;
    const selectedCategory = hotels.filter((item) => item.category_id === id);
    id === '08' ? res.send(hotels) : res.send(selectedCategory);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
