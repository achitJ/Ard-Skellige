const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const User = require('../models/users');

router.post("/api/users", async (req, res) => {
    
    const user = new User(req.body);

    try {

        await user.save()
        const token = await user.generateAuthToken();

        res.status(200)
        .send({ user, token });

    } catch (error) {

        res.status(400)
        .send("error");

    }
});

//login users
router.post('/api/users/login', async(req, res) => {

    try{

        const user = await User.findByCredentials(req.body.email, req.body.password);

        if(!user)
        {
            res.status(404).send();
        }

        const token = await user.generateAuthToken();

        res.send({ user, token });

    } catch(error) {

        res.status(500).send("error");

    }

});

//logout single user
router.post('/api/users/logout', auth, async (req, res) => {

    try {

        req.user.tokens = req.user.tokens.filter((token) => {

            return token.token !== req.token;

        })

        await req.user.save();

        res.status(200).send("LOGGED OUT SUCCESFULLY");

    } catch(error) {

        res.status(500).send();

    }

})

//logout all the users
router.post('/api/users/logoutAll', auth, async(req, res) => {

    try {

        req.user.tokens = [];

        await req.user.save();

        res.status(200).send("LOGGED OUT OF ALL DEVICES");

    } catch(error) {

        res.status(500).send();

    }

})

//showing the user Profile
router.get('/api/users/me', auth, async (req, res) => {

    try {

        res.send(req.user);

    } catch (error) {

        res.status(500)
        .send("error");

    }

});

module.exports = router;