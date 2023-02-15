// import compression from "compression";
// import expressValidator from "express-validator";


require("./mongoose").connect();
const express = require('express')
const app = express();
const bodyParser = require('body-parser')

const authRoute = require('../routes/auth')

app.use("/auth", authRoute)


// app.use(compression());
// app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('OK');
// });


const auth = require("../middlewares/auth");

// app.post("/", auth, (req, res) => {
//     res.status(200).send("Welcome 🙌 ");
// });


module.exports = app;
