//Requires and globals
require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var db = require('./models');
var app = express();

//Set and Use
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
});
app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res) {
    db.climb.findAll({
        include: [db.user, db.grade],
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(function(climbs) {
        res.render('climbs', { climbs: climbs });
    }).catch(function(error) {
        res.render('error');
    });
});

app.post('/filter', (req, res) => {
    var lowerGrade = req.body.slider_lower - 1;
    var upperGrade = req.body.slider_upper - 1;
    var style = req.body.style_group;
    var setBy = req.body.set_by;
    if (req.body.set_by === 'all') {
        setBy = { gt: -1 };
    } else {
        setBy = req.body.set_by;
    }
    if (!req.body.style_group) {
        style = ['power', 'crimp', 'oneMover', 'enduro', 'tech'];
    } else {
        style = req.body.style_group;
    }
    db.climb.findAll({
        include: [db.user, db.grade],
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(climbs => {
        db.climb.findAll({
            where: {
                creator_id: setBy,
                grade_id: { between: [lowerGrade, upperGrade] },
                style: style
            },
            include: [db.user, db.grade],
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(filteredClimbs => {
            res.render('filtered', { climbs: climbs, filteredClimbs: filteredClimbs });
        }).catch(error => {
            res.render('error');
        });
    });
});

app.get('/error', function(req, res) {
    res.render('error');
});

app.get('/about', (req, res) => {
    res.render('about');
});


// app.get('*', (req, res) => {
//     res.render('error404');
// });

//controllers
app.use('/auth', require('./controllers/auth'));
app.use('/favorites', require('./controllers/favorites'));
app.use('/logbook', require('./controllers/logbook'));
app.use('/climb', require('./controllers/climb'));
app.use('/comments', require('./controllers/comment'));

//Listen
app.listen(process.env.PORT || 3000);
