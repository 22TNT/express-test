const express = require("express");
const cookies = require("cookie-parser");
let sha256 = require("crypto-js/sha256");

const app = express();
const port = process.env.PORT || 3001;

app.use(cookies());
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).send("Hello world");
});

const users = [
    {
        login: "1",
        password: sha256("123"+"CHBS").toString()
    },
    {
        login: "2",
        password: sha256("456"+"CHBS").toString()
    }];

function GetUserByLogin(login) {
    let u = undefined;
    users.forEach(user => {
        if (user.login === login) {
            return u = user;
        }
    })
    return u;
}
app.post('/login/', (req, res) => {
    const user = GetUserByLogin(req.body.login);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    if (sha256(req.body.password+"CHBS").toString() !== user.password) {
        return res.status(400).json({
            message: "Incorrect password"
        })
    }

    res.status(200).json({
        message: "Logged in"
    })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
