const { json } = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { isStringNullOrEmpty, isAuthenticated, isNotAuthenticated } = require('../utilities/misc');
const router = require('express').Router();
const User = mongoose.model(require('../models/user-model').MODEL_NAME);

const INVALID_DATA_MSG = 'Invalid data.';
const PASSWORDS_DONT_MATCH_MSG = 'Passwords do not match.';
const SUCCESSFULLY_REGISTERED_MSG = 'Successfully registered.';
const USERNAME_ALREADY_EXISTS_MSG = 'Username already exist.';
const INVALID_USERNAME_OR_PASSWORD_MSG = 'Username/password is invalid.';
const INTERNAL_ERROR_MSG = 'Some error has occured.';
const SUCCESSFULLY_LOGGED_IN_MSG = 'Successfully logged in.';

router.use('/user', isAuthenticated, require('./user-route').router);

router.post('/login', isNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err)
            return res.json({ success: false, message: INTERNAL_ERROR_MSG });
        if(!user)
            return res.json({ success: false, message: INVALID_USERNAME_OR_PASSWORD_MSG });
        req.logIn(user, (err) => {
            if(err)
                return res.json({ success: false, message: INTERNAL_ERROR_MSG });
            return res.json({ success: true, message: SUCCESSFULLY_LOGGED_IN_MSG });
        })
    })(req, res, next); 
});

router.post('/register', isNotAuthenticated, (req, res) => {
    if(isStringNullOrEmpty(req.body.name) || isStringNullOrEmpty(req.body.username) || isStringNullOrEmpty(req.body.password) || isStringNullOrEmpty(req.body.confirmPassword))
        return res.json({ success: false, message: INVALID_DATA_MSG });
    if(req.body.password !== req.body.confirmPassword)
        return res.json({ success: false, message: PASSWORDS_DONT_MATCH_MSG });
    const newUser = new User(req.body);
    newUser.save().then(() => res.json({ success: true, message: SUCCESSFULLY_REGISTERED_MSG}))
                    .catch((err) => res.json({ success: false, message: USERNAME_ALREADY_EXISTS_MSG }));
});

module.exports = { router };