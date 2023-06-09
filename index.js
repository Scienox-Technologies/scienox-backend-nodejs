require("dotenv").config()

const dbConnection = require("./config/mongoose")
const app = require("./config/express")


const PORT = process.env.API_PORT || 3000


// base route 
app.get("/", (req, res) => {
    res.render("api-doc.ejs")
})


// server listening 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


// database connection
dbConnection.connect()