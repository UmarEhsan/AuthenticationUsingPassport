'use strict';

var express = require('express');
var controller = require('./user.controller');
var passport = require("passport");

var router = express.Router();

router.get('/', controller.index);
router.get('/signup',controller.signup); 
router.post('/signup',  passport.authenticate('local-signup', {
		successRedirect: '/success',
		failureRedirect: '/signup',
		failureFlash: true
	})
);

router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/success',
		failureRedirect: '/login',
		failureFlash: true
	}));

router.get('/login', controller.login)


router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
router.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { successRedirect: '/success',
	                                      failureRedirect: '/error' }));

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	router.get('/auth/google/callback',
	  passport.authenticate('google', { successRedirect: '/success',
	                                      failureRedirect: '/error' }));
router.get('/success', isAuthenticated, function(req, res){
    res.render('success', {
        user : req.user // get the user out of session and pass to template
    });
});

router.get('/error', function(req, res){
	res.render("error")
});

// if the user is authenticated
 function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;