"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const categories = require("./data/categories.json");
const hotels = require("./data/travelight.json");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(cors());
app.get('/', (_req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/hotel', (req, res) => {
    res.send(categories);
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
