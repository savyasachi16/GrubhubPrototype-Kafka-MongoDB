import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import userRoutes from '../routes/user';
import restaurantRoutes from '../routes/restaurant';
import dishRoutes from '../routes/dish'
import orderRoutes from '../routes/order'
import mongoClient from '../config/mongoose'
import Promise from "bluebird"
import mongoose from 'mongoose'
//mongoose.Promise = Promise;
const app = express();

//DB Connect
// mongoClient.connect().then(() => {
//     console.log("DB Created Successfully...")
// }).catch(err => {
//     console.log("DB Creation Error: ", err.message)
// })

mongoose.connect('mongodb+srv://root:root1234@grubhubcluster-7frcc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 4
});


//load configurations for passport
require('../config/passport');

app.use(passport.initialize());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });

app.use('/', userRoutes);
app.use('/', restaurantRoutes);
app.use('/', dishRoutes)
app.use('/', orderRoutes)

app.listen(3001);
console.log("Grubhub Server listening on port 3001");


module.exports = app;
//export default app;