const express = require('express');
const app = express();
const { fork } = require('child_process');

app.get('/', (req, res) => {

    const child = fork('./prime.js');

    child.send(parseInt(req.query.number));
    child.on('message', (message) => {

        res.send(message);

    });

});

app.listen(3000, () => {

    console.log('Server is running on port 3000');

});


//29355126551