const express = require('express');
const app = express();
const routes = require('./routes/routes');
const logger = require('./logger');

app.use(express.json());


app.get('/', (req, res) => {    

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    logger.error(`ERROR / : ${ip}`);

    res.send('Hello World!'); 
});

app.use('', routes);

app.use((err, req, res, next) => {

    res.status(500).send(err.message);

});

app.listen(3000, (err) => {

    if(err) {
        console.log(err);
    }

    console.log('Server is running on port 3000');

})