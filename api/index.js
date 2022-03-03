import express from 'express';
let app = express();
import http from 'http';
let server = http.createServer(app);

import mongoose from 'mongoose';


import { productRoutes } from "./src/routes/productRoutes.js";


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

export const autoIncrement = import('mongoose-auto-increment');

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/projetTestUnit', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if(error) {
        console.log(error);
        process.exit(1);
    }
});

// Routes initialisation
productRoutes(app);


server.listen(process.env.PORT || 9000,
    console.log(`listening`)
);

export default server

