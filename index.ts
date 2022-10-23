/* eslint-disable no-underscore-dangle */
import express, { Express, Request, Response } from 'express';

import cors = require('cors');
import categories = require('./data/categories.json');
import hotels = require('./data/travelight.json');

const app: Express = express();
const port = process.env.PORT || 8000;
app.use(cors());

app.get('/', (_req, res: Response) => {
    res.send('Express + TypeScript Server');
});
app.get('/hotel', (req: Request, res: Response) => {
    res.send(categories);
});
app.get('/hotels/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const selectedHotel = hotels.find((item) => item._id === id);
    res.send(selectedHotel);
});
app.get('/category/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const selectedCategory = hotels.filter((item) => item.category_id === id);
    id === '08' ? res.send(hotels) : res.send(selectedCategory);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
