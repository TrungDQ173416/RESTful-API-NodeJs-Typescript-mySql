"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const customer_router_1 = require("./routes/customer.router");
const app = express_1.default();
dotenv_1.default.config();
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins
};
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cors_1.default(options));
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//routes
app.use('/customers', customer_router_1.router);
// set port, listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});
