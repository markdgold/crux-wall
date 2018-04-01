var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var methodOverride = require('method-override');
var router = express.Router();

router.use(methodOverride('_method'));

router.post('/new', isLoggedIn, (req,res)=>{
	console.log(req.body);
	db.comment.create({
		comment: req.body.comment,
		userId: req.body.userId,
		climbId: req.body.climbId
	}).then(newComment=>{
		res.redirect('back');
	}).catch(function(error){
		console.log(error);
		res.render('error');
	});
});

//Export
module.exports = router;
