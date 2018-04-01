var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    db.user.findById(id).then(function(user) {
        cb(null, user);
    }).catch(cb);
});

passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(username, password, cb) {
    db.user.findOne({
        where: { username: username }
    }).then(function(user) {
        if (!user || !user.isValidPassword(password)) {
            cb(null, false); //No user or bad password
        } else {
            cb(null, user); //User is allowed
        }
    }).catch(cb);
}));

module.exports = passport;
