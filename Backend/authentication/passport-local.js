const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model(require('../models/user-model').MODEL_NAME);

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({username}).exec().then((user) => {
        if(!user || user.password !== password)
            return done(null, false);
        return done(null, user);
    });
}));

passport.serializeUser((user, done) => {
    return done(user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).exec().then((user) => {
        if(!user)
            return done(null, false);
        return done(null, user);
    });
});
