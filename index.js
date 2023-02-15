// const http = require("http");
const app = require("./config/express");

// const server = http.createServer(app);

const { API_PORT } = process.env;
const PORT = process.env.PORT || API_PORT;

// server listening 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});