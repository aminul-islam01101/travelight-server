/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
import express, { Express, Request, Response } from 'express';
import { MongoClient, MongoClientOptions, ServerApiVersion } from 'mongodb';
import cors = require('cors');
import categories = require('./data/categories.json');
import hotels = require('./data/travelight.json');

const app: Express = express();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

// mongo credentials
// Username: adminTravelight
// Password: 8HfJ014ijrVFXa9N

const uri =
    'mongodb+srv://adminTravelight:8HfJ014ijrVFXa9N@cluster0.5ty8ljz.mongodb.net/?retryWrites=true&w=majority';
const client: MongoClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
} as MongoClientOptions);

interface Users {
    name: string;
    email: string;
}
const run = async () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const userCollection = client.db('adminTravelight').collection<Users>('users');
        app.post('/users', (req) => {
            const user = req.body as Users;
            console.log(user);
        });
    } finally {
    }
};
run().catch((err) => console.log(err));

const users = [
    { id: 1, name: 'some1', email: 'some1@gmail.com' },
    { id: 2, name: 'some2', email: 'some2@gmail.com' },
    { id: 3, name: 'some3', email: 'some3@gmail.com' },
];

app.get('/', (_req, res: Response) => {
    res.send('Express + TypeScript Server');
});
app.get('/hotel', (req: Request, res: Response) => {
    res.send(categories);
});
app.get('/users', (req: Request, res: Response) => {
    res.send(users);
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
