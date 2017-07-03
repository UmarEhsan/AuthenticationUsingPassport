'use strict';
var User = require('./user.model');

// Get list of things
exports.index = function(req, res) {
    res.render("index")
};
exports.signup = function(req, res){
    res.render('signup.ejs', { message: req.flash('signupMessage') });
}

exports.login = function(req, res){
    res.render('login.ejs', { message: req.flash('loginMessage') });
}



