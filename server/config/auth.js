module.exports = {
	'facebookAuth' : {
		'clientID': '453294985046961',
		'clientSecret': 'e2532c0c77f34a374766870ee115571f',
		'callbackURL': 'http://localhost:9000/auth/facebook/callback',
         profileFields: ['id', 'displayName', 'photos', 'emails']
	},

	'googleAuth' : {
		'clientID': '893830882536-girmjn6l63j6jdauh00cil2vb30frrhr.apps.googleusercontent.com',
		'clientSecret': 'O4Gk8jUtuKAk3nIOyO7JgkiK',
		'callbackURL': 'http://localhost:9000/auth/google/callback',
		 profileFields: ['id', 'displayName', 'photos', 'emails']
		
	},


}

