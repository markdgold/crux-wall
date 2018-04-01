//Requires and Globals
var fs = require('fs');
var express = require('express');
var passport = require('../config/passportConfig');
var bodyParser = require('body-parser');
var isLoggedIn = require('../middleware/isLoggedIn');
var db = require('../models');
var router = express.Router();

//Routes
router.get('/login', function(req, res) {
    res.render('loginForm');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/profile',
    successFlash: 'Logged in.',
    failureRedirect: '/auth/login',
    failureFlash: 'Try again'
}));

router.get('/profile', isLoggedIn, function(req, res) {
    db.climb.findAll({
        where: {
            creator_id: req.user.id
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(usersClimbs => {
        res.render('profile', { usersClimbs: usersClimbs });
    }).catch(function(error) {
        res.render('error');
    });
});


router.get('/signup', function(req, res) {
    res.render('signupForm');
});

router.post('/signup', function(req, res, next) {
    db.user.findOrCreate({
        where: { username: req.body.username },
        defaults: {
            'email': req.body.email,
            'password': req.body.password
        }
    }).spread(function(user, wasCreated) {
        if (wasCreated) {
            //good
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Logged in',
                failureRedirect: '/auth/signup',
                failureFlash: 'Unknown error. Please log in.'
            })(req, res, next);
        } else {
            //bad
            req.flash('error', 'Username already exists.');
            res.redirect('/auth/signup');
        }
    }).catch(function(error) {
        req.flash('error', error.message);
        res.redirect('/auth/signup');
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'You logged out');
    res.redirect('/');
});

//Export
module.exports = router;
