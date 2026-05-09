import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose'

import userRoutes from './routes/userRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import dishRoutes from './routes/dishRoutes.js'

const app = express();

//DB Connection
mongoose.connect('mongodb+srv://root:root1234@grubhubcluster-7frcc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true, //poolSize: 4
}, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB")
});

//load configurations for passport
import './config/passport.js';

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));


//Routes
app.use('/', userRoutes);
app.use('/', restaurantRoutes);
app.use('/', dishRoutes)
app.use('/', orderRoutes)

app.listen(3001);
console.log("Grubhub Server listening on port 3001");

export default app;