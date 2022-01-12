const express = require('express');
const router = express.Router();

router.get('/error', (req, res, next) => {

    try {

        console.log("ERR");
        throw new Error('Drats!');

    } catch(err) {

        next(err);
    }
});

router.get('/ok', (req, res) => {

    try {

        console.log("OK")
        res.status(200).send('OKIE DOKIE!');

    } catch(err) {

        console.log(err);
    }
});

module.exports = router;