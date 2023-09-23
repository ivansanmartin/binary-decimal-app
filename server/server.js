const express = require("express")
const api = require("./src/api")
const app = express()

app.set("port", "3000")
app.set("name", "binary-decimal-app-api")



app.listen(app.get("port"))

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(api)



console.log(`${app.get("name")} running ready up in port ${app.get("port")}!`)



