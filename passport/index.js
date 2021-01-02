const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const userService = require('../models/usersModel');

passport.use(new LocalStrategy(
    async function(username, password, done) {
        const user = await userService.Signin(username, password);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    userService.getAccount(id).then((user)=>{
        done(null, user)
    })
});

module.exports = passport;