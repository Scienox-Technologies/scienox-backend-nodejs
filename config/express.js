// const cors = require('cors')
// app.use(cors())

// const compression = require('compression')
// app.use(compression())

// const morgan = require('morgan')
// app.use(morgan('dev'))

// const helmet = require('helmet')
// app.use(helmet())

// const expressValidator = require('express-validator')
// app.use(expressValidator())

// const rateLimiter = require('../api/middlewares/rate-limiter.js')
// app.use(rateLimiter)


// app.use(express.static('public'))
// app.disable('x-powered-by')
// app.disable('etag')

// app.use(prefix, routes)




const express = require('express')
const app = express()
app.set('trust proxy', true)
// app.enable('trust proxy')

app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }))




// set the view engine to ejs
app.set('view engine', 'ejs');





// auth route
const authRoute = require('../routes/auth')
app.use("/auth", authRoute)

// users route
const usersRoute = require('../routes/users')
app.use("/users", usersRoute)

// courses route
const coursesRoute = require('../routes/courses')
app.use("/courses", coursesRoute)

// lectures route
const lecturesRoute = require('../routes/lectures')
app.use("/lectures", lecturesRoute)


module.exports = app


/*
// ---- users ----
changePassword
editUser
deleteUser
getUser

// ---- auth ----
register
login
logout
forgot-password
verify-email
send-verification-code
refresh-token
*/