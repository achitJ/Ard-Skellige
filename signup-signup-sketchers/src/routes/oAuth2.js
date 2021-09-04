const express = require('express');
const router = new express.Router();
const cookieSession = require('cookie-session');
const passport = require('passport');
const User = require('../models/users');

require("../middleware/passport");

router.use(cookieSession({
    name: 'test-session',
    keys: ['key1', 'key2']
}))

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// Initializes passport and passport sessions
router.use(passport.initialize());
router.use(passport.session());

router.get('/failed', (req, res) => res.send('Could not LogIn'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good', isLoggedIn, (req, res) => res.send(req.user))

router.get('/api/googleAuth', isLoggedIn, async (req, res) => {

    try {

        const googleUser = req.user;
        const password = googleUser.id;
        const email = googleUser.emails[0].value;
        const name = `${googleUser.name.givenName} ${googleUser.name.familyName}`;

        const doesUserExist = await User.findOne({email:email});

        if(doesUserExist)
        {
            const token = await doesUserExist.generateAuthToken();

            return res.status(200).send({ doesUserExist, token });
        }

        const user = new User({ name, email, password });
        
        await user.save()
        const token = await user.generateAuthToken();

        res.status(200)
        .send({ user, token });

    } catch(error) {

        console.log(error);

        res.status(400)
        .send(error);

    }

})

// Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), async (req, res) => {
    
    res.redirect('/api/googleAuth');

});

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

module.exports = router;