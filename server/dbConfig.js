require("dotenv").config();

module.exports = {
    url: process.env.MONGODB_CONNECTION,
    dbName: "binary-decimal-app",
}