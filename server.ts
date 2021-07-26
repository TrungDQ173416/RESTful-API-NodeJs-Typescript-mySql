import express from 'express';
import {Request, Response} from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import {router} from './routes/customer.router';

const app = express();
dotenv.config();

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(options));
app.use(express.json());

app.use(function(req: Request, res: Response, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//routes
// app.use('/customers', router);

app.get('/', (req, res) => {
  res.json({ messages: 'Hello World!'})
});

// set port, listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
