/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {
    // Insert routes below
    app.use('/', require('./api/user'));
};
