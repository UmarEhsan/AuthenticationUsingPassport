var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var User = require('../api/user/user.model');
var configAuth = require('./auth');

module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({'local.username': email}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email already taken'));
				} else {
					var newUser = new User();
					newUser.local.username = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				}
			})

		});
	}));

	passport.use('local-login', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done){
			process.nextTick(function(){
				User.findOne({ 'local.username': email}, function(err, user){
					if(err)
						return done(err);
					if(!user)
						return done(null, false, req.flash('loginMessage', 'No User found'));
					if(!user.validPassword(password)){
						return done(null, false, req.flash('loginMessage', 'invalid password'));
					}
					return done(null, user);

				});
			});
		}
	));


	passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL,
		profileFields : configAuth.facebookAuth.profileFields
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'facebook.id': profile.id}, function(err, user)
				{
					saveOrRetriveUsers("facebook", profile, accessToken, done, err, user);


	    		});
	    	});
	    }

	));
	passport.use(new GoogleStrategy({
	    clientID: configAuth.googleAuth.clientID,
	    clientSecret: configAuth.googleAuth.clientSecret,
	    callbackURL: configAuth.googleAuth.callbackURL,
		profileFields : configAuth.googleAuth.profileFields
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){

	    		User.findOne({'google.id': profile.id}, function(err, user)
				{
					saveOrRetriveUsers("google", profile, accessToken, done, err, user);
	    		});
	    	});
	    }

	));






};
	function saveOrRetriveUsers(social, profile, accessToken, done, err, user)
	{
		if(err)
		{
         return done(err);
		}

		if(user)
		{
		 return done(null, user);
		}

        else
    	{

			var newUser = new User();
            console.log("Profile")
            console.log(profile)
	    	newUser[social].id = profile.id;
			newUser[social].token = accessToken;
			newUser[social].name = profile.displayName;
 			newUser[social].email = profile.emails[0].value;
			newUser.save(function(err)
			{
	    		if(err)
				{
					throw err;
				}
				return done(null, newUser);
			})
	    				console.log(profile);
		}

	}