var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var multer = require('multer');
var multUp = multer({ dest: './uploads' });
var imgur = require('imgur-node-api');
var clientID = process.env.IMGUR_CLIENT_ID;
var path = require('path');
var fs = require('fs');
var async = require('async');
var methodOverride = require('method-override');
var router = express.Router();

router.use(methodOverride('_method'));

//routes
// app.get('/credits', (req, res) => {
//     imgur.setClientID(clientID);
//     request('http://api.imgur.com/3/credits', (error, response, body) => {
//         res.send(response);
//     });
// });

router.get('/show/:id', (req, res) => {
    var climbId = req.params.id;
    db.climb.findOne({
        where: {
            id: climbId
        },
        include: [
            {
                model: db.comment,
                include: [{model: db.user}]
            },
            {
                model: db.user
            }, {
                model: db.grade
            }
        ]
    })
    .then(climb=>{
        // res.send(climb);
        res.render('show', { climb: climb });
    })
});

router.get('/new', isLoggedIn, function(req, res) {
    res.render('newClimb');
});

router.post('/new', multUp.single('image'), function(req, res) {
    imgur.setClientID(clientID);
    imgur.upload(path.join('./', req.file.path), function(err, response) {
        var imgurURL = response.data.link;
        db.climb.create({
            name: req.body.climbName,
            grade_id: req.body.grade_id,
            style: req.body.style,
            imgur: imgurURL,
            creator_id: req.body.userID
        }).then(function(newClimb) {
            fs.unlink(req.file.path, (err) => {
                if (err) throw err;
            });
            res.redirect('/');
        }).catch(function(error) {
            res.render('error');
        });
    });
});

router.get('/edit/:id', isLoggedIn, (req, res) => {
    var climbId = req.params.id;
    db.climb.findById(climbId)
        .then(climb => {
            res.render('editClimb', { climb: climb });
        }).catch(error => {
            res.render('error');
        });
});

router.put('/edit/:id', (req, res) => {
    var climbId = req.params.id;
    var newClimbData = req.body;
    var updateClause = {
        style: newClimbData.style,
        grade_id: newClimbData.grade_id
    };
    var options = {
        where: { id: climbId }
    };
    db.climb.update(updateClause, options).then(updated => {
        res.redirect('/climb/show/' + climbId);
    }).catch(error => {
        res.render('error');
    });

});

router.delete('/edit/:id', (req, res) => {
    var climbId = req.params.id;
    db.climb.destroy({
        where: { id: climbId }
    }).then(() => {
        res.redirect('/auth/profile');
    });
});

//Export
module.exports = router;
