const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use("basic", new BasicStrategy(
    function(id, password, callback) {
        if (id === "admin" && password === "vetec2") {
            callback(null, id)
        } else {
            callback(null, false)
        }
    }
));



exports.isBasicAuthenticated = passport.authenticate('basic', {session: false});