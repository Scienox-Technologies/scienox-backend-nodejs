// import routes from './../api/routes/index.js';
// import { logger } from '../utils/index.js';



// const cors = require('cors')
// app.use(cors());

// const compression = require('compression')
// app.use(compression());

// const morgan = require('morgan')
// app.use(morgan('dev'));

// const helmet = require('helmet')
// app.use(helmet());

// const expressValidator = require('express-validator')
// app.use(expressValidator());

// const rateLimiter = require('../api/middlewares/index.js')
// app.use(rateLimiter);


// app.use(express.static('public'));
// app.disable('x-powered-by');
// app.disable('etag');

// app.use(prefix, routes);

require("./mongoose").connect();

const express = require('express')
const app = express();
app.set('trust proxy', true)
// app.enable('trust proxy')

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const authRoute = require('../routes/auth')
app.use("/auth", authRoute)

const usersRoute = require('../routes/users')
app.use("/users", usersRoute)



const { verifyToken } = require("../middlewares/verifyAuth.js");

app.get("/", verifyToken, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});


module.exports = app;
