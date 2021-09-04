const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./routes/users');
const oAuthRouter = require('./routes/oAuth2');

require("./db/connect");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const port = process.env.PORT || process.env.LOCAL_PORT

app.use(userRouter);
app.use(oAuthRouter);

app.listen(port, () => {

    console.log("Server is up on port", port);

});