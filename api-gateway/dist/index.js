"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = 4000;
dotenv_1.default.config();
const corsOptions = {
    origin: String('http://localhost:5173'),
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// app.get('/test',(req,res)=>{
//     console.log("hello....");
//     res.json({success:"heeloooo"})
// })
app.use('/auth', (0, express_http_proxy_1.default)('http://localhost:5001'));
app.use('/user', (0, express_http_proxy_1.default)('http://localhost:5002'));
// app.use('/user',(req,res)=>{
//        console.log('reched herer 00000000000000000');
// })
app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
});
